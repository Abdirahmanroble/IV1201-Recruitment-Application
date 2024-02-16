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
