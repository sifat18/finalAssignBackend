import { User, Admin } from "@prisma/client";
import config from "../../config";
import bcrypt from "bcrypt";
import APIError from "../../errorHelpers/APIError";
import prisma from "../../shared/prisma";
import { updateUserService } from "../user/userService";

// creating user
export const createAdminService = async (user: User): Promise<Admin> => {
  const hashedPassword = await bcrypt.hash(
    user?.password,
    Number(config.bycrypt_salt_rounds)
  );
  user.password = hashedPassword;
  const createdAdmin = await prisma.$transaction(async (transactionClient) => {
    const result = await transactionClient.user.create({
      data: user,
    });
    if (!result) {
      throw new APIError(400, "failed to create User");
    }
    const admin = await transactionClient.admin.create({
      data: {
        userId: result.id,
      },
    });
    if (!admin) {
      throw new APIError(400, "failed to create Admin");
    }
    return admin;
  });

  return createdAdmin;
};
// getting all
export const getAllAdminService = async (): Promise<Promise<Admin[] | []>> => {
  const result = await prisma.admin.findMany({
    include: {
      user: true,
    },
  });

  return result;
};
// single
export const getSingleAdminService = async (
  id: string
): Promise<Admin | null> => {
  const result = await prisma.admin.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
    },
  });
  return result;
};
// update
export const updateAdminService = async (
  id: string,
  payload: Partial<User>
): Promise<Admin | null> => {
  const isExist = await getSingleAdminService(id);
  if (!isExist) {
    throw new APIError(404, "Admin not found !");
  }
  const { userId } = isExist;
  const result = await updateUserService(userId, payload);
  if (result?.id) {
    const isExist = await getSingleAdminService(id);

    return isExist;
  }
  return null;
};
// delete
export const deleteAdminService = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.delete({
    where: {
      id: id,
    },
  });

  return result;
};
