const nameRegex = /^[A-Za-z\s'-]+$/;

export function validateName(name:string) {
  return nameRegex.test(name);
}
const phoneRegex = /^(\+?\d{1,3}[- ]?)?(\(?\d{3}\)?[- ]?)?\d{3}[- ]?\d{4}$/;

export function validatePhoneNumber(phoneNumber) {
  return phoneRegex.test(phoneNumber);
}