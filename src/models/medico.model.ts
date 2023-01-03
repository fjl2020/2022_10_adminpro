import { Hospital } from "./hospital.model";
import { Usuario } from "./usuario.model";



interface _MedicoUser{
  _id:string;
  nombre:string;
  img:string;
}
interface _MedicoHospital{
  _id:string;
  nombre:string;
  img:string;
}
export class Medico{
  // public nombre:string= "";
  // public _id?:string='';
  // public usuario?: Usuario;
  // public hospital?:Hospital;
  // public img?:string;
  constructor(
      public nombre:string= "",
      public _id?:string,
      public img?:string,
      public usuario?: _MedicoUser,
      public hospital?:_MedicoHospital,
  ){

  }
}
