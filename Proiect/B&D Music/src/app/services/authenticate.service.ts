import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root"
})
export class AuthenticateService {
  constructor(private storage: Storage) {}

  loginUser(credentials) {
    const key = credentials.email;
    const encryptedPass = credentials.password;
    return new Promise((accept, reject) => {
      this.storage.get(key).then(usuario => {
        if (usuario) {
          if (usuario.password == btoa(encryptedPass)) {
            accept(usuario);
          } else {
            reject("Parola incorecta");
          }
        } else {
          reject("Nu există utilizator cu acest e-mail");
        }
      });
    });
  }

  registerUser(value) {
    return new Promise((accept, reject) => {
      this.storage.get(value.email).then(usuario => {
        if (usuario) {
          console.log(usuario);
          reject("Utilizatorul deja există");
        } else {
          value.password = btoa(value.password);
          this.storage.set(value.email, value).then(() => {
            accept("Utilizatorul a fost creat cu succes");
          });
        }
      });
    });
  }
}
