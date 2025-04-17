export const getPasswordStrength = (
  hasLowercase: boolean,
  hasNumber: boolean,
  hasUppercase: boolean,
  hasMinLength: boolean
) => {
  let strength = 0;
  if (hasMinLength) strength++;
  if (hasUppercase) strength++;
  if (hasLowercase) strength++;
  if (hasNumber) strength++;
  return strength;
};
