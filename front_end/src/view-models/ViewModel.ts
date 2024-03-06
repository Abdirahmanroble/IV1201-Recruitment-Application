/* eslint-disable @typescript-eslint/ban-types */
import {
  ApplicationsPromiseBody,
  ApplicationsResponseBody,
  CreateAccountParams,
  EmailParams,
  LoginParams,
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
  private currentError: number = 0;

  public changeAuthState: (state: boolean) => void = (state: boolean) => {
    console.log(state);
  };
  public changeState: (viewModel: ViewModel) => void = (
    viewModel: ViewModel
  ) => {
    console.log(viewModel);
  };

  public async login(params: LoginParams): Promise<boolean> {
    try {
      const data = await this.fetchData("http://localhost:3000/login", "POST", {
        username: params.email,
        password: params.password,
      });
      console.log(data);
      if (data?.message) {
        if (+data.responseCode === 100) {
          /** invalid credentials */
          this.setCurrentError(100);
          this.changeAuthState(false);
        } else {
          /** valid credentials */
          this.setUserBody(data.foundUser);
          this.changeAuthState(true);
        }
      } else if (data?.error) {
        this.setCurrentError(+data.error.errorCode); /** string to number */
        this.changeAuthState(false);
      } else throw new Error("Unknown error");
      return this.signedIn;
    } catch (error) {
      this.setCurrentError(-1);
      return false;
    }
  }

  public async emailConfirmation(params: EmailParams): Promise<boolean> {
    try {
      const response = await this.fetchData(
        "http://localhost:3000/send-confirmation",
        "POST",
        { email: params.email }
      );
      if (response?.message && response.id) {
        console.log(response);
        return true;
      } else if (response?.message && +response.responseCode === 400) {
        this.setCurrentError(400);
        return false;
      } else throw new Error("Unknown error");
    } catch (error) {
      this.setCurrentError(-1);
      return false;
    }
  }

  public async updatePassword(
    token: string,
    newPassword: string
  ): Promise<boolean> {
    try {
      const response = await this.fetchData(
        "http://localhost:3000/update-user", // Ensure this matches your endpoint
        "POST",
        { token, password: newPassword }
      );

      // Check for the response code from your backend and handle accordingly
      if (response.success) {
        // Handle successful password update (perhaps clear any existing errors)
        this.setCurrentError(0);
        return true;
      } else {
        // If the backend sends an error response with an error code, use it
        this.setCurrentError(+response.error.errorCode);
        return false;
      }
    } catch (error) {
      // Handle any other errors that may occur during the fetch
      this.setCurrentError(-1);
      return false;
    }
  }

  public async createAccount(params: CreateAccountParams): Promise<boolean> {
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
        return true;
      } else if (data?.error) {
        this.setCurrentError(+data.error.errorCode); /** string to number */
        return false;
      } else throw new Error("Unknown error");
    } catch (error) {
      this.setCurrentError(-1);
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

      return { applications: databaseBody.applications };
    } catch (error) {
      return { applications: databaseBody.applications };
    }
  }

  public async logout(): Promise<boolean> {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include", // Necessary to include the cookie in the request.
      });

      if (!response.ok) {
        // If the response is not OK, log the error and return false to indicate failure.
        return false;
      }

      // Only set signedIn to false if the logout was successful.
      this.changeAuthState(false);
      this.signedIn = false;
      return true;
    } catch (error) {
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

  public setCurrentError(currentError: number) {
    this.currentError = currentError;
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

  public getCurrentError(): number {
    return this.currentError;
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
