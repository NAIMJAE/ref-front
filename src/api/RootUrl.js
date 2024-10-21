//export const Host = 'refcode.shop';
export const Host = 'localhost:8080';
export const RootUrl = () => {
    //return `https://refcode.shop/ref`;
    //return `https://api.refcode.info/ref`;
    return `http://localhost:8080/ref`;
};

export const FrontUrl = () => {
    return `http://${Host}:3000`;
};