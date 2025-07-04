// Function to split full name into first and last name
// This function assumes the first word is the last name and the rest is the first name

export const splitFullName = (fullName) => {
  if (!fullName || typeof fullName !== "string") {
    return { firstName: "", lastName: "" };
  }

  // Clean and trim the input
  const cleanName = fullName.trim().replace(/\s+/g, " ");

  if (!cleanName) {
    return { firstName: "", lastName: "" };
  }

  const parts = cleanName.split(" ");

  // First part is first name, rest combined as last name
  const firstName = parts[0];
  const lastName = parts.length > 1 ? parts.slice(1).join(" ") : "";

  return { firstName, lastName };
};
