import ApplicantModel from "../models/ApplicantModel";

interface DatabaseBody {
  message: string;
  foundUser: {
    name: string;
    surname: string;
    pnr: string;
    email: string;
    username: string;
    role_id: number;
  };
}

/**
 * ApplicantViewModel is responsible for handling the user login logic.
 * It interacts with the ApplicantModel to store and manage the user's state.
 */
export default class ApplicantViewModel {
  private model: ApplicantModel;
  private signedIn: boolean;

  /**
   * Creates an instance of ApplicantViewModel.
   * @param {ApplicantModel} model - An instance of ApplicantModel to manage the user's data.
   */

  constructor(model: ApplicantModel) {
    this.model = model;
    this.signedIn = false;
  }

  /**
   * Placeholder method for creating an account. Currently under development.
   */
  public createAccount() {}

  /**
   * Attempts to log in the user with the provided email and password.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the login was successful.
   */

  public async login(email: string, password: string): Promise<boolean> {
    let databaseBody: DatabaseBody = {
      message: "",
      foundUser: {
        name: "",
        surname: "",
        pnr: "",
        email: "",
        username: "",
        role_id: 0,
      },
    };

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify({
          username: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data?.message) {
        databaseBody = data;
        this.signedIn = true;
      } else {
        this.signedIn = false;
      }
      console.log(databaseBody);
      return this.signedIn;
    } catch (error) {
      console.error("Login request failed:", error);
      return false;
    }
  }

  public registerApplication() {}

  /**
   * Sets the email address in the ApplicantModel.
   * @param {string} email - The email to set in the model.
   */

  public setEmail(email: string) {
    this.model.setEmail(email);
  }

  /**
   * Retrieves the email address from the ApplicantModel.
   * @returns {string} The email address of the user.
   */

  public get email(): string {
    return this.model.getEmail();
  }
}
