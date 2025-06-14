/**
 * Utility functions for cryptographic operations using the Web Crypto API
 * Refactored from Node.js crypto for browser compatibility
 */

/**
 * Convert a string to a buffer
 */
const str2buf = (str: string): ArrayBuffer => {
	return new TextEncoder().encode(str);
};

/**
 * Convert a buffer to a string
 */
const buf2str = (buffer: ArrayBuffer): string => {
	return new TextDecoder().decode(buffer);
};

/**
 * Convert ArrayBuffer to base64 string
 */
const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
	const bytes = new Uint8Array(buffer);
	let binary = "";
	for (let i = 0; i < bytes.byteLength; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return btoa(binary);
};

/**
 * Convert base64 string to ArrayBuffer
 */
const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
	const binaryString = atob(base64);
	const bytes = new Uint8Array(binaryString.length);
	for (let i = 0; i < binaryString.length; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}
	return bytes.buffer;
};

/**
 * Utility function to hash password or any string data
 * @param data - The string data to hash
 * @returns - The hashed data in base64 format
 * @description - Uses SHA-256 to hash input data
 */
const hashData = async (data: string): Promise<string> => {
	const msgBuffer = str2buf(data);
	const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
	return arrayBufferToBase64(hashBuffer);
};

/**
 * Derives a cryptographic key from a password
 * @param password - The password to derive the key from
 * @returns - A CryptoKey suitable for AES-GCM
 */
const deriveKey = async (password: string): Promise<CryptoKey> => {
	// First, create a key from the password
	const passwordBuffer = str2buf(password);
	const baseKey = await crypto.subtle.importKey(
		"raw",
		passwordBuffer,
		{ name: "PBKDF2" },
		false,
		["deriveKey"],
	);

	// Use PBKDF2 to derive an AES-GCM key
	const salt = str2buf("static-salt"); // Consider using a more secure salt strategy
	return await crypto.subtle.deriveKey(
		{
			name: "PBKDF2",
			salt,
			iterations: 100000,
			hash: "SHA-256",
		},
		baseKey,
		{ name: "AES-GCM", length: 256 },
		false,
		["encrypt", "decrypt"],
	);
};

/**
 * Encrypts data using AES-GCM
 * @param data - The data to encrypt
 * @param password - The password to use for encryption
 * @returns - Object containing encrypted data, iv, and auth tag in base64
 */
const encrypt = async (
	data: string,
	password: string,
): Promise<{ encrypted: string; iv: string }> => {
	try {
		// Derive key from password
		const key = await deriveKey(password);

		// Generate a random IV
		const iv = crypto.getRandomValues(new Uint8Array(12));

		// Encrypt the data
		const dataBuffer = str2buf(data);
		const encryptedBuffer = await crypto.subtle.encrypt(
			{
				name: "AES-GCM",
				iv: iv,
			},
			key,
			dataBuffer,
		);

		// Return the encrypted data and iv in base64 format
		return {
			encrypted: arrayBufferToBase64(encryptedBuffer),
			iv: arrayBufferToBase64(iv),
		};
	} catch (error) {
		console.error("Encryption error:", error);
		throw error;
	}
};

/**
 * Decrypts data encrypted with AES-GCM
 * @param encrypted - The encrypted data in base64 format
 * @param password - The password used for encryption
 * @param iv - The initialization vector in base64 format
 * @returns - The decrypted data as a string
 */
const decrypt = async (
	encrypted: string,
	password: string,
	iv: string,
): Promise<string> => {
	try {
		// Derive key from password
		const key = await deriveKey(password);

		// Convert base64 strings to buffers
		const encryptedBuffer = base64ToArrayBuffer(encrypted);
		const ivBuffer = base64ToArrayBuffer(iv);

		const ivUint8Array = new Uint8Array(ivBuffer);

		// Decrypt the data
		const decryptedBuffer = await crypto.subtle.decrypt(
			{
				name: "AES-GCM",
				iv: ivUint8Array,
			},
			key,
			encryptedBuffer,
		);

		// Return the decrypted data as string
		return buf2str(decryptedBuffer);
	} catch (error) {
		console.error("Decryption error:", error);
		throw new Error("Failed to decrypt: Invalid password or tampered data");
	}
};

export { decrypt, encrypt, hashData };
