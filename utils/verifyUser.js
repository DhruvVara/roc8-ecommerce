import { verify } from "jsonwebtoken";
import { jsonResponse } from "./jsonResponse";
import { message } from "./message";

export function VerifyUser(token) {
  const decode = verify(token, process.env.JWT_SECRET);

  if (!decode) {
    return jsonResponse(Resposne, 401, false, message.common.unauthorised);
  }

  if (!decode.verified) {
    return Response.redirect(new URL("/verify", req.url));
  }

  return decode;
}
