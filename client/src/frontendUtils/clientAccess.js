//client/src/frontendUtils/clientAccess.js
// Separate function to retrieve user data from localStorage

const rawUserData = localStorage.getItem('persist:auth');
const rawVendorData = localStorage.getItem('persist:vendor');
console.log('[DEBUG] Raw persist:auth:', rawUserData);
console.log('[DEBUG] Raw persist:vendor:', rawVendorData);


export const getUserData = () => {
    try {
      const authData = JSON.parse(localStorage.getItem("persist:auth") || "null");
      console.log('[DEBUG] Raw persist:auth:', authData);
      if (authData?.accessToken && authData?.refreshToken) {
        console.log("[tokenUtils] User data successfully retrieved");
        return authData;
      }
      console.warn("[tokenUtils] Invalid or missing user data");
      return null;
    } catch (error) {
      console.error("[tokenUtils] Error parsing user data:", error);
      return null;
    }
  };
  
  // Separate function to retrieve vendor data from localStorage
  export const getVendorData = () => {
    try {
      const vendorData = JSON.parse(localStorage.getItem("persist:vendor") || "null");
      console.log('[DEBUG] Raw persist:auth:', vendorData);
      if (vendorData?.accessToken && vendorData?.refreshToken) {
        console.log("[tokenUtils] Vendor data successfully retrieved");
        return vendorData;
      }
      console.warn("[tokenUtils] Invalid or missing vendor data");
      return null;
    } catch (error) {
      console.error("[tokenUtils] Error parsing vendor data:", error);
      return null;
    }
  };
  