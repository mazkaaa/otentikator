import { describe, expect, it } from "vitest";
import { decrypt, encrypt, hashData } from "./security";

describe("Security utilities", () => {
	describe("hashData", () => {
		it("should hash a string correctly", async () => {
			const result = await hashData("test");
			expect(typeof result).toBe("string");
			expect(result.length).toBeGreaterThan(0);
		});

		it("should produce consistent hashes for the same input", async () => {
			const hash1 = await hashData("test");
			const hash2 = await hashData("test");
			expect(hash1).toBe(hash2);
		});

		it("should produce different hashes for different inputs", async () => {
			const hash1 = await hashData("test1");
			const hash2 = await hashData("test2");
			expect(hash1).not.toBe(hash2);
		});
	});

	describe("encrypt and decrypt", () => {
		it.todo("should encrypt and decrypt data correctly", async () => {
			const data = "Secret message";
			const password = "password123";

			const encrypted = await encrypt(data, password);
			expect(encrypted.encrypted).toBeDefined();
			expect(encrypted.iv).toBeDefined();

			const decrypted = await decrypt(
				encrypted.encrypted,
				password,
				encrypted.iv,
			);

			expect(decrypted).toBe(data);
		});

		it("should throw error when decrypting with wrong password", async () => {
			const data = "Secret message";
			const correctPassword = "correct-password";
			const wrongPassword = "wrong-password";

			const encrypted = await encrypt(data, correctPassword);

			await expect(
				decrypt(encrypted.encrypted, wrongPassword, encrypted.iv),
			).rejects.toThrow("Failed to decrypt");
		});

		it("should produce different ciphertexts for the same input", async () => {
			const data = "Same data";
			const password = "same-password";

			const encrypted1 = await encrypt(data, password);
			const encrypted2 = await encrypt(data, password);

			expect(encrypted1.encrypted).not.toBe(encrypted2.encrypted);
			expect(encrypted1.iv).not.toBe(encrypted2.iv);
		});

		it.todo("should handle empty strings", async () => {
			const data = "";
			const password = "password123";

			const encrypted = await encrypt(data, password);
			const decrypted = await decrypt(
				encrypted.encrypted,
				password,
				encrypted.iv,
			);

			expect(decrypted).toBe(data);
		});

		it.todo("should handle unicode characters", async () => {
			const data = "😀 Hello 世界!";
			const password = "password123";

			const encrypted = await encrypt(data, password);
			const decrypted = await decrypt(
				encrypted.encrypted,
				password,
				encrypted.iv,
			);

			expect(decrypted).toBe(data);
		});
	});
});
