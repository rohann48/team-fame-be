import crypto from "crypto";
import { Buffer } from "buffer";
import dotenv from "dotenv";
dotenv.config();
const privateKey = process.env.PRIVATE_KEY;
const algorithm = "aes-192-cbc";
const secret = process.env.CRYPTOSECRET;
const iv = Buffer.alloc(16, 0);
const key = crypto.scryptSync(secret, "salt", 24);

function cryptoEncryptionAes(encrypt) {
  try {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(JSON.stringify(encrypt), "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  } catch (err) {
    throw err;
  }
}

function cryptoDecryptionAes(decrypt) {
  try {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(decrypt, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return JSON.parse(decrypted);
  } catch (error) {
    throw error;
  }
}

function cryptoDecryptionRsa(decrypt) {
  try {
    const key = crypto.createPrivateKey({
      key: Buffer.from(privateKey, "base64"),
      format: "der",
      type: "pkcs1",
    });
    const rsaPrivateKey = {
      key: key,
      passphrase: "",
      padding: crypto.constants.RSA_PKCS1_PADDING,
    };
    const hashArr = decrypt.split("?4|0");
    let decryptedMessage;
    if (hashArr.length > 1) {
      let resStr;
      for (let i = 0; i < hashArr.length; i++) {
        const element = hashArr[i];
        const decipherHash = crypto.privateDecrypt(
          rsaPrivateKey,
          Buffer.from(element, "base64")
        );
        resStr = (resStr || "") + decipherHash.toString("utf8");
      }
      decryptedMessage = resStr;
    } else {
      const decipherHash = crypto.privateDecrypt(
        rsaPrivateKey,
        Buffer.from(decrypt, "base64")
      );
      decryptedMessage = decipherHash.toString("utf8");
    }

    return JSON.parse(decryptedMessage);
  } catch (error) {
    throw error;
  }
}
export { cryptoEncryptionAes, cryptoDecryptionAes, cryptoDecryptionRsa };
