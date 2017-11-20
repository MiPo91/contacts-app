export class User {
  account: string;
  password: string;
  name: string;

  constructor(account: string, password: string, name: string) {
    this.account = account;
    this.password = password;
    this.name = name;
  }

}
