// export const isEnglishString = (val: any): boolean => {
//   // Check if the value is not a string
//   if (typeof val !== 'string') {
//     return false;
//   }

//   // Allow empty string
//   if (val === "") {
//     return true;
//   }

//   // Regular expression to check if the string contains only English letters and single spaces between words, allowing one trailing space
//   const regex = /^[A-Za-z]+(?: [A-Za-z]+)*( )?$/;

//   // Test the string against the regular expression
//   return regex.test(val);
// };

export const isEnglishString = (val: any): boolean => {
  // Check if the value is not a string
  if (typeof val !== "string") {
    return false;
  }

  // Allow empty string
  if (val === "") {
    return true;
  }

  // Regular expression to check if the string contains only English letters, Arabic characters, single spaces between words, and allows one trailing space
  const regex = /^[A-Za-z\u0600-\u06FF]+(?: [A-Za-z\u0600-\u06FF]+)*( )?$/;

  // Test the string against the regular expression
  return regex.test(val);
};

export const isFloat = (val: any) => {
  if (val[val.length - 1] === " " || val === "." || val === "0") {
    return false;
  }
  if (val.includes(".")) {
    val = val.replace(".", "");
    // eslint-disable-next-line no-restricted-globals
    if ((!val.includes(".") && !isNaN(val?.trim())) || val === "") {
      return true;
    }
    return false;
  }
  // eslint-disable-next-line no-restricted-globals
  if (!isNaN(val?.trim()) || val === "") {
    return true;
  }
  return false;
};
export function isValidEmail(email: string) {
  // Regular expression pattern for a valid email address
  const emailPattern = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;

  // Test if the email matches the pattern
  return emailPattern.test(email);
}
export const isNumber = (val: any) => {
  if (Number(val) < 0) {
    return false;
  }
  if (val[val.length - 1] === " ") {
    return false;
  }
  if (val.includes(".")) {
    return false;
  }
  // eslint-disable-next-line no-restricted-globals
  if (!isNaN(val?.trim()) || val === "") {
    return true;
  }
  return false;
};

export const isValidUrl = (url: string) => {
  const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
  return urlPattern.test(url);
};

export const isValidInput = (value: string) => {
  if (value === "") {
    return true;
  }
  if (value.trim() === "") {
    return false; // Reject if the value is empty or only consists of whitespace
  }

  if (value.includes("  ") || value.includes("..")) {
    return false; // Reject if there are consecutive spaces or decimals
  }

  return true; // Accept the input if it meets all the conditions
};
