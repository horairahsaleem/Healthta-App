import {sendContactEmail} from '../utils/sendEmail.js'
import {catchAsyncError} from '../middleware/catchAsyncError.js'


export const contact = catchAsyncError(async (req, res, next) => {

  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return next(new ErrorHandler("All fields are mandatory", 400));

  const to = process.env.MY_MAIL;
  const subject = "Contact to CourseBundler";
  const text = `I am ${name} and my Email is ${email}. \n${message}`;

  await sendContactEmail(to, subject, text);

  res.status(200).json({
    success: true,
    message: "Your Message Has Been Sent.",
  });
});