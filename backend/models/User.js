import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    // 👤 Basic Info (EXACTLY from your Figma signup form)
    firstName: {
        type: String,
        required: function() { return !this.googleId && !this.facebookId; },
        trim: true,
        maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
        type: String,
        required: function() { return !this.googleId && !this.facebookId; },
        trim: true,
        maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    title: {
        type: String,
        required: function() { return !this.googleId && !this.facebookId; },
        enum: ['Mr', 'Mrs', 'Prof', 'Doc']
    },
    
    // 📍 Location (from Figma)
    city: {
        type: String,
        required: function() { return !this.googleId && !this.facebookId; },
        trim: true
    },
    
    // 📞 Contact Info (from Figma)
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phoneNumber: {
        type: String,
        required: function() { return !this.googleId && !this.facebookId; },
        match: [/^\+?[\d\s-()]{10,}$/, 'Please enter a valid phone number']
    },
    
    // 👫 Personal Details (from Figma)
    biologicalSex: {
        type: String,
        required: function() { return !this.googleId && !this.facebookId; },
        enum: ['Male', 'Female', 'Other']
    },
    language: {
        type: String,
        default: 'English',
        enum: ['English', 'Spanish', 'French', 'German', 'Hindi', 'Arabic', 'Urdu']
    },
    
    // 🔐 Security & Authentication
    password: {
        type: String,
        required: function() { return !this.googleId && !this.facebookId; },
        minlength: [6, 'Password must be at least 6 characters'],
        select: false
    },
    
    // 🔗 Social Login (from Figma buttons)
    googleId: { type: String, sparse: true },
    facebookId: { type: String, sparse: true },
    
    // 🏷️ User Type (for different dashboards)
    role: {
        type: String,
        enum: ['patient', 'doctor', 'admin'],
        default: 'patient'
    },
    
    // ✅ Account Status
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    emailVerified: { type: Boolean, default: false },
    
    // 🎯 Profile Completion (for onboarding)
    profileCompleted: { type: Boolean, default: false },
    onboardingStep: { type: Number, default: 1 }

}, { 
    timestamps: true 
});

// 🎯 SCHEMA METHODS (Business Logic)

// 1. Get full name with title (for displaying in UI)
userSchema.methods.getFullName = function() {
    return `${this.title} ${this.firstName} ${this.lastName}`;
};

// 2. Check if profile is complete (for onboarding progress)
userSchema.methods.isProfileComplete = function() {
    const requiredFields = ['firstName', 'lastName', 'email', 'phoneNumber', 'city'];
    return requiredFields.every(field => this[field]);
};

// 3. Check if user can book appointments
userSchema.methods.canBookAppointment = function() {
    return this.isVerified && this.isActive && this.profileCompleted;
};

// 4. Hide sensitive information
userSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user.password;
    return user;
};

// 🚀 STATIC METHODS (Database Operations)

// 1. Find by email (for login)
userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email: email.toLowerCase() });
};

// 2. Find active doctors (for booking)
userSchema.statics.findActiveDoctors = function() {
    return this.find({ role: 'doctor', isActive: true, isVerified: true });
};

// 3. Find patients by city (for doctors)
userSchema.statics.findPatientsByCity = function(city) {
    return this.find({ role: 'patient', city, isActive: true });
};

// 📊 INDEXES for performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1, isActive: 1 });
userSchema.index({ city: 1 });
userSchema.index({ createdAt: -1 });

export default mongoose.model('User', userSchema);