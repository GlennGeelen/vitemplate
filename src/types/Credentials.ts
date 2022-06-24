export class Credentials {
  email: string
  password: string

  constructor(credentials: any) {
    this.email = credentials.email
    this.password = credentials.password
  }
}