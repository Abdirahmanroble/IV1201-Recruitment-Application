export interface LoginResponseBody {
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

export interface UserBody {
  name: string;
  surname: string;
  pnr: string;
  email: string;
  username: string;
  role_id: number;
}

export interface RegisterResponseBody {
  message: string;
  createdUser: {
    person_id: string;
    name: string;
    surname: string;
    pnr: string;
    email: string;
    username: string;
    role_id: number;
  };
}

export interface ApplicationsResponseBody {
  message: string;
  applications: {
    application_id: number;
    fullName: string;
    status: string;
    applicationDate: Date;
    fromDate: Date;
    toDate: Date;
  }[];
}
