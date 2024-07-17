import generateOTP from "@/utils/generateOTP";
import { jsonResponse } from "@/utils/jsonResponse";
import { message } from "@/utils/message";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(req) {
  let success = false;

  try {
    const { email, password } = await req.json();

    // Checking email exist or not
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: { categories: true },
    });

    if (!user) {
      return jsonResponse(Response, 400, success, message.user.notFound);
    }

    // Verify Password
    const verifyPassword = await compare(password, user.password);

    if (!verifyPassword) {
      return jsonResponse(
        Response,
        401,
        success,
        message.user.invalidCredentials
      );
    }

    const payload = {
      email: user.email,
      id: user._id,
      verified: user.verified,
    };

    const token = sign(payload, process.env.JWT_SECRET);

    if (!user.verified) {
      const generateOtp = generateOTP();

      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          otp: generateOtp,
        },
      });
    }

    success = true;

    cookies().set("token", token, { maxAge: 1000, secure: true });

    return jsonResponse(
      Response,
      200,
      success,
      message.user.logInSuccessfully,
      {
        verified: user.verified,
      }
    );
  } catch (error) {
    // console.log("Login err", err);
    return jsonResponse(
      Response,
      500,
      success,
      message.common.serverError,
      error.message
    );
  }
}
