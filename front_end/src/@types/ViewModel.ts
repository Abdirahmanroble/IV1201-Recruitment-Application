export class ApplicationsResponseBody {
  public message: string;
  public applications: {
    application_id: number;
    fullName: string;
    status: string;
    applicationDate: Date;
    fromDate: Date;
    toDate: Date;
  }[];

  constructor() {
    (this.message = ""),
      (this.applications = [
        {
          application_id: 0,
          fullName: "",
          status: "",
          applicationDate: new Date(),
          fromDate: new Date(),
          toDate: new Date(),
        },
      ]);
  }
}

export interface ApplicationsPromiseBody {
  applications: {
    application_id: number;
    fullName: string;
    status: string;
    applicationDate: Date;
    fromDate: Date;
    toDate: Date;
  }[];
}

export interface CreateAccountParams {
  firstName: string;
  lastName: string;
  email: string;
  personNumber: string;
  username: string;
  password: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface EmailParams {
  email: string;
}

export interface UserBody {
  name: string;
  surname: string;
  pnr: string;
  email: string;
  username: string;
  role_id: number;
}
