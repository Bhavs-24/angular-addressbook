export class Contact {
    id: number;
    name: string;
    email: string;
    telephone: string;
    landline: string;
    webaddress: string;
    address: string;
  
    constructor(args: ContactArgs) {
      this.id = args.id;
      this.name = args.name;
      this.email = args.email;
      this.telephone = args.telephone;
      this.landline = args.landline;
      this.webaddress = args.webaddress;
      this.address = args.address; 
    }
  }
  
  interface ContactArgs {
    id: number;
    name: string;
    email: string;
    telephone: string;
    landline: string;
    webaddress: string;
    address: string;
  }