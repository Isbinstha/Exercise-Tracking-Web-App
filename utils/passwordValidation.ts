export function validatePassword(password: string) {
  const isValid = password.length >= 6; // Example: at least 6 characters
  const errors = isValid ? [] : ["Password must be at least 6 characters long"];
  return { isValid, errors };
} 