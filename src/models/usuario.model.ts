import { environment } from 'src/environments/environment';

const api_url = environment.base_url;
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

  get imagenURL() {
    //  localhost:3010/api/uploads/usuarios/65087dc5-2012-42d2-aeff-1094bc651e68.png

    if (this.img?.includes('https:')) {
      return this.img;
    } else {
      if (this.img) {
        return `${api_url}/uploads/usuarios/${this.img}`;
      } else {
        return `${api_url}/uploads/usuarios/no_image`;
      }
    }
  }
}
