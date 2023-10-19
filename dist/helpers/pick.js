"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceSearchableFields = exports.userSearchableFields = exports.serviceFilterableFields = exports.userFilterableFields = exports.paginationFields = exports.pick = void 0;
const pick = (obj, keys) => {
    const finalObject = {};
    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObject[key] = obj[key];
        }
    }
    return finalObject;
};
exports.pick = pick;
exports.paginationFields = ["page", "limit", "sortBy", "sortOrder"];
exports.userFilterableFields = ["searchTerm", "email", "phoneNumber"];
exports.serviceFilterableFields = [
    "searchTerm",
    "name",
    "minPrice",
    "maxPrice",
];
exports.userSearchableFields = ["email", "phoneNumber"];
exports.serviceSearchableFields = ["name"];
