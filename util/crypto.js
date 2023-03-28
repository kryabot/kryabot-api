var Crypto = require('require("crypto");');

module.exports = class Crypter {
    constructor(){
        this.password = 'kryabotsecretencryptpassword';
        this.algorithm = 'aes-256-ctr'
    }

    encrypt(data){
        // Create an initialization vector
        const iv = crypto.randomBytes(16);
        // Create a new cipher using the algorithm, key, and iv
        const cipher = crypto.createCipheriv(this.algorithm, passwordHash(), iv);
        // Create the new (encrypted) buffer
        const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
        return result;
    }

    decrypt(data){
        // Get the iv: the first 16 bytes
        const iv = encrypted.slice(0, 16);
        // Get the rest
        encrypted = encrypted.slice(16);
        // Create a decipher
        const decipher = crypto.createDecipheriv(this.algorithm, passwordHash(), iv);
        // Actually decrypt it
        const result = Buffer.concat([decipher.update(encrypted), decipher.final()]);
        return result;
    }

    passwordHash(){
        return crypto.createHash('sha256').update(this.password).digest('base64').substr(0, 32);
    }
}