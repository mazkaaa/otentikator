import { IKeyCard, IKeyCardEncrypted } from "@/types/key-card";
import { decrypt, encrypt } from "./security";

/**
 * Saves encrypted key cards to local storage
 * @param keys - The array of key cards to be saved
 * @param password - The password used for encryption
 * @returns - A promise that resolves when the data is saved
 * @throws - If encryption fails
 */
const saveKeyToStorage = (keys: IKeyCard[], password: string) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const encryptedData = await encrypt(JSON.stringify(keys), password);
      localStorage.setItem("otp-data", JSON.stringify(encryptedData));
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Loads and decrypts key cards from local storage
 * @param password - The password used for encryption
 * @returns - A promise that resolves to an array of decrypted key cards
 * @throws - If decryption fails
 */
const loadKeyFromStorage = (password: string) => {
  return new Promise<IKeyCard[]>(async (resolve, reject) => {
    try {
      const dataStorage = localStorage.getItem("otp-data");
      if (dataStorage) {
        const parsedData: IKeyCardEncrypted = JSON.parse(dataStorage);
        const decryptedData = await decrypt(
          parsedData.encrypted,
          password,
          parsedData.iv,
          parsedData.authTag,
        );
        resolve(JSON.parse(decryptedData));
      } else {
        resolve([]);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export { loadKeyFromStorage, saveKeyToStorage };
