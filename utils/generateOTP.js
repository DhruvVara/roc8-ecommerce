import { generate } from "otp-generator";

export default function generateOTP() {
  let otp = generate(8, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  return otp;
}
