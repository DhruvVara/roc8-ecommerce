import generateOTP from "@/utils/generateOTP";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { jsonResponse } from "@/utils/jsonResponse";
import { message } from "@/utils/message";

const prisma = new PrismaClient();

export async function POST(req) {
  let success = false;

  try {
    const { name, email, password } = await req.json();

    if (!name || name.length < 3) {
      return jsonResponse(Response, 400, success, message.common.nameLength);
    }

    if (!password || password.length < 5) {
      return jsonResponse(Response, 400, success, message.common.passwordLength);
    }

    // checking where email existed or not
    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (user) {
      return jsonResponse(Response, 409, success, message.user.userExist);
    }

    // hash Password
    const hashPassword = await hash(password, 10);

    // send email

    let otp = generateOTP();

    const createUser = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashPassword,
        otp,
      },
    });

    success = true;

    return jsonResponse(
      Response,
      201,
      success,
      message.user.signupSuccessfully
    );
  } catch (error) {
    // console.log("Registration err", error.message);

    return jsonResponse(
      Response,
      500,
      success,
      message.common.serverError,
      error.message
    );
  }
}
