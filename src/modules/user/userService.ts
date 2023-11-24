import { User } from "@prisma/client";
import prisma from "../../shared/prisma";
import APIError from "../../errorHelpers/APIError";

// single
export const getSingleUserService = async (
  id: string
): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  //   console.log({ result }, 5);
  return result;
};
// update
export const updateUserService = async (
  id: string,
  payload: Partial<User>
): Promise<User | null> => {
  const isExist = await getSingleUserService(id);
  if (!isExist) {
    throw new APIError(404, "User not found !");
  }

  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: payload,
  });
  return result;
};
