import { randomBytes, createCipheriv, createDecipheriv } from "crypto";

export function encrypt(text, key) {
    const iv = randomBytes(16);
    const cipher = createCipheriv("aes-256-cbc", Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${encrypted.toString("hex")}.${iv.toString("hex")}`;
}

export function decrypt(text, key) {
    const [encrypted, iv] = text.split(".");
    const decipher = createDecipheriv(
        "aes-256-cbc",
        Buffer.from(key),
        Buffer.from(iv, "hex"),
    );
    let decrypted = decipher.update(Buffer.from(encrypted, "hex"));
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
