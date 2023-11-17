/**
 * A simple utility function to check if an email address is valid or not.
 * @param {String} address 
 * @returns {Boolean}
 */
const validateMailAddress = (address) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(address);
}

export { validateMailAddress };