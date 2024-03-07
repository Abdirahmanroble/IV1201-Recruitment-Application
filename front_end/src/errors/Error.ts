import { useTranslation } from "react-i18next";

export class Error {
  public static get LOGIN_INVALID_CREDENTIALS(): string {
    return "invalidCredentials";
  } /** Response code: 100 */
  public static get LOGIN_MISSING_USERNAME_AND_PASSWORD(): string {
    return "missingUsernamePassword";
  } /** Error code: 101 */
  public static get LOGIN_MISSING_USERNAME(): string {
    return "missingUsername";
  } /** Error code: 102 */
  public static get LOGIN_INVALID_USERNAME(): string {
    return "invalidUsername";
  } /** Error code: 103 */

  public static get REGISTRATION_MISSING_DATA(): string {
    return "missingData";
  } /** Error code: 201 */
  public static get REGISTRATION_INVALID_EMAIL(): string {
    return "invalidEmail";
  } /** Error code: 202 */
  public static get REGISTRATION_INVALID_PERSON_NUMBER(): string {
    return "invalidPersonNumber";
  } /** Error code: 203 */

  public static get LOGOUT_MISSING_COOKIE(): string {
    return "missingCookie";
  } /** Error code: 301 */

  public static get PASSWORD_TOO_SHORT(): string {
    return "passwordTooShort";
  } /** Error code: 401 */
  public static get PASSWORD_IS_EMPTY(): string {
    return "passwordIsEmpty";
  } /** Error code: 402 */
  public static get PASSWORD_ALREADY_EXISTS(): string {
    return "passwordAlreadyExists";
  } /** Error code: 403 */

  public static get INVALID_EMAIL_FORMAT(): string {
    return "invalidEmailFormat";
  } /** Error code: 501 */

  public static get PASSWORDS_DO_NOT_MATCH(): string {
    return "passwordsDoNotMatch";
  } /** Error code: 10 */

  public static get UNKNOWN_ERROR(): string {
    return "unknownError";
  }
}

function readErrorMsg(errorCode: number): string {
  const { t } = useTranslation();
  switch (errorCode) {
    case 100: {
      return t(Error.LOGIN_INVALID_CREDENTIALS);
    }
    case 101: {
      return t(Error.LOGIN_MISSING_USERNAME_AND_PASSWORD);
    }
    case 102: {
      return t(Error.LOGIN_MISSING_USERNAME);
    }
    case 103: {
      return t(Error.LOGIN_INVALID_USERNAME);
    }
    case 201: {
      return t(Error.REGISTRATION_MISSING_DATA);
    }
    case 202: {
      return t(Error.REGISTRATION_INVALID_EMAIL);
    }
    case 203: {
      return t(Error.REGISTRATION_INVALID_PERSON_NUMBER);
    }
    case 301: {
      return t(Error.LOGOUT_MISSING_COOKIE);
    }
    case 401: {
      return t(Error.PASSWORD_TOO_SHORT);
    }
    case 402: {
      return t(Error.PASSWORD_IS_EMPTY);
    }
    case 403: {
      return t(Error.PASSWORD_ALREADY_EXISTS);
    }
    case 501: {
      return t(Error.INVALID_EMAIL_FORMAT);
    }
    default: {
      return t(Error.UNKNOWN_ERROR);
    }
  }
}

export default readErrorMsg;
