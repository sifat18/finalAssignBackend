import { Schema, model } from "mongoose";
import { AdminModel, IAdmin } from "./adminInterafce";
import { Admin_ROLE } from "./adminConstant";
import config from "../../config";
import bcrypt from "bcrypt";

export const adminSchema = new Schema<IAdmin, AdminModel>(
  {
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "super-admin"],
    },

    address: {
      type: String,
    },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    service: {
      type: String,
      enum: ["user-management", "content-management", "super-management"],
      required: true,
    },
    phoneNumber: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
adminSchema.statics.isAdminExist = async function (
  email: string
): Promise<IAdmin | null> {
  return await Admin.findOne({ email });
};
adminSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};
adminSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  );
  next();
});

export const Admin = model<IAdmin, AdminModel>("Admin", adminSchema);
