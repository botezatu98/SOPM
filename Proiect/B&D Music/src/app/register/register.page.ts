import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { AuthenticateService } from "../services/authenticate.service";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage {
  validations_form: FormGroup;
  errorMessage: string = "";
  successMessage: string = "";

  validation_messages = {
    email: [
      { type: "required", message: "Email-ul este obligatoriu" },
      { type: "pattern", message: "Introduceți un email valid." }
    ],
    password: [
      { type: "required", message: "Parola este obligatorie." },
      {
        type: "minlength",
        message: "Parola trebuie să aibă cel puțin 5 caractere."
      }
    ],
    firstname: [
      { type: "required", message: "Numele de familie este obligatoriu." },
      {
        type: "minlength",
        message: "Numele de familie trebuie să aibă cel puțin trei litere."
      }
    ],
    lastname: [
      { type: "required", message: "Prenumele este obligatoriu." },
      {
        type: "minlength",
        message: "Prenumele trebuie să aibă cel puțin trei litere."
      }
    ]
  };

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder
  ) {
    this.validations_form = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ),
      password: new FormControl(
        "",
        Validators.compose([Validators.minLength(5), Validators.required])
      ),
      firstname: new FormControl(
        "",
        Validators.compose([Validators.minLength(3), Validators.required])
      ),
      lastname: new FormControl(
        "",
        Validators.compose([Validators.minLength(3), Validators.required])
      )
    });
  }

  tryRegister(value) {
    this.authService
      .registerUser(value)
      .then(a => {
        console.log(a);
        this.errorMessage = "";
        this.successMessage = "Contul dvs. a fost creat cu succes.";
        setTimeout(() => {
          this.navCtrl.navigateForward("/login");
        }, 1000);
      })
      .catch(error => {
        this.errorMessage = error;
        this.successMessage = "";
      });
  }

  goToLoginPage() {
    this.navCtrl.navigateBack("/login");
  }
}
