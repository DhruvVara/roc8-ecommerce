import { sendEmail } from "@/utils/emailService";
import generateOTP from "@/utils/generateOTP";
import { jsonResponse } from "@/utils/jsonResponse";
import { message } from "@/utils/message";
import { VerifyUser } from "@/utils/verifyUser";
import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req) {
  let success = false;

  try {
    const token = req.cookies.get("token").value;
    const { otp } = await req.json();

    const decodeToken = await VerifyUser(token);

    console.log(decodeToken);

    const user = await prisma.user.findUnique({
      where: {
        email: decodeToken?.email,
      },
    });

    if (user.otp != otp) {
      return jsonResponse(Response, 400, success, message.user.invalidOTP);
    }

    const updateVerifiedStatus = await prisma.user.update({
      where: {
        email: decodeToken?.email,
      },
      data: {
        verified: true,
      },
    });

    success = true;

    return jsonResponse(
      Response,
      200,
      success,
      message.user.verifiedSuccessfully
    );
  } catch (error) {
    console.log("Failed to Verify", error.message);
    return jsonResponse(
      Response,
      500,
      success,
      message.common.serverError,
      error.message
    );
  }
}

export async function GET(req) {
  let success = false;
  try {
    const token = req.cookies.get("token").value;

    const decodeToken = await VerifyUser(token);

    const generateOtp = generateOTP();

    await prisma.user.update({
      where: {
        email: decodeToken?.email,
      },
      data: {
        otp: generateOtp,
      },
    });

    sendEmail(sendEmail, "Verify your email", `<h3>OTP : ${generateOtp}</h3>`);

    success = true;

    return jsonResponse(Response, 200, success, message.user.emailSent);
  } catch (error) {
    console.log("email code", error.message);
    return jsonResponse(
      Response,
      500,
      success,
      message.common.serverError,
      error.message
    );
  }
}
