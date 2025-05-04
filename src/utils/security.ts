import * as crypto from "crypto";

/**
 * Utility function to hash password or any string data
 * @param data - The string data to hash
 * @returns - The hashed data in base64 format
 * @description - This function uses the SHA-256 hashing algorithm to hash the input data. It is useful for securely storing passwords or verifying data integrity.
 */
const hashData = (data: string): string => {
  const hash = crypto.createHash("sha256");
  hash.update(data);
  const digest = hash.digest("base64");
  return digest;
};

/**
 * Derives a 32-byte encryption key from a password
 * @param password - The password to derive the key from
 * @returns - A 32-byte Buffer suitable for AES-256-GCM
 */
const deriveKey = (password: string): Buffer => {
  // Use PBKDF2 for better key derivation (recommended)
  // For even better security, you should store and use a salt
  const salt = crypto.createHash("sha256").update("static-salt").digest();
  return crypto.pbkdf2Sync(password, salt, 10000, 32, "sha256");
};

/**
 * Encrypts data using AES-256-GCM
 * @param data - The data to encrypt (string or Buffer)
 * @param password - The password to use for encryption
 * @returns - An object containing the encrypted data, iv, and auth tag in base64 format
 */
const encrypt = (data: string | Buffer, password: string) => {
  return new Promise<{
    encrypted: string;
    iv: string;
    authTag: string;
  }>((resolve, reject) => {
    try {
      const key = deriveKey(password);
      const iv = crypto.randomBytes(12); // GCM recommends 12-byte IV
      const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

      let encrypted = cipher.update(data);
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      const authTag = cipher.getAuthTag();

      resolve({
        encrypted: encrypted.toString("base64"),
        iv: iv.toString("base64"),
        authTag: authTag.toString("base64"),
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Decrypts data encrypted with AES-256-GCM
 * @param encrypted - The encrypted data in base64 format
 * @param password - The password used for encryption
 * @param iv - The initialization vector in base64 format
 * @param authTag - The authentication tag in base64 format
 * @returns - The decrypted data as a string
 * @throws - If authentication fails (invalid password or tampered data)
 */
const decrypt = (
  encrypted: string,
  password: string,
  iv: string,
  authTag: string,
) => {
  return new Promise<string>((resolve, reject) => {
    try {
      const key = deriveKey(password);
      const ivBuffer = Buffer.from(iv, "base64");
      const encryptedBuffer = Buffer.from(encrypted, "base64");
      const authTagBuffer = Buffer.from(authTag, "base64");

      const decipher = crypto.createDecipheriv("aes-256-gcm", key, ivBuffer);
      decipher.setAuthTag(authTagBuffer);

      let decrypted = decipher.update(encryptedBuffer);
      decrypted = Buffer.concat([decrypted, decipher.final()]);

      resolve(decrypted.toString());
    } catch (error) {
      reject(error);
    }
  });
};

export { decrypt, deriveKey, encrypt, hashData };
