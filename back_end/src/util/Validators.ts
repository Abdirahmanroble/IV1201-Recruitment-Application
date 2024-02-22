import validator from "validator";

class UserValidators {
  static validateLoginData(data: {
    username?: string;
    password?: string;
  }): void {
    const { username, password } = data;
    if (!username && !password) {
      throw new Error("Please provide either an email/username or a password.");
    }
    if (username && validator.isEmpty(username)) {
      throw new Error("Username cannot be empty.");
    }
    if (username) {
      if (
        validator.isEmpty(username) ||
        (!validator.isEmail(username) &&
          !validator.isAlphanumeric(username))
      ) {
        throw new Error(
          "Username must be a valid email or an alphanumeric username."
        );
      }
    }
  
  }
  static validateRegistrationData(data: {
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    pnr: string;
  }): void {
    const { name, surname, username, email, password, pnr } = data;

    if (!name || !surname || !username || !email || !password) {
      throw new Error(
        "Name, surname, username, email, and password are required for registration."
      );
    }

    this.isNonZeroLengthString(name, "Name");
    this.isNonZeroLengthString(surname, "Surname");
    this.isNonZeroLengthString(username, "Username");
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email format.");
    }
    this.isNonZeroLengthString(password, "Password");
    if (pnr && !this.validateSwedishPersonalNumber(pnr)) {
      throw new Error(
        "Invalid personal number format. Expected format: YYYYMMDD-XXXX."
      );
    }
  }

  private static isNonZeroLengthString(value: string, fieldName: string): void {
    if (typeof value !== "string" || validator.isEmpty(value)) {
      throw new Error(`${fieldName} must be a non-empty string.`);
    }
  }

  private static validateSwedishPersonalNumber(pnr: string): boolean {
    return /^\d{8}-\d{4}$/.test(pnr);
  }

  private static validateAsEmailOrUsername(identifier: string): boolean {
    if (validator.isEmail(identifier)) {
      return true;
    }
    return !validator.isEmpty(identifier);
  }
}

export default UserValidators;
