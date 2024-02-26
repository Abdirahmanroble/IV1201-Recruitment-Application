/**
 * Checks if a JWT token is present in the document's cookies.
 * This function parses the document's cookies and looks for a cookie
 * that starts with "jwt=", indicating the presence of a JWT token.
 *
 * @returns {boolean} True if a JWT token is found in the cookies, false otherwise.
 */
export const isTokenPresent = () =>
  document.cookie.split(";").some((item) => item.trim().startsWith("jwt="));
