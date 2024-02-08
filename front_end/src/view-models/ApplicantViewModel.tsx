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

export default class ApplicantViewModel {
  private model: ApplicantModel;
  private signedIn: boolean;

  constructor(model: ApplicantModel) {
    this.model = model;
    this.signedIn = false;
  }

  public createAccount() {}

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

  public get email(): string {
    return this.model.getEmail();
  }
}
