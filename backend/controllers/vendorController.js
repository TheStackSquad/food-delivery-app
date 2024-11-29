// backend/controllers/vendorControllers.js
const bcrypt = require('bcrypt');
const Vendor = require('../models/vendorSchemas/Vendor');
const Profile = require('../models/vendorSchemas/Profile');
const Payout = require('../models/vendorSchemas/Payout');
const Review = require('../models/vendorSchemas/Review');
const VendorSession = require('../models/vendorSchemas/VendorSession');
const jwt = require('jsonwebtoken');
const userValidators = require('../utils/validators');
const multer = require('multer');
const upload = multer({ dest: 'uploads' });

const fs = require('fs');
const path = require('path');

// Register a new vendor
const registerVendor = async (req, res) => {
    try {
        const { fullname, email, phone, password, confirmPassword } = req.body;

        // Validate inputs using validators
        const validations = [
            userValidators.validateFullname(fullname),
            userValidators.validateEmail(email),
            userValidators.validatePhone(phone),
            userValidators.validatePassword(password, confirmPassword),
        ];

        const validationError = validations.find(v => !v.isValid);
        if (validationError) {
            return res.status(400).json({ error: validationError.error });
        }

        // Check for existing vendor by email
        const existingVendor = await Vendor.findOne({ email });
        if (existingVendor) {
            return res.status(400).json({ error: 'Vendor with this email already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new vendor
        const newVendor = new Vendor({
            fullname,
            email: email.toLowerCase(),
            phone,
            password: hashedPassword,
        });

        // Save vendor to database
        await newVendor.save();

        // After saving the new vendor, create an initial session
        const newSession = new VendorSession({
            vendorName: newVendor.fullname,
            vendorType: newVendor.vendorType,
            vendorLocation: newVendor.vendorLocation,
            contactInfo: {
                email: newVendor.email,
                phone: newVendor.phone,
            },
            status: 'active',
            vendor: newVendor._id, // Reference to Vendor schema
            sessionStart: new Date(), // Set session start time
        });

        await newSession.save();

        res.status(201).json({
            message: 'Vendor registration successful!',
            vendor: {
                fullname: newVendor.fullname,
                email: newVendor.email,
            },
        });
    } catch (error) {
        console.error('Error registering vendor:', error);
        res.status(500).json({ error: 'Internal server error. Please try again.' });
    }
};


// Vendor login
const loginVendor = async (req, res) => {
    try {
        // Extract email and password from the request body
        const { email, password } = req.body;

        // Step 1: Validate inputs
        const emailValidation = userValidators.validateEmail(email); // Check email format
        const passwordValidation = userValidators.validatePassword(password); // Check password strength
        
        // If email is invalid, return error response
        if (!emailValidation.isValid) {
            return res.status(400).json({ error: emailValidation.error });
        }
        
        // If password is invalid, return error response
        if (!passwordValidation.isValid) {
            return res.status(400).json({ error: passwordValidation.error });
        }

        // Step 2: Find the vendor by email (case insensitive)
        const vendor = await Vendor.findOne({ email: email.toLowerCase() });
        
        // If vendor does not exist, return unauthorized error
        if (!vendor) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Step 3: Verify the password using bcrypt
        const isPasswordValid = await bcrypt.compare(password, vendor.password);
        
        // If the password does not match, return unauthorized error
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Step 4: Fetch the vendor's latest session data from VendorSession schema and populate references
        const vendorSession = await VendorSession.findOne({ vendor: vendor._id })
            .sort({ createdAt: -1 })  // Sort by most recent session
            .populate('vendor')  // Populate the vendor reference
            .populate('payout')
            .populate('reviews'); // Optionally populate reviews
        
        // If no session data is found, return an error response
        if (!vendorSession) {
            return res.status(500).json({ error: 'No session found for this vendor.' });
        }

        // Step 5: Generate a JWT token for authentication
        const token = jwt.sign(
            { vendorId: vendor._id, email: vendor.email }, // Payload with vendor ID and email
            process.env.JWT_SECRET, // Secret key for signing
            { expiresIn: '24h' } // Token expiry
        );

        // Step 6: Respond with success message, token, and vendor/session data
        res.status(200).json({
            message: 'Login successful',
            token, // JWT token to be used for authorization
            vendor: { // Basic vendor details
                fullname: vendor.fullname,
                email: vendor.email,
                storeName: vendor.storeName,
                vendorType: vendor.vendorType,
            },
            sessionData: vendorSession, // Populated session data
        });
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error during vendor login:', error);
        
        // Return a generic error response
        res.status(500).json({ error: 'Internal server error. Please try again' });
    }
};

// Get vendor profile
const getVendorProfile = async (req, res) => {
    try {
        const vendorId = req.vendor.vendorId;

        // Find vendor by ID
        const vendor = await Vendor.findById(vendorId).select('-password');
        if (!vendor) {
            return res.status(404).json({ error: 'Vendor not found' });
        }

        res.status(200).json({ vendor });
    } catch (error) {
        console.error('Error retrieving vendor profile:', error);
        res.status(500).json({ error: 'Internal server error. Please try again.' });
    }
};

const uploadVendorImages = (req, res) => {
    try {
        // Logs the uploaded files
        console.log('Uploaded files:', req.files);

        // Send back the file paths (URLs) to the client
        res.status(200).json({
            message: 'Files uploaded successfully',
            files: req.files, // These contain the uploaded file paths (e.g., 'uploads/vendorUploads/profileImage.jpg')
        });
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).json({
            error: 'Internal server error while uploading files',
            details: error.message,
        });
    }
};

const updateVendorProfile = async (req, res) => {
    try {
        console.log('[CONTROLLER] Update Vendor Profile', {
            body: req.body,
            files: req.files,
        });

        const profileData = JSON.parse(req.body.profile);

        if (!profileData.email || !profileData.storeName) {
            return res.status(400).json({
                success: false,
                message: 'Email and Store Name are required',
            });
        }

        // Fetch existing profile by email
        let profile = await Profile.findOne({ officialEmail: profileData.email });

        if (!profile) {
            // Create a new profile if one does not exist
            profile = new Profile({
                officialEmail: profileData.email,
                storeName: profileData.storeName,
                storeDescription: profileData.storeDescription,
                officialPhoneNumber: profileData.phoneNumber,
                address: profileData.address,
                profileImagePath: '',
                coverImagePath: '',
            });
        } else {
            // Update existing profile data
            profile.storeName = profileData.storeName || profile.storeName;
            profile.storeDescription = profileData.storeDescription || profile.storeDescription;
            profile.officialPhoneNumber = profileData.phoneNumber || profile.officialPhoneNumber;
            profile.address = profileData.address || profile.address;
        }

        // Handle uploaded files
        if (req.files?.profileImage) {
            // Remove old profile image if a new one is uploaded
            if (profile.profileImagePath) {
                const oldPath = path.join(__dirname, '../../', profile.profileImagePath);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            profile.profileImagePath = `/uploads/vendorProfile/${req.files.profileImage[0].filename}`;
        }

        if (req.files?.coverImage) {
            // Remove old cover image if a new one is uploaded
            if (profile.coverImagePath) {
                const oldPath = path.join(__dirname, '../../', profile.coverImagePath);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            profile.coverImagePath = `/uploads/vendorProfile/${req.files.coverImage[0].filename}`;
        }

        // Save updated or new profile
        const updatedProfile = await profile.save();

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            vendorProfile: updatedProfile,
        });
    } catch (error) {
        console.error('[CONTROLLER] Update Vendor Profile Error', error);
        res.status(500).json({
            success: false,
            message: 'Server error during profile update',
            error: error.message,
        });
    }
};


// Add a meal to vendor's menu
const addMealToMenu = async (req, res) => {
    try {
        const vendorId = req.vendor.vendorId;
        const { mealName, description, image, price, priceDescription, pack, inStock } = req.body;
        
        // Validate meal details
        if (!mealName || typeof mealName !== 'string') {
            return res.status(400).json({ error: 'Meal name is required and must be a string.' });
        }
        if (typeof price !== 'number' || price <= 0) {
            return res.status(400).json({ error: 'Price must be a positive number.' });
        }

        // Find vendor and add new meal
        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
            return res.status(404).json({ error: 'Vendor not found.' });
        }

        const newMeal = {
            mealName,
            description,
            image,
            price,
            priceDescription,
            pack,
            inStock,
        };

        vendor.menu.push(newMeal);
        await vendor.save();

        res.status(201).json({ message: 'Meal added to menu successfully', meal: neweMeal });
    } catch (error) {
        console.error('Error adding meal to menu:', error);
        res.status(500).json({ error: 'Internal server error. Please try again.' });
    }
};

// Get vendor menu
const getVendorMenu = async (req, res) => {
    try {
        const vendorId = req.vendor.vendorId;

        // Find vendor and get menu
        const vendor = await Vendor.findById(VendorId).select('menu');
        if (!vendor) {
            return res.status(404).json({ error: 'Vendor not found.' });
        }

        res.status(200).json({ menu: vendor.menu });
    } catch (error) {
        console.error('Error retrieving vendor menu:', error);
        res.status(500).json({ error: 'Internal server error. Please try again.' });
    }
};

module.exports = {
    registerVendor,
    loginVendor,
    getVendorProfile,
    updateVendorProfile,
    uploadVendorImages,
    addMealToMenu,
    getVendorMenu,
};