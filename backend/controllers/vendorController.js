// backend/controllers/vendorControllers.js
const bcrypt = require("bcrypt");
const Vendor = require("../models/vendorSchemas/Vendor");
const Profile = require("../models/vendorSchemas/Profile");
const Payout = require("../models/vendorSchemas/Payout");
const Review = require("../models/vendorSchemas/Review");
const Meal = require("../models/vendorSchemas/Meal");
const VendorSession = require("../models/vendorSchemas/VendorSession");
const userValidators = require("../utils/validators");
const generateTokens = require("../utils/generateToken");
const { refreshAccessToken } = require('../utils/tokenManager');

const fs = require('fs');
const path = require('path');

// Register a new vendor
const registerVendor = async (req, res) => {
  try {
    const { fullname, email, phone, password, confirmPassword } = req.body;
    console.log("fullname", req.body.fullname);

    // Validate inputs using validators
    const validations = [
      userValidators.validateFullname(fullname),
      userValidators.validateEmail(email),
      userValidators.validatePhone(phone),
      userValidators.validatePassword(password, confirmPassword),
    ];

    const validationError = validations.find((v) => !v.isValid);
    if (validationError) {
      return res.status(400).json({ error: validationError.error });
    }

    // Check for existing vendor by email
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res
        .status(400)
        .json({ error: "Vendor with this email already exists." });
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
      status: "active",
      vendor: newVendor._id, // Reference to Vendor schema
      sessionStart: new Date(), // Set session start time
    });

    await newSession.save();

    res.status(201).json({
      message: "Vendor registration successful!",
      vendor: newVendor.toPublicJSON(),
    });
  } catch (error) {
    console.error("Error registering vendor:", error);
    res.status(error.code === 11000 ? 400 : 500).json({
      error: error.message || "Internal server error. Please try again.",
    });
  }
};

// Vendor login
const loginVendor = async (req, res) => {
  console.log("Vendor login endpoint hit with data:", req.body);
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;
    console.log("Login request body:", req.body.email);

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
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Step 3: Verify the password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, vendor.password);

    // If the password does not match, return unauthorized error
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Step 4: Fetch the vendor's latest session data from VendorSession schema and populate references
    const vendorSession = await VendorSession.findOne({ vendor: vendor._id })
      .sort({ createdAt: -1 }) // Sort by most recent session
      .populate({
        path: "vendor",
        select: "-password", // Exclude sensitive data
      }) // Populate the vendor reference
      .populate("profile")
      .populate("meals")
      .populate("payout")
      .populate("reviews") // Optionally populate reviews
      .lean(); // Convert to plain JavaScript object for easier manipulation

    // If no session data is found, return an error response
    if (!vendorSession) {
      return res
        .status(500)
        .json({ error: "No session found for this vendor." });
    }

    // Step 5: Generate access and refresh tokens

    // Generate tokens
    const payload = {
      vendorId: vendor._id,
      email: vendor.email,
      role: vendor.role || 'vendor', // Default to 'vendor' if role is not set
    };

    const { accessToken, refreshToken } = generateTokens(payload);

    console.log("Vendor Session Data Before Sending:", {
      profile: vendorSession.profile,
      meals: vendorSession.meals,
      payout: vendorSession.payout,
      reviews: vendorSession.reviews,
    });

    // Step 6: Respond with success message, token, and vendor/session data
    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      refreshToken, // JWT token to be used for authorization
      vendor: {
        // Basic vendor details
        fullname: vendor.fullname,
        email: vendor.email,
        storeName: vendor.storeName,
        vendorType: vendor.vendorType,
      },
      sessionData: {
        // Correctly define sessionData
        ...vendorSession,
        profile: vendorSession.profile || null,
        meals: vendorSession.meals || [],
        payout: vendorSession.payout || [],
        reviews: vendorSession.reviews || [],
      },
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error during vendor login:", error);

    // Enhanced error handling
    if (error.name === "MongoError" && error.code === 11000) {
      return res.status(400).json({
        error: "Database conflict. Please try again.",
      });
    }

    if (error.name === "MongoError" && error.codeName === "IndexNotFound") {
      console.error("Index not found:", error);
      return res.status(500).json({
        error: "Database configuration error",
      });
    }

    res.status(500).json({
      error: "Internal server error. Please try again.",
    });
  }
};

