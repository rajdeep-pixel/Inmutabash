export const verifyIdentity = async (formData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: "success", hash: "0x71C83a21F...b49A" });
    }, 3000);
  });
};

export const checkLedgerStatus = async (hash) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (hash.length > 5) {
        resolve({ status: "verified", message: "User is Verified on the Golden Ledger." });
      } else {
        reject(new Error("Invalid Hash or Not Found"));
      }
    }, 1500);
  });
};