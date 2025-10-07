import { validateSignupData } from '../utils/validation.js';

export const validateSignup = (req, res, next) => {
  const { errors, isValid } = validateSignupData(req.body);

  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};