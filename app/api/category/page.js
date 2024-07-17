import { jsonResponse } from "@/utils/jsonResponse";
import { message } from "@/utils/message";
import { VerifyUser } from "@/utils/verifyUser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// to fetch the all categories
export async function GET(req) {
  let success = false;

  try {
    const url = new URL(req.url);
    const searchparams = new URLSearchParams(url.searchParams);
    const page = searchparams.get("page");
    const limit = 5;
    const skip = (page - 1) * limit;

    const category = await prisma.$transaction([
      prisma.category.count(),
      prisma.category.findMany({
        skip: skip,
        take: limit,
      }),
    ]);

    success = true;
    return jsonResponse(
      Response,
      200,
      success,
      message.common.fetchSuccessfully,
      { totalPage: Math.ceil(category[0] / 5), category: category[1] }
    );
  } catch (error) {
    // console.error(error);
    return jsonResponse(
      Response,
      500,
      success,
      message.common.serverError,
      error.message
    );
  }
}

// to update the user category
export async function PUT(req) {
  let success = false;

  try {
    const token = req.cookies.get("token").value;
    const { selectedCategories } = await req.json();

    const decodeToken = await VerifyUser(token);

    const existingUser = await prisma.user.findUnique({
      where: { email: decodeToken?.email },
      include: { categories: true },
    });

    if (!existingUser) {
      return jsonResponse(Response, 400, success, message.user.notFound);
    }

    const user = await prisma.user.update({
      where: { email: decodeToken?.email },
      data: {
        categories: {
          disconnect: existingUser.categories,
          connect: selectedCategories.map((id) => ({ id })),
        },
      },
      include: {
        categories: true,
      },
    });

    // console.log(user);
    success = true;
    return jsonResponse(
      Response,
      200,
      success,
      message.common.updateSuccessfully
    );
  } catch (error) {
    console.error("Error updating user categories:", error.message);
    return jsonResponse(
      Response,
      500,
      success,
      message.common.serverError,
      error.message
    );
  }
}
