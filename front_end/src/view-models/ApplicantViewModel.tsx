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

  /**The method is used for testing only right now */
  public login(email: string, password: string): boolean {
    let databaseBody: DatabaseBody;

    fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(async (res) => {
        const { data } = await res.json();
        if (data?.message) {
          databaseBody.message = data?.message;
          databaseBody.foundUser = data?.foundUser;
          this.signedIn = true;
          console.log(databaseBody);
        }
      })
      .catch(console.error);

    return this.signedIn;
  }

  public registerApplication() {}

  public get email(): string {
    return this.model.getEmail();
  }
}
