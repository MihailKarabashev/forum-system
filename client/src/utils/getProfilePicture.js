export const generateSvgIcon = (username) => {
    return username ? username[0].toLowerCase() : '';
}