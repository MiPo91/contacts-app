export class User {
  id: number;
  account: string;
  password: string;
  name: string;

  constructor(id: number, account: string, password: string, name: string) {
    this.id = id;
    this.account = account;
    this.password = password;
    this.name = name;
  }

}
