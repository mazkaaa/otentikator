import * as crypto from "crypto";

const encrypt = async (
  password: string,
  data: string,
): Promise<{ cipherText: string; iv: string; tag: Buffer }> => {
  return new Promise((resolve, reject) => {
    try {
      // create a random initialization vector
      const iv = crypto.randomBytes(12).toString("base64");

      // create a cipher object
      const cipher = crypto.createCipheriv("aes-256-gcm", password, iv);

      // update the cipher object with the plaintext to encrypt
      let cipherText = cipher.update(data, "utf8", "base64");

      // finalize the encryption process
      cipherText += cipher.final("base64");

      // retrieve the authentication tag for the encryption
      const tag = cipher.getAuthTag();

      resolve({ cipherText, iv, tag });
    } catch (error) {
      reject(error);
    }
  });
};

const decrypt = (
  password: string,
  cipherText: string,
  iv: string,
  tag: Buffer<ArrayBufferLike>,
) => {
  // create a decipher object
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    Buffer.from(password, "base64"),
    Buffer.from(iv, "base64"),
  );

  // set the authentication tag for the decipher object
  decipher.setAuthTag(tag);

  // update the decipher object with the base64-encoded ciphertext
  let plaintext = decipher.update(cipherText, "base64", "utf8");

  // finalize the decryption process
  plaintext += decipher.final("utf8");

  return plaintext;
};

const hashData = (data: string) => {
  const hash = crypto.createHash("sha256");
  hash.update(data);
  const digest = hash.digest("base64");
  return digest;
};

export { decrypt, encrypt, hashData };
