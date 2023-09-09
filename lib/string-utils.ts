export const capitalize = (originalString: string) =>
  originalString.charAt(0).toUpperCase() + originalString.slice(1);

export const formatPhoneNumber = (phoneNumber: string) =>
  phoneNumber.slice(0, 3) + "-" + phoneNumber.slice(3);

export const phoneNumberRegex = /^\d{3}-\d{7}$/;
