//client/src/frontendUtils/pathFormatter.js

export const formatProfilePicPath = (rawPathForUserPix) => {
//  console.log("Raw Path Received:", rawPathForUserPix); // Log the raw path

  const BASE_URL = "http://localhost:5000"; // Backend URL
  const DEFAULT_IMAGE = `${BASE_URL}/uploads/default-image-placeholder.webp`;

  if (!rawPathForUserPix) {
    console.log("Returning Default Image: ", DEFAULT_IMAGE);
    return DEFAULT_IMAGE;
  }

  // Normalize slashes and prepend the full backend URL
  const normalizedPath = rawPathForUserPix.replace(/\\/g, "/");
//  console.log("Normalized Path:", normalizedPath); // Check the normalized path

  // Handle userProfile-specific formatting or return normalized path
  if (normalizedPath.includes('/userProfile')) {
    const formattedPath = `${BASE_URL}/uploads/userProfile/${normalizedPath.split('/userProfile').pop()}`;
  //  console.log("User Profile Image Path:", formattedPath); // Log user profile image path
    return formattedPath;
  }

  // Default case for other image paths
  const finalPath = `${BASE_URL}/uploads/userProfile/${normalizedPath}`;
//  console.log("Final Image Path:", finalPath); // Log the final image path
  return finalPath;
};

export const formatProfilePicPathVendor = (rawPathForVendorProfile) => {
  const BASE_URL = "http://localhost:5000"; // Backend URL
  const DEFAULT_IMAGE = `${BASE_URL}/uploads/default-image-placeholder.webp`;

 // console.log("Raw Path Received For VendorProfile:", rawPathForVendorProfile);

  if (!rawPathForVendorProfile) {
    console.log("Returning Default Image: ", DEFAULT_IMAGE);
    return DEFAULT_IMAGE;
  }

   // Normalize slashes and prepend the full backend URL
   const normalizedPath = rawPathForVendorProfile.replace(/\\/g, "/");
//   console.log("Normalized Path Received For VendorProfile:", normalizedPath);

     // Handle vendorAddMenu-specific formatting or return normalized path
  if (normalizedPath.includes('/vendorProfile')) {
    const formattedPath = `${BASE_URL}/uploads/vendorProfile/${normalizedPath.split('/vendorProfile').pop()}`;
  //  console.log("Vendor Profile Image Path:", formattedPath); // Log user profile image path
    return formattedPath;
  }
   // Default case for other image paths
   const finalPath = `${BASE_URL}/uploads/vendorProfile/${normalizedPath}`;
 //  console.log("Final Image Path:", finalPath); // Log the final image path
   return finalPath;
  }

export const formatImagePath = (rawPathForMenuCards) => {
  const BASE_URL = "http://localhost:5000"; // Backend URL
  const DEFAULT_IMAGE = `${BASE_URL}/uploads/default-image-placeholder.webp`;

  console.log("Raw Path Received For VendorAddMenu:", rawPathForMenuCards);
  if (!rawPathForMenuCards) {
    console.log("Returning Default Image: ", DEFAULT_IMAGE);
    return DEFAULT_IMAGE;
  }

  // Normalize slashes and prepend the full backend URL
  const normalizedPath = rawPathForMenuCards.replace(/\\/g, "/");
  console.log("Normalized Path Received For VendorAddMenu:", normalizedPath);

  // Handle vendorAddMenu-specific formatting or return normalized path
  if (normalizedPath.includes('/vendorAddMenu')) {
    const formattedPath = `${BASE_URL}/uploads/vendorAddMenu/${normalizedPath.split('/vendorAddMenu').pop()}`;
   // console.log("Vendor Profile Image Path:", formattedPath); // Log user profile image path
    return formattedPath;
  }
   // Default case for other image paths
   const finalPath = `${BASE_URL}/uploads/vendorAddMenu/${normalizedPath}`;
//   console.log("Final Image Path:", finalPath); // Log the final image path
   return finalPath;
  }


