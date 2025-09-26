import validator from 'validator';

export const validateSignupData = (data) => {
  const errors = {};

  // First Name validation
  if (!data.firstName || !validator.isLength(data.firstName, { min: 2, max: 50 })) {
    errors.firstName = 'First name must be between 2 and 50 characters';
  }

  // Last Name validation
  if (!data.lastName || !validator.isLength(data.lastName, { min: 2, max: 50 })) {
    errors.lastName = 'Last name must be between 2 and 50 characters';
  }

  // Title validation
  const validTitles = ['Mr', 'Mrs', 'Prof', 'Doc'];
  if (!data.title || !validTitles.includes(data.title)) {
    errors.title = 'Please select a valid title';
  }

  // Email validation
  if (!data.email || !validator.isEmail(data.email)) {
    errors.email = 'Please provide a valid email address';
  }

  // Phone validation
  if (!data.phoneNumber || !validator.isMobilePhone(data.phoneNumber.replace(/\s/g, ''))) {
    errors.phoneNumber = 'Please provide a valid phone number';
  }

  // City validation
  if (!data.city || !validator.isLength(data.city, { min: 2, max: 100 })) {
    errors.city = 'City must be between 2 and 100 characters';
  }

  // Biological Sex validation
  const validSex = ['Male', 'Female', 'Other'];
  if (!data.biologicalSex || !validSex.includes(data.biologicalSex)) {
    errors.biologicalSex = 'Please select a valid biological sex';
  }

  // Password validation
  if (!data.password || !validator.isLength(data.password, { min: 6 })) {
    errors.password = 'Password must be at least 6 characters long';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};