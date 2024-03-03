export default class Error {
  private static get LOGIN_MISSING_USERNAME_AND_PASSWORD(): string {
    return "Please enter username and password";
  } /** Error code: 101 */
  private static get LOGIN_MISSING_USERNAME(): string {
    return "Please enter username";
  } /** Error code: 102 */
  private static get LOGIN_INVALID_USERNAME(): string {
    return "Username must be an alphanumeric or an email";
  } /** Error code: 103 */
  private static get LOGIN_UNKNOWN_ERROR(): string {
    return "Login attempt failed. Please try again.";
  } /** Error code: 104 */

  private static get REGISTRATION_MISSING_DATA(): string {
    return "Please enter the required data";
  } /** Error code: 201 */
  private static get REGISTRATION_INVALID_EMAIL(): string {
    return "Please enter a valid email";
  } /** Error code: 202 */
  private static get REGISTRATION_INVALID_PERSON_NUMBER(): string {
    return "Please enter a valid person number (YYYYMMDD-XXX)";
  } /** Error code: 203 */
  private static get REGISTRATION_UNKNOWN_ERROR(): string {
    return "Registration attempt failed. Please try again.";
  } /** Error code: 204 */

  private static get LOGOUT_MISSING_COOKIE(): string {
    return "Unauthorized access to logout";
  } /** Error code: 301 */
  private static get LOGOUT_UNKNOWN_ERROR(): string {
    return "Logout attempt failed. Please try again.";
  } /** Error code: 302 */

  private static get UNKNOWN_ERROR(): string {
    return "Please try again";
  }

  public static readErrorMsg(errorCode: number): string {
    switch (errorCode) {
      case 101: {
        return this.LOGIN_MISSING_USERNAME_AND_PASSWORD;
      }
      case 102: {
        return this.LOGIN_MISSING_USERNAME;
      }
      case 103: {
        return this.LOGIN_INVALID_USERNAME;
      }
      case 104: {
        return this.LOGIN_UNKNOWN_ERROR;
      }
      case 201: {
        return this.REGISTRATION_MISSING_DATA;
      }
      case 202: {
        return this.REGISTRATION_INVALID_EMAIL;
      }
      case 203: {
        return this.REGISTRATION_INVALID_PERSON_NUMBER;
      }
      case 204: {
        return this.REGISTRATION_UNKNOWN_ERROR;
      }
      case 301: {
        return this.LOGOUT_MISSING_COOKIE;
      }
      case 302: {
        return this.LOGOUT_UNKNOWN_ERROR;
      }
      default: {
        return this.UNKNOWN_ERROR;
      }
    }
  }
}
