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