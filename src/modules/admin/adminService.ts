import APIError from "../../helpers/APIError";
import { User } from "../user/userModel";
import { IAdmin } from "./adminInterafce";
import { Admin } from "./adminModel";
// creating user
export const createAdminService = async (
  user: IAdmin
): Promise<IAdmin | null> => {
  const createdAdmin = await Admin.create(user);
  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new APIError(400, "failed to create Admin");
  }

  if (!createdAdmin) {
    throw new APIError(400, "failed to create Admin");
  }
  return createdAdmin;
};
