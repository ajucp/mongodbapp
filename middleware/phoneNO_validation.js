const validatePhoneNumber=(phoneNumber)=>{
    const phoneNumberRegex = /^\+[1-9][0-9]{6,14}$/;
    return phoneNumberRegex.test(phoneNumber);
    // return phoneNumberRegex
}
module.exports={validatePhoneNumber}