// Get vendor profile
const getVendorProfile = async (req, res) => {
  try {
    const vendorId = req.vendor.vendorId;

    // Find vendor by ID
    const vendor = await Vendor.findById(vendorId).select("-password");
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    res.status(200).json({ vendor });
  } catch (error) {
    console.error("Error retrieving vendor profile:", error);
    res.status(500).json({ error: "Internal server error. Please try again." });
  }
};

const uploadVendorImages = (req, res) => {
  try {
    // Logs the uploaded files
    console.log("Uploaded files:", req.files);

    // Send back the file paths (URLs) to the client
    res.status(200).json({
      message: "Files uploaded successfully",
      files: req.files, // These contain the uploaded file paths (e.g., 'uploads/vendorUploads/profileImage.jpg')
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).json({
      error: "Internal server error while uploading files",
      details: error.message,
    });
  }
};

const updateVendorProfile = async (req, res) => {
  try {
    const vendorId = req?.vendor?.vendorId; // Extract vendor ID from the authenticated user

    // Parse profile data from the request
    const profileData = req.body.profile
      ? JSON.parse(req.body.profile) // Parse if sent as JSON
      : req.body; // Otherwise, use raw body data

    // File paths for uploaded profile and cover images
    const filePaths = {
      profileImagePath: req.files?.profileImage?.[0]?.path || null, // Get profile image path
      coverImagePath: req.files?.coverImage?.[0]?.path || null, // Get cover image path
    };

    // Combine provided data with optional file paths for images
    const updatedData = {
      ...profileData,
      profileImagePath:
        filePaths.profileImagePath || profileData.profileImagePath,
      coverImagePath: filePaths.coverImagePath || profileData.coverImagePath,
    };

    // Update or create the VendorProfile
    const profile = await Profile.findOneAndUpdate(
      { vendor: vendorId }, // Find the profile by vendor ID
      { $set: updatedData }, // Update the profile with the provided data
      { new: true, upsert: true } // Return the updated profile, create one if it doesn’t exist
    );

    // Ensure the VendorSession references the updated profile
    await VendorSession.updateOne(
      { vendor: vendorId }, // Locate the session for the vendor
      { $set: { profile: profile._id } }, // Set the profile reference
      { upsert: true } // Create a session if it doesn’t exist
    );

    // Send a success response to the client
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      vendorProfile: profile,
    });
  } catch (error) {
    console.error("Error updating vendor profile:", error); // Log error for debugging
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Add a meal to the vendor's menu
const addMealToMenu = async (req, res) => {
  console.log("Incoming request body:", req.body);

  try {
    // Extract vendorId from the request body or authenticated user
    const vendorId = req.body.vendorId || req.user.userId;
    console.log("Resolved Vendor ID:", vendorId);

    if (!vendorId) {
      return res.status(400).json({ error: "Vendor ID is required." });
    }

    const {
      mealName,
      description,
      price: rawPrice,
      priceDescription,
      pack,
      inStock,
    } = req.body;
    let image = req.file ? req.file.path : null;

    const price = Number(rawPrice);
    if (isNaN(price) || price <= 0) {
      console.error("Invalid price:", rawPrice);
      return res
        .status(400)
        .json({ error: "Price must be a positive number." });
    }

    if (!mealName || typeof mealName !== "string") {
      console.error("Invalid meal name:", mealName);
      return res
        .status(400)
        .json({ error: "Meal name is required and must be a string." });
    }

    if (!image) {
      console.error("Missing image for meal.");
      return res.status(400).json({ error: "Image is required." });
    }

    image = image.replace("C:\\Users\\ASUS\\food-delivery-app", "");

    const newMeal = new Meal({
      mealName,
      description,
      image,
      price,
      priceDescription,
      pack,
      inStock: inStock === "true",
    });

    const savedMeal = await newMeal.save();

    let vendorSession = await VendorSession.findOne({ vendor: vendorId });

    if (!vendorSession) {
      vendorSession = new VendorSession({
        vendor: vendorId,
        meals: [savedMeal._id],
      });
    } else {
      vendorSession.meals.push(savedMeal._id);
    }

    await vendorSession.save();
    console.log("Meal added successfully:", savedMeal);

    res
      .status(201)
      .json({ message: "Meal added to menu successfully",
        meal: savedMeal 
      });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error. Please try again." });
  }
};

// Get vendor menu
const getVendorMenu = async (req, res) => {
  try {
    const vendorId = req.vendor.vendorId;
    // Find vendor and get menu
    const vendor = await Vendor.findById(VendorId).select("menu");
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found." });
    }

    res.status(200).json({ menu: vendor.menu });
  } catch (error) {
    console.error("Error retrieving vendor menu:", error);
    res.status(500).json({ error: "Internal server error. Please try again." });
  }
};

