import { Model } from "mongoose";

export type IService = {
  name: string;
  serviceType: "Wash and Fold" | "Dry Cleaning" | "Ironing and Pressing";
  price: number;
  slots: number;
  description: string;
  status: "active" | "upcoming" | "inactive";
};
export type IServiceFilters = {
  searchTerm?: string;
  name?: string;
  minPrice?: number;
  maxPrice?: number;
};
