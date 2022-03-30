export function validate(company: any) {
  if (
    typeof company.organization === "string" &&
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
    isArrayOfString(company.employees)
  )
    return true;
  return false;
}

function isArrayOfString(arr: string[]) {
  for (const item of arr) {
    if (typeof item !== "string") return false;
  }
  return true;
}
