import {
  ApplicationsPromiseBody,
  ApplicationsResponseBody,
  CreateAccountParams,
  LoginParams,
  LoginResponseBody,
  RegisterResponseBody,
  UserBody,
} from "../@types/ViewModel";

import { VM } from "./VMInterface";

export default class ViewModel implements VM {
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
  public changeState: (viewModel: ViewModel) => void = (
    viewModel: ViewModel
  ) => {
    console.log(viewModel);
  };

  public async login(params: LoginParams): Promise<boolean> {
    let databaseBody: LoginResponseBody = new LoginResponseBody();

    try {
      const data = await this.fetchData("http://localhost:3000/login", "POST", {
        username: params.email,
        password: params.password,
      });

      if (data?.message) {
        databaseBody = data;
        this.setUserBody(databaseBody.foundUser);
        this.changeAuthState(true);
      } else this.changeAuthState(false);

      console.log(databaseBody); /**Remove later */

      return this.signedIn;
    } catch (error) {
      console.error("Login request failed:", error);
      return false;
    }
  }

  public async createAccount(params: CreateAccountParams): Promise<boolean> {
    let databaseBody: RegisterResponseBody = new RegisterResponseBody();

    try {
      const data = await this.fetchData(
        "http://localhost:3000/register",
        "POST",
        {
          name: params.firstName,
          surname: params.lastName,
          pnr: params.personNumber,
          email: params.email,
          username: params.username,
          password: params.password,
        }
      );

      if (data?.message) {
        databaseBody = data;

        console.log(databaseBody); /**Remove later */

        return true;
      } else return false;
    } catch (error) {
      console.error("Register request failed:", error);
      return false;
    }
  }

  public async listAllApplications(): Promise<ApplicationsPromiseBody> {
    let databaseBody: ApplicationsResponseBody = new ApplicationsResponseBody();

    try {
      const data = await this.fetchData(
        "http://localhost:3000/applications",
        "GET",
        {}
      );

      if (data?.message) databaseBody = data;

      console.log(databaseBody); /**Remove later */

      return { applications: databaseBody.applications };
    } catch (error) {
      console.error("Applications request failed:", error);
      return { applications: databaseBody.applications };
    }
  }

  /**
   * Attempts to log out the current user by making a POST request to the backend logout endpoint,
   * which is expected to clear the authentication cookie.
   * If the request is successful, it updates the `signedIn` state to false, indicating that the user
   * is no longer authenticated. It handles any errors by logging them and returning false, indicating
   * the logout attempt was unsuccessful.
   *
   * @returns {Promise<boolean>} A promise that resolves to `true` if the logout was successful, or `false` if
   *                             the logout failed due to either a non-OK response from the server or a network error.
   */
  public async logout(): Promise<boolean> {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include", // Necessary to include the cookie in the request.
      });

      if (!response.ok) {
        // If the response is not OK, log the error and return false to indicate failure.
        console.error("Logout failed with status:", response.status);
        return false;
      }

      // Only set signedIn to false if the logout was successful.
      this.changeAuthState(false);
      this.signedIn = false;
      return true;
    } catch (error) {
      console.error("Logout request failed:", error);
      return false;
    }
  }

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

  public setChangeState(changeState: (viewModel: ViewModel) => void) {
    this.changeState = (viewModel: ViewModel) => changeState(viewModel);
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getPersonNumber(): string {
    return this.personNumber;
  }

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

  private fetchData = async (path: string, method: string, body: Object) => {
    const fetchBody: RequestInit =
      method === "POST"
        ? {
            method: method,
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            credentials: "include",
          }
        : {
            method: method,
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            credentials: "include",
          };

    const response = await fetch(path, fetchBody);

    if (!response.ok) throw new Error("Network response failure.");

    return await response.json();
  };

  private setUserBody(user: UserBody) {
    this.setFirstName(user.name);
    this.setLastName(user.surname);
    this.setPersonNumber(user.pnr);
    this.setEmail(user.email);
    this.setUsername(user.username);
    this.setRole(user.role_id);
  }
}