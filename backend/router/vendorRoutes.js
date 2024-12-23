//backend/router/vendorRoutes.js
const express = require("express");
const vendorRouter = express.Router();
const vendorAuthMiddleware = require("../middleware/vendorAuthMiddleware");
const { vendorProfileUpload } = require("../middleware/vendorProfileMulter");
const { vendorMenuUpload } = require("../middleware/vendorAddMenuMulter");
const vendorController = require("../controllers/vendorController");
const refreshMiddleware = require("../middleware/refreshMiddleware"); // refresh validation

const {
  registerVendor,
  loginVendor,
  getVendorProfile,
  updateVendorProfile,
  addMealToMenu,
  getVendorMenu,
  refreshVendorToken,
  removeMenuItem,
} = vendorController;

// Vendor Routes
vendorRouter.post("/signup", registerVendor); // Vendor signup

vendorRouter.post("/login", loginVendor); // Vendor login

vendorRouter.post(
  "/profile",
  vendorAuthMiddleware,
  vendorProfileUpload,
  updateVendorProfile
); // Update vendor profile

vendorRouter.put(
  "/profile",
  vendorAuthMiddleware,
  refreshMiddleware,
  vendorProfileUpload,
  updateVendorProfile
); // Update vendor

vendorRouter.get(
  "/profile",
  vendorAuthMiddleware,
  refreshMiddleware,
  getVendorProfile
); // Get vendor profile

vendorRouter.post(
  "/addmenu",
  vendorAuthMiddleware,
  vendorMenuUpload,
  addMealToMenu
); // Add meal to menu

vendorRouter.get("/menu", vendorAuthMiddleware, getVendorMenu); // Get vendor menu

vendorRouter.delete("/dashboard/:id", vendorAuthMiddleware, removeMenuItem);

// Debug logging for vendor routes
vendorRouter.use((req, res, next) => {
  console.log(`Vendor route hit: ${req.method} ${req.path}`);
  next();
});

// Vendor refresh token route
vendorRouter.post("/refresh-session", refreshVendorToken);

module.exports = vendorRouter;
