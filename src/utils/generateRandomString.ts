import crypto from "node:crypto";

export function generateRandomString(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex") // converte os bytes em uma string hexadecimal
    .slice(0, length); // retorna a quantidade de caracteres desejada
}