const removeMenuItem = async (req, res) => {
  const { id } = req.params;
  const { vendorId } = req.body;

  try {
    // Find the vendor's session data
    const vendorSession = await VendorSession.findOne({ vendor: vendorId });
    console.log('🔍 [removeMenuItem] Full vendor session:', JSON.stringify(vendorSession, null, 2));

    if (!vendorSession) {
      console.log('❌ [removeMenuItem] Vendor session not found');
      return res.status(404).json({ error: 'Vendor session not found' });
    }

    // Find the meal's index
    const menuIndex = vendorSession.meals.findIndex(
      (meal) => meal._id.toString() === id
    );
    console.log('🔍 [removeMenuItem] Menu item index:', menuIndex);

    if (menuIndex === -1) {
      console.log('❌ [removeMenuItem] Menu item not found');
      return res.status(404).json({ error: 'Menu item not found' });
    }

    // Get the meal details before deleting
    const mealToDelete = vendorSession.meals[menuIndex];

    if (mealToDelete && mealToDelete.image) {
      const absolutePath = path.join(__dirname, '..', 'uploads', 'vendorAddMenu', mealToDelete.image);
      console.log('Absolute Path:', absolutePath);
      try {
        await fs.promises.unlink(absolutePath);
        console.log('✅ [removeMenuItem] Image file deleted successfully');
      } catch (err) {
        if (err.code === 'ENOENT') {
          console.log('⚠️ [removeMenuItem] Image file not found');
        } else {
          console.error('❌ [removeMenuItem] Error deleting image file:', err);
        }
      }
    }

    // Remove the menu item from the meals array
    vendorSession.meals.splice(menuIndex, 1);
    await vendorSession.save();

    console.log('✅ [removeMenuItem] Menu item removed successfully');

    res.status(200).json({
      success: true,
      updatedMeals: vendorSession.meals,
    });
  } catch (error) {
    console.error('💥 [removeMenuItem] Controller Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// vendorController.js
const refreshVendorToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    // Validate refresh token input
    if (!refreshToken) {
      return res.status(400).json({ 
        message: 'Refresh token is required.',
        debugInfo: 'No refresh token provided' 
      });
    }

    // Call vendor-specific token refresh logic
    const newTokens = await refreshAccessToken(refreshToken);

    // Validate token generation
    if (!newTokens) {
      return res.status(403).json({ 
        message: 'Invalid or expired refresh token.',
        debugInfo: 'Token refresh failed' 
      });
    }

    // Log successful token refresh
    console.log('[VendorController] Token refreshed successfully');
    
    res.json(newTokens);
  } catch (error) {
    console.error('[VendorController] Refresh token error:', error);
    res.status(500).json({ 
      message: 'Internal server error during token refresh',
      debugInfo: error.message 
    });
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
  removeMenuItem,
  refreshVendorToken,
};



