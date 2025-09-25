// utils.ts
export const formatToHyphenated = (input: string): string => {
  return input
    .trim()
    .replace(/[^a-zA-Z0-9\s]/g, "") // remove special chars
    .replace(/\s+/g, "-") // spaces -> hyphen
    .replace(/-+/g, "-") // avoid multiple hyphens
    .toLowerCase();
};
