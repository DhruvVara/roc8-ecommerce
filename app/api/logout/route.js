import { jsonResponse } from "@/utils/jsonResponse";
import { cookies } from "next/headers";

export async function DELETE(req) {
  let status = false;

  try {
    cookies().delete("token");

    return jsonResponse(Response, 200, status, "Logout Successfully");
  } catch (error) {
    console.log("Failed to Verify", error.message);
    return jsonResponse(
      Response,
      500,
      status,
      message.common.serverError,
      error.message
    );
  }
}
