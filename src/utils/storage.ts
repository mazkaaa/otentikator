import type { IKeyCard, IKeyCardEncrypted } from "@/types/key-card";
import { decrypt, encrypt } from "./security";

/**
 * Saves encrypted key cards to local storage
 * @param keys - The array of key cards to be saved
 * @param password - The password used for encryption
 * @returns - A promise that resolves when the data is saved
 * @throws - If encryption fails
 */
const saveKeyToStorage = (keys: IKeyCard[], password: string) => {
	return new Promise<void>((resolve, reject) => {
		encrypt(JSON.stringify(keys), password)
			.then((encryptedData) => {
				localStorage.setItem("otp-data", JSON.stringify(encryptedData));
				resolve();
			})
			.catch(reject);
	});
};

/**
 * Loads and decrypts key cards from local storage
 * @param password - The password used for encryption
 * @returns - A promise that resolves to an array of decrypted key cards
 * @throws - If decryption fails
 */
const loadKeyFromStorage = (password: string) => {
	return new Promise<IKeyCard[]>((resolve, reject) => {
		try {
			const dataStorage = localStorage.getItem("otp-data");
			if (dataStorage) {
				const parsedData: IKeyCardEncrypted = JSON.parse(dataStorage);
				decrypt(parsedData.encrypted, password, parsedData.iv)
					.then((decryptedData) => {
						resolve(JSON.parse(decryptedData));
					})
					.catch(reject);
			} else {
				resolve([]);
			}
		} catch (error) {
			reject(error);
		}
	});
};

export { loadKeyFromStorage, saveKeyToStorage };
