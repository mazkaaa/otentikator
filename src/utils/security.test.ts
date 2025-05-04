import { decrypt, encrypt, hashData } from "./security";

describe("SecurityUtils", () => {
  const password = "my-secret-password";
  const sensitiveData = "This is a secret message!";

  it("should returned valid data after encrypted", async () => {
    // Encrypt the data
    const { encrypted, iv, authTag } = await encrypt(sensitiveData, password);

    const decrypted = decrypt(encrypted, password, iv, authTag);

    expect(decrypted).resolves.toEqual(sensitiveData);
  });

  it("should returned valid data from encrypted data but using hashed password", async () => {
    const hashedPassword = hashData(password);
    expect(hashedPassword).not.toEqual(password);

    const { encrypted, iv, authTag } = await encrypt(
      sensitiveData,
      hashedPassword,
    );
    const decrypted = decrypt(encrypted, hashedPassword, iv, authTag);
    expect(decrypted).resolves.toBe(sensitiveData);
  });
  it.todo("should throw error if data is tampered");
  it.todo("should throw error if data is corrupted");
});
