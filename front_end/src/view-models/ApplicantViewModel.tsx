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
 */
export default class ApplicantViewModel {
  private firstName: string = "";
  private lastName: string = "";
  private personNumber: string = "";
  private email: string = "";
  private username: string = "";
  private competences: { yearsOfExperience: number; name: string }[] = [];
  private signedIn: boolean = false;

  /**
   * Creates an instance of ApplicantViewModel.
   */
  constructor() {}

  /**
   * Placeholder method for creating an account. Currently under development.
   */
  public createAccount(
    firstName: string,
    lastName: string,
    email: string,
    personNumber: string,
    username: string,
    password: string
  ): boolean {
    console.log(
      firstName +
        "\n" +
        lastName +
        "\n" +
        email +
        "\n" +
        personNumber +
        "\n" +
        username +
        "\n" +
        password
    );
    if (firstName && lastName && email && personNumber && username && password)
      return true;
    else return false;
  }

  /**REMOVE LATER */
  public testingLogin(email: string, password: string): boolean {
    if (email === "nina@email.se" && password === "password") return true;
    else return false;
  }

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

  /**Setters */

  public setFirstName(firstName: string) {
    this.firstName = firstName;
  }

  public setLastName(lastName: string) {
    this.lastName = lastName;
  }

  public setPersonNumber(personNumber: string) {
    this.personNumber = personNumber;
  }

  /**
   * Sets the email address.
   * @param {string} email - The email to set.
   */
  public setEmail(email: string) {
    this.email = email;
  }

  public setUsername(username: string) {
    this.username = username;
  }

  public setCompetences(
    competences: { yearsOfExperience: number; name: string }[]
  ) {
    this.competences = competences;
  }

  /**Getters */

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getPersonNumber(): string {
    return this.personNumber;
  }

  /**
   * Retrieves the email address.
   * @returns {string} The email address of the user.
   */
  public getEmail(): string {
    return this.email;
  }

  public getUsername(): string {
    return this.username;
  }

  public getCompetences(): { yearsOfExperience: number; name: string }[] {
    return this.competences;
  }
}
