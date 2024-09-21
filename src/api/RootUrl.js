//export const Host = '3.35.87.115';
export const Host = 'refcode.shop';
//export const Host = 'localhost';
export const RootUrl = () => {
    return `https://${Host}/ref`;
};

export const FrontUrl = () => {
    return `http://${Host}:3000`;
};
