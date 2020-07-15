function isValidEmail(email) {
  const emailValidator = /(.+)@(.+){2,}\.(.+){2,}/;

  return emailValidator.test(email);
}

function isValidPassword(password) {
  return password.length >= 6;
}

function isValidName(name) {
  const stringRegex = /^[A-Za-z]+$/;
  return stringRegex.test(name);
}

export { isValidEmail, isValidPassword, isValidName };
