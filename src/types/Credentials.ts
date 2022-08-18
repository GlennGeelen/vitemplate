export class Credentials {
  email: string
  password: string

  constructor(credentials: Credentials) {
    this.email = credentials.email
    this.password = credentials.password
  }
}