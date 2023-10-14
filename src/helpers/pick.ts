export const pick = <T extends Record<string, unknown>, k extends keyof T>(
  obj: T,
  keys: k[]
): Partial<T> => {
  const finalObject: Partial<T> = {};
  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObject[key] = obj[key];
    }
  }
  return finalObject;
};
export const paginationFields = ["page", "limit", "sortBy", "sortOrder"];
export const userFilterableFields = ["searchTerm", "email", "phoneNumber"];
export const serviceFilterableFields = [
  "searchTerm",
  "name",
  "minPrice",
  "maxPrice",
];
export const userSearchableFields = ["email", "phoneNumber"];
export const serviceSearchableFields = ["name"];
