import { VerifyUser } from "@/utils/verifyUser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const token = req.cookies.get("token").value;

    const decodeToken = await VerifyUser(token);

    // console.log(decodeToken);

    const categories = await prisma.user.findUnique({
      where: {
        email: decodeToken.email,
      },
      include: {
        categories: true,
      },
    });

    return Response.json({
      success: true,
      message: "Successfully fetched",
      data: categories.categories,
    });
  } catch (error) {
    console.log("error", error.message);
    return Response.json({
      success: false,
      message: "Internal server error",
    });
  }
}
