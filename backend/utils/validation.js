<<<<<<< Updated upstream
=======
import validator from "validator";

export const validateSignupData = (data) => {
  const errors = {};

  const firstName = (data.firstName || "").trim();
  const lastName = (data.lastName || "").trim();
  const email = (data.email || "").trim();
  const phone = (data.phone || "").trim(); // ✅ changed to phone
  const city = (data.city || "").trim();
  const sex = (data.sex || "").trim(); // ✅ changed to sex
  const password = data.password || "";

  // First Name
  if (!firstName || !validator.isLength(firstName, { min: 2, max: 50 })) {
    errors.firstName = "First name must be between 2 and 50 characters";
  }

  // Last Name
  if (!lastName || !validator.isLength(lastName, { min: 2, max: 50 })) {
    errors.lastName = "Last name must be between 2 and 50 characters";
  }

  // Email
  if (!email || !validator.isEmail(email)) {
    errors.email = "Please provide a valid email address";
  }

  // Phone
  if (!phone || !/^\+?[\d\s-()]{10,}$/.test(phone)) {
    errors.phone = "Please provide a valid phone number (min 10 digits)";
  }

  // City
  if (!city || !validator.isLength(city, { min: 2, max: 100 })) {
    errors.city = "City must be between 2 and 100 characters";
  }

  // Sex
  const validSex = ["Male", "Female", "Other"];
  if (!sex || !validSex.includes(sex)) {
    errors.sex = "Please select Male, Female or Other";
  }

  // Password
  if (!password || !validator.isLength(password, { min: 6 })) {
    errors.password = "Password must be at least 6 characters long";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
>>>>>>> Stashed changes
