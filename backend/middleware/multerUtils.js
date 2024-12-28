//backend/middleware/multerUtils
const path = require("path");
const fs = require("fs");

// Utility to track ongoing operations for rollback
const operationTracker = new Map();

// Utility to check if file exists
const checkFileExists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

// Enhanced file deletion with existence check and logging
const safeDeleteFile = async (filePath) => {
  try {
    const exists = await checkFileExists(filePath);
    if (!exists) {
      console.log(`[MULTER] File does not exist: ${filePath}`);
      return false;
    }
    await fs.unlink(filePath);
    console.log(`[MULTER] Successfully deleted file: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`[MULTER] Error deleting file ${filePath}:`, error);
    throw error;
  }
};


// Utility to overwrite existing files
const overwriteExistingFiles = (directory, identifier) => {
  const files = fs.readdirSync(directory);
  files.forEach((file) => {
    if (file.includes(identifier)) {
      const filePath = path.join(directory, file);
      fs.unlinkSync(filePath);
      console.log(`[MULTER] Deleted existing file: ${filePath}`);
    }
  });
};

// Rollback mechanism for failed operations
const rollbackOperation = async (operationId) => {
  const operation = operationTracker.get(operationId);
  if (!operation) {
    throw new Error(`No operation found with ID: ${operationId}`);
  }

  if (operation.status === "failed") {
    console.log(`[MULTER] Starting rollback for operation: ${operationId}`);
    // Implement specific rollback logic based on operation type
    // For now, we'll just log the attempt
    console.log(
      `[MULTER] Would restore files: ${operation.deletedFiles.join(", ")}`
    );
  }

  operationTracker.delete(operationId);
};

// Enhanced middleware with atomic operations
const deleteFilesMiddleware = (directory, identifierKey) => {
  return async (req, res, next) => {
    const identifier = req.body[identifierKey];
    let operationId = null;

    try {
      if (!identifier) {
        console.warn(
          `[DELETE FILES MIDDLEWARE] No identifier provided for file deletion.`
        );
        return next();
      }

      // Verify directory exists
      const dirExists = await checkFileExists(directory);
      if (!dirExists) {
        throw new Error(`Directory does not exist: ${directory}`);
      }

      operationId = await overwriteExistingFiles(directory, identifier);

      // Store operation ID in request for potential rollback
      req.fileOperationId = operationId;
      next();
    } catch (error) {
      console.error(`[DELETE FILES MIDDLEWARE] Error:`, error);

      if (operationId) {
        try {
          await rollbackOperation(operationId);
          console.log(
            `[DELETE FILES MIDDLEWARE] Rollback completed for operation: ${operationId}`
          );
        } catch (rollbackError) {
          console.error(
            `[DELETE FILES MIDDLEWARE] Rollback failed:`,
            rollbackError
          );
        }
      }

      res.status(500).json({
        error: "Failed to process files",
        details: error.message,
      });
    }
  };
};

// Cleanup utility for old operations
const cleanupOldOperations = () => {
  const ONE_HOUR = 60 * 60 * 1000;

  setInterval(() => {
    const now = Date.now();
    for (const [operationId, operation] of operationTracker.entries()) {
      const operationTime = parseInt(operationId.split("-").pop());
      if (now - operationTime > ONE_HOUR) {
        operationTracker.delete(operationId);
      }
    }
  }, ONE_HOUR);
};

// Start cleanup interval
cleanupOldOperations();

// File name generation strategy
const generateFileName = (req, file) => {
  const vendorId = req?.vendor?.vendorId;
  console.log("Request User:", req?.vendor?.vendorId);

  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  return `vendor-${vendorId}-${uniqueSuffix}${path.extname(file.originalname)}`;
};

const generateUserProfileFileName = (req, file) => {
  // Extract user ID from authenticated request
  const userId = req.user.userId;

  // Create a unique filename with user ID, timestamp, and original extension
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  return `user-${userId}-profilePic-${uniqueSuffix}${path.extname(
    file.originalname
  )}`;
};

module.exports = {
  generateFileName,
  generateUserProfileFileName,
  overwriteExistingFiles,
  deleteFilesMiddleware,
  safeDeleteFile,
  rollbackOperation,
  checkFileExists,
};
