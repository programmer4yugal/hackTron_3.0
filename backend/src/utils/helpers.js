// Utility helper functions

const formatDate = (date) => {
  return date.toISOString();
};

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const parseUserType = (userType) => {
  const validTypes = ['student', 'founder', 'creator'];
  return validTypes.includes(userType?.toLowerCase()) ? userType.toLowerCase() : 'student';
};

const delay = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

module.exports = {
  formatDate,
  capitalize,
  validateEmail,
  parseUserType,
  delay
};
