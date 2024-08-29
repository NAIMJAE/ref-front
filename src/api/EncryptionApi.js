import axios from "axios";
import { RootUrl } from "./RootUrl";
const rootURL = RootUrl();

// SHA-256
export const SHAEncryptionApi = async (msg) => {
    const response = await axios.get(`${rootURL}/encryption/sha256/${msg}`);
    return response.data;
};

// BCrypt
export const BCryptEncryptionApi = async (BCrypt) => {
    const response = await axios.get(`${rootURL}/encryption/bcrypt?msg=${BCrypt.Plaintext}&work=${BCrypt.Work}`);
    return response.data;
};

// AES 암호화
export const AESEncryptionApi = async (AES) => {
    const response = await axios.get(`${rootURL}/encryption/aes?msg=${AES.Plaintext}&bit=${AES.Bit}`);
    return response.data;
};
// AES 복호화
export const AESDecryptionApi = async (AES) => {
    const response = await axios.post(`${rootURL}/encryption/aes`, AES);
    return response.data;
};

// RSA 키 생성
export const cerateRSAKeysApi = async () => {
    try {
        const response = await axios.get(`${rootURL}/encryption/rsa`);
        return response.data;
    } catch (error) {
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    console.error('Bad Request:', error.response.data);
                    return error.response.data;
                default:
                    console.error('Other Error:', error.response.data);
                    return error.response.data;
            }
        }
    }
    
};
// RSA 암호화
export const RSAEncryptionApi = async (data) => {
    try {
        const response = await axios.post(`${rootURL}/encryption/rsa/encode`, data);
        return response.data;
    } catch (error) {
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    console.error('Bad Request:', error.response.data);
                    return error.response.data;
                default:
                    console.error('Other Error:', error.response.data);
                    return error.response.data;
            }
        }
    }
    
};
// RSA 복호화
export const RSADecryptionApi = async (data) => {
    try {
        const response = await axios.post(`${rootURL}/encryption/rsa/decode`, data);
        return response.data;
    } catch (error) {
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    console.error('Bad Request:', error.response.data);
                    return error.response.data;
                default:
                    console.error('Other Error:', error.response.data);
                    return error.response.data;
            }
        }
    }
    
};