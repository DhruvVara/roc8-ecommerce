import generateOTP from "@/utils/generateOTP";
import { jsonResponse } from "@/utils/jsonResponse";
import { message } from "@/utils/message";
import VerifyUser from "@/utils/verifyUser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  let status = false;

  try {
    const { otp } = await req.json();
    const token = req.cookies.get("token").value;

    const decodeToken = await VerifyUser(token);

    const user = await prisma.user.findUnique({
      where: {
        email: decodeToken?.email,
      },
    });

    if (user.otp != otp) {
      return jsonResponse(Response, 400, status, message.user.invalidOTP);
    }

    const updateVerifiedStatus = await prisma.user.update({
      where: {
        email: decodeToken?.email,
      },
      data: {
        verified: true,
      },
    });

    status = true;

    return jsonResponse(
      Response,
      200,
      status,
      message.user.verifiedSuccessfully
    );
  } catch (error) {
    // console.log("Failed to Verify", error);
    return jsonResponse(
      Response,
      500,
      status,
      message.common.serverError,
      error.message
    );
  }
}
