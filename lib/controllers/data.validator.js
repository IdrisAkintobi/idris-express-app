"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
function validate(company) {
    if (typeof company.organization === "string" &&
        typeof company.createdAt === "string" &&
        typeof company.updatedAt === "string" &&
        Array.isArray(company.products) &&
        isArrayOfString(company.products) &&
        typeof company.marketValue === "string" &&
        typeof company.address === "string" &&
        typeof company.ceo === "string" &&
        typeof company.country === "string" &&
        typeof company.id === "number" &&
        typeof company.noOfEmployees === "number" &&
        Array.isArray(company.employees) &&
        isArrayOfString(company.employees))
        return true;
    return false;
}
exports.validate = validate;
function isArrayOfString(arr) {
    for (const item of arr) {
        if (typeof item !== "string")
            return false;
    }
    return true;
}
