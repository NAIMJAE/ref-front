//export const Host = '3.35.87.115';
export const Host = 'localhost';
export const RootUrl = () => {
    return `http://${Host}:8080/ref`;
};

export const FrontUrl = () => {
    return `http://${Host}:3000`;
};
