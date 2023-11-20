import { User, Admin } from "@prisma/client";
import config from "../../config";
import bcrypt from "bcrypt";
import APIError from "../../errorHelpers/APIError";
import prisma from "../../shared/prisma";

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
// // single
// export const getSingleAdminService = async (
//   id: string
// ): Promise<IAdmin | null> => {
//   const result = await Admin.findOne(
//     { _id: new mongoose.Types.ObjectId(id) },
//     { password: 0 }
//   );
//   return result;
// };
// // update
// export const updateAdminService = async (
//   id: string,
//   payload: Partial<IAdmin>
// ): Promise<IAdmin | null> => {
//   const isExist = await Admin.findOne({ _id: new mongoose.Types.ObjectId(id) });
//   if (!isExist) {
//     throw new APIError(404, "Admin not found !");
//   }

//   const { name, password, ...userData } = payload;
//   let hashPas;
//   if (password) {
//     hashPas = await bcrypt.hash(password, Number(config.bycrypt_salt_rounds));
//   }
//   const updatedUserData: Partial<IAdmin> = { ...userData };
//   if (hashPas) {
//     updatedUserData["password"] = hashPas;
//   }
//   // dynamically handling

//   if (name && Object.keys(name).length > 0) {
//     Object.keys(name).forEach((key) => {
//       const nameKey = `name.${key}` as keyof Partial<IAdmin>;
//       (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
//     });
//   }

//   const result = await Admin.findOneAndUpdate(
//     { _id: new mongoose.Types.ObjectId(id) },
//     updatedUserData,
//     {
//       new: true,
//     }
//   );
//   return result;
// };
// // delete
// export const deleteAdminService = async (
//   id: string
// ): Promise<IAdmin | null> => {
//   const result = await Admin.findByIdAndDelete({
//     _id: new mongoose.Types.ObjectId(id),
//   });
//   return result;
// };
