/**
 * The ApplicantViewModel acts as a model for different views and contains logic. The viewmodel is independent
 * and is not affected by who consumes its data but acts as a regular class. The viewmodel has a reference
 * to the model from where it gets its data, the viewmodel can then make computations on the data
 * depending on the needs of the views.
 */

import ApplicantModel from "../models/ApplicantModel";

export default class ApplicantViewModel {
  private model: ApplicantModel;

  constructor(model: ApplicantModel) {
    this.model = model;
  }

  public createAccount() {}

  public login() {}

  public registerApplication() {}
}
