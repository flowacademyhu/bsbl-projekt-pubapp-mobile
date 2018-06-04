const validation = (value, rules, form) => {
  let valid = true;

  for (let rule in rules) {
    switch (rule) {
      case 'isRequired':
        valid = valid && validateRequired(value);
        break;
      case 'isEmail':
        valid = valid && validateEmail(value);
        break;
      case 'minLength':
        valid = valid && validateMinLength(value, rules[rule]);
        break;
      case 'isPswFormatValid':
        valid = valid && validatePswFormat(value);
        break;
      case 'confirmPass':
        valid = valid && validateConfirmPass(value, form[rules.confirmPass].value);
        break;
      case 'isValidFirstName':
        valid = valid && validateFirstName(value);
        break;
      case 'isValidLastName':
        valid = valid && validateLastName(value);
        break;
      case 'isValidNickName':
        valid = valid && validateNickName(value);
        break;
      default:
        valid = true;
    }
  }
  return valid;
};

const validateRequired = (value) => {
  if (value !== '') {
    return true;
  }
  return false;
};

const validateEmail = (email) => {
  const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return expression.test(String(email).toLocaleLowerCase());
};

const validateMinLength = (value, ruleValue) => {
  if (value.length >= ruleValue) {
    return true;
  }
  return false;
};

const validatePswFormat = (password) => {
  const expression = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{5,20})/;
  return expression.test(String(password));
};

const validateConfirmPass = (confirmPass, password) => {
  if (confirmPass === password) {
    return true;
  }
  return false;
};

const validateFirstName = (firstName) => {
  const expression = /(^[A-ZÖÜÓŐÚÉÁŰÍ]{1}[a-zöüóőúéáűí]{2,})(\s?)([A-ZÖÜÓŐÚÉÁŰÍ]{1}[a-zöüóőúéáűí]{2,})?/;
  return expression.test(String(firstName));
};

const validateLastName = (lastName) => {
  const expression = /(^[A-ZÖÜÓŐÚÉÁŰÍ]{1}[a-zöüóőúéáűí]{2,})(-?\s?)([A-ZÖÜÓŐÚÉÁŰÍ]{1}[a-zöüóőúéáűí]{2,})?/;
  return expression.test(String(lastName));
};

const validateNickName = (nickName) => {
  const expression = /(^[A-ZÖÜÓŐÚÉÁŰÍa-zöüóőúéáűí\d]+)(([_-]?)([A-ZÖÜÓŐÚÉÁŰÍa-zöüóőúéáűí\d]+)){1,}/;
  return expression.test(String(nickName));
};

export default validation;
