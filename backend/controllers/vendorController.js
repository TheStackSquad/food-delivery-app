// backend/controllers/vendorControllers.js
const bcrypt = require('bcrypt');
const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const userValidators = require('../utils/validators');

// Register a new vendor
const registerVendor = async (req, res) => {
    try {
        const { username, email, phone, password, confirmPassword, storeName, vendorType } = req.body;

        // Validate inputs using validators
        const validations = [
            userValidators.validateUsername(username),
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
            username,
            email: email.toLowerCase(),
            phone,
            password: hashedPassword,
            storeName,
            vendorType,
        });

        // Save vendor to database
        await newVendor.save();

        res.status(201).json({
            message: 'Vendor registration successful!',
            vendor: {
                username: newVendor.username,
                email: newVendor.email,
                storeName: newVendor.storeName,
                vendorType: newVendor.vendorType,
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
        const { email, password } = req.body;

        // Validate inputs
        const emailValidation = userValidators.validateEmail(email);
        const passwordValidation = userValidators.validatePassword(password);
        if (!emailValidation.isValid) {
            return res.status(400).json({ error: emailValidation.error });
        }
        if (!passwordValidation.isValid) {
            return res.status(400).json({ error: passwordValidation.error });
        }

        // Find the vendor by email
        const vendor = await Vendor.findOne({ email: email.toLowerCase() });
        if (!vendor) {
            return res.status(401).json({ error: 'Invalid email or password' })
        }

        // Comapre passwords
        const isPasswordValid = await bcrypt.compare(password,vendor.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { vendorId: vendor._id, email: vendor.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h '}
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            vendor: {
                username: vendor.username,
                email: vendor.email,
                storeName: vendor.storeName,
                vendorType: vendor.vendorType,
            },
        });
    } catch (error) {
        console.error('Error during vendor login:', error);
        res.status(500).json({ error: 'Internal server error. Please try again' });
    }
};

// Get vendor profile
const getVendorProfile = async (req, res) => {
    try {
        const vendorId = req.vendorr.vendorId;

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

// Update vendor profile
const updateVendorProfile = async (req, res) => {
    try {
        const vendorId = req.vendor.vendorId;
        const { storeName, storeDescription, coverImage, vendorType, officialEmail, officialPhoneNumber, address } = req.body;

        // Validate fields if provided
        if (storeName) {
            if (typeof storeName !== 'string' || storeName.length < 2) {
                return res.status(400).json({ error: 'Store name must be atleast 2 characters long.' });
            }
        }

        if (officialEmail) {
            const emailValidation = userValidators.validateEmail(officialEmail);
            if (!emailValidation.isValid) {
                return res.status(400).json({ error: emailValidation.error });
            }
        }

        if (officialPhoneNumber) {
            const phoneValidation = userValidators.validatePhone(officialPhoneNumber);
            if (!phoneValidation.isValid) {
                return res.status(400).json({ error: phoneValidation.error });
            }
        }

        // Find vendor by ID and update fields
        const updatedVendor = await Vendor.findByIdAndUpdate(
            vendorId,
            {
                storeName,
                storeDescription,
                coverImage,
                vendorType,
                officialEmail,
                officialPhoneNumber,
                address,
            },
            { new: true, runaValidators: true }
        ).select('-password');

        if (!updatedVendor) {
            return res.status(404).json({ error: 'Vendor not found.' });
        }

        res.status(200).json({
            message: 'Profile successfully updated',
            vendor: updatedVendor,
        });
    } catch (error) {
        console.error('Error updating vendor profile', error);
        res.status(500).json({ error: 'Internal server error. Please try again.' });
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
    addMealToMenu,
    getVendorMenu,
};