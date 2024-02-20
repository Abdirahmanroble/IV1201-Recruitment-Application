import {
  UserBody,
  LoginResponseBody,
  RegisterResponseBody,
  ApplicationsResponseBody,
} from "../@types/Applicant";

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
  private role: number = 0;
  private signedIn: boolean = false;

  public changeAuthState: (state: boolean) => void = (state: boolean) => {
    console.log(state);
  };
  public changeState: (viewModel: ApplicantViewModel) => void = (
    viewModel: ApplicantViewModel
  ) => {
    console.log(viewModel);
  };

  /**
   * Creates an instance of ApplicantViewModel.
   */
  constructor() {}

  /**
   * Placeholder method for creating an account. Currently under development.
   */
  public async createAccount(
    firstName: string,
    lastName: string,
    email: string,
    personNumber: string,
    username: string,
    password: string
  ): Promise<boolean> {
    if (
      !(firstName && lastName && email && personNumber && username && password)
    )
      return false;

    let databaseBody: RegisterResponseBody = {
      message: "",
      createdUser: {
        person_id: "",
        name: "",
        surname: "",
        pnr: "",
        email: "",
        username: "",
        role_id: 0,
      },
    };

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        body: JSON.stringify({
          name: firstName,
          surname: lastName,
          pnr: personNumber,
          email: email,
          username: username,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error("Network response failure.");
      }

      const data = await response.json();
      if (data?.message) {
        databaseBody = data;
        this.log(databaseBody);
        return true;
      } else return false;
    } catch (error) {
      console.error("Register request failed:", error);
      return false;
    }
  }

  /**
   * Attempts to log in the user with the provided email and password.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the login was successful.
   */

  public async login(email: string, password: string): Promise<boolean> {
    let databaseBody: LoginResponseBody = {
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
        throw new Error("Network response failure.");
      }

      const data = await response.json();
      if (data?.message) {
        databaseBody = data;
        this.log(databaseBody);
        this.setUserBody(databaseBody.foundUser);
        this.changeAuthState(true);
      } else {
        this.changeAuthState(false);
      }
      return this.signedIn;
    } catch (error) {
      console.error("Login request failed:", error);
      return false;
    }
  }

  public logout() {
    this.changeAuthState(false);
  }

  public async listAllApplications(): Promise<
    {
      application_id: number;
      fullName: string;
      status: string;
      applicationDate: Date;
      fromDate: Date;
      toDate: Date;
    }[]
  > {
    let databaseBody: ApplicationsResponseBody = {
      message: "",
      applications: [
        {
          application_id: 0,
          fullName: "",
          status: "",
          applicationDate: new Date(),
          fromDate: new Date(),
          toDate: new Date(),
        },
      ],
    };

    try {
      const response = await fetch("http://localhost:3000/applications", {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error("Network response failure.");
      }

      const data = await response.json();
      if (data?.message) {
        databaseBody = data;
        this.log(databaseBody);
        return databaseBody.applications;
      } else return databaseBody.applications;
    } catch (error) {
      console.error("Applications request failed:", error);
      return databaseBody.applications;
    }
  }

  /**Setters */

  public setFirstName(firstName: string) {
    this.firstName = firstName;
    this.changeState(this);
  }

  public setLastName(lastName: string) {
    this.lastName = lastName;
    this.changeState(this);
  }

  public setPersonNumber(personNumber: string) {
    this.personNumber = personNumber;
    this.changeState(this);
  }

  /**
   * Sets the email address.
   * @param {string} email - The email to set.
   */
  public setEmail(email: string) {
    this.email = email;
    this.changeState(this);
  }

  public setUsername(username: string) {
    this.username = username;
    this.changeState(this);
  }

  public setCompetences(
    competences: { yearsOfExperience: number; name: string }[]
  ) {
    this.competences = competences;
    this.changeState(this);
  }

  public setRole(role: number) {
    this.role = role;
    this.changeState(this);
  }

  public setChangeAuthState(changeAuthState: (state: boolean) => void) {
    this.changeAuthState = (state: boolean) => {
      changeAuthState(state);
      this.signedIn = state;
    };
  }

  public setChangeState(changeState: (viewModel: ApplicantViewModel) => void) {
    this.changeState = (viewModel: ApplicantViewModel) =>
      changeState(viewModel);
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

  public getRole(): number {
    return this.role;
  }

  private setUserBody(user: UserBody) {
    this.setFirstName(user.name);
    this.setLastName(user.surname);
    this.setPersonNumber(user.pnr);
    this.setEmail(user.email);
    this.setUsername(user.username);
    this.setRole(user.role_id);
  }

  private log(obj: Object) {
    console.log(obj);
  }
}

/*
public testingCreateAccount(
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

public testingLogin(email: string, password: string): boolean {
  if (email === "nina@email.se" && password === "password") return true;
  else return false;
}
*/
