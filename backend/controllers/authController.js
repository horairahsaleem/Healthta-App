import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateToken } from '../utils/jwtUtils.js';
import { sendVerificationEmail, sendWelcomeEmail } from '../utils/sendEmail.js';

export const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      title,
      city,
      email,
      phoneNumber,
      biologicalSex,
      language,
      password,
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      title,
      city,
      email: email.toLowerCase(),
      phoneNumber,
      biologicalSex,
      language: language || 'English',
      password: hashedPassword,
    });

    // Generate token
    const token = generateToken(user._id);

    // Update user with verification token (if needed)
    user.emailVerificationToken = token;
    await user.save();

    // Send verification email
    await sendVerificationEmail(user.email, token);
    
    // Send welcome email
    await sendWelcomeEmail(user);

    res.status(201).json({
      success: true,
      message: 'Account created successfully. Please check your email for verification.',
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          title: user.title,
          email: user.email,
          role: user.role,
          profileCompleted: user.profileCompleted,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating account',
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists and password is provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Find user and include password
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account has been deactivated',
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          title: user.title,
          email: user.email,
          role: user.role,
          profileCompleted: user.profileCompleted,
          isVerified: user.isVerified,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message,
    });
  }
};

export const socialLogin = async (req, res) => {
  try {
    const { provider, socialId, email, firstName, lastName, role } = req.body;

    console.log('🔐 Social login attempt for:', email);
    console.log('📦 Request body role:', role); // Debug: see if role is coming from request

    // Validate required fields
    if (!provider || !socialId || !email) {
      return res.status(400).json({
        success: false,
        message: 'Provider, socialId, and email are required'
      });
    }

    let user = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { googleId: provider === 'google' ? socialId : null },
        { facebookId: provider === 'facebook' ? socialId : null },
      ],
    });

    if (user) {
      console.log('✅ Existing user found, updating social ID...');
      if (provider === 'google') user.googleId = socialId;
      if (provider === 'facebook') user.facebookId = socialId;
      user.isVerified = true;
      user.emailVerified = true;
      await user.save();
    } else {
      console.log('🆕 Creating new social user...');
      
      // EXPLICITLY set role to patient, ignore any role from request
      const userData = {
        email: email.toLowerCase(),
        firstName: firstName || 'Social',
        lastName: lastName || 'User',
        title: 'Mr',
        city: 'Unknown',
        phoneNumber: '+0000000000',
        biologicalSex: 'Other',
        language: 'English',
        role: 'patient', // ← FORCE this value, ignore request
        isVerified: true,
        emailVerified: true,
        password: undefined
      };

      if (provider === 'google') userData.googleId = socialId;
      if (provider === 'facebook') userData.facebookId = socialId;

      console.log('📋 User data being created:', userData);
      user = await User.create(userData);
      console.log('✅ New social user created');
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Social login successful',
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified,
        },
        token,
      },
    });
  } catch (error) {
    console.error('❌ Social login error details:', error);
    res.status(500).json({
      success: false,
      message: 'Error during social login',
      error: error.message,
    });
  }
};
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // In a real app, you'd verify the token properly
    const user = await User.findOne({ emailVerificationToken: token });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification token',
      });
    }

    user.emailVerified = true;
    user.isVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Email verified successfully',
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying email',
      error: error.message,
    });
  }
};