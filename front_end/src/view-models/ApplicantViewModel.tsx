/**
 * The ApplicantViewModel acts as a model for different views and contains logic. The view-model is independent
 * and is not affected by who consumes its data but acts as a regular class. The view-model has a reference
 * to the model from where it gets its data, the view-model can then make computations on the data
 * depending on the needs of the views.
 */

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
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const { data } = await response.json();
      if (data?.message) {
        databaseBody = data;
        this.signedIn = true;
        console.log(databaseBody);
      }
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }

    return this.signedIn;
  }

  public registerApplication() {}

  public get email(): string {
    return this.model.getEmail();
  }
}
