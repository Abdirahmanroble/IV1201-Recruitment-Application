/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/prefer-readonly */
class Person {
  private name: string;
  private surname: string;
  private personnumber: string; // Assuming personnumber is a string, adjust the type as necessary
  private email: string;
  private password: string;
  private username: string;

  // eslint-disable-next-line @typescript-eslint/space-before-function-paren
  constructor(
    name: string,
    surname: string,
    personnumber: string,
    email: string,
    password: string,
    username: string
  ) {
    this.name = name;
    this.surname = surname;
    this.personnumber = personnumber;
    this.email = email;
    this.password = password;
    this.username = username;
  }
}
