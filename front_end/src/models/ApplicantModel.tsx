/**
 * The ApplicantModel is a container for data relating to an applicant. The model is a data source
 * and should not contain any logic other than having get/set methods and add/remove methods,
 * which are methods related to changing or updating the data. Furthermore, the model should be
 * observable to make it possible for the the view to automatically re-render when data is changed.
 */

import { makeAutoObservable } from "mobx";

export default class ApplicantModel {
  private firstName: string = "";
  private lastName: string = "";
  private personNumber: string = "";
  private email: string = "";
  private username: string = "";
  private competences: { yearsOfExperience: number; name: string }[] = [];

  constructor() {
    makeAutoObservable(this);
  }

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
