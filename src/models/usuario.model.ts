export class Usuario {
  constructor(
      public role: string,
      public email: string,
    public google?: boolean,
    public nombre?: string,
    public password?: string,
    public img?: string,
    public uid?: string
  ) {}
}
