import * as crypto from "crypto";
const hashData = (data: string) => {
  const hash = crypto.createHash("sha256");
  hash.update(data);
  const digest = hash.digest("hex");
  return digest;
};

export default hashData;
