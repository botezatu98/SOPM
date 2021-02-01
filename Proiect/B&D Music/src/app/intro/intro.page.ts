import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-intro",
  templateUrl: "./intro.page.html",
  styleUrls: ["./intro.page.scss"]
})
export class IntroPage {
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    centeredSlides: true,
    speed: 400
  };
  slides = [
    {
      imageSrc: "assets/img/user.jpg",
      imageAlt: "B&D Music App",
      title: "Ascultă-ți muzica",
      subTitle: "ORIUNDE",
      description: `Cele mai bune albume, cele mai bune melodii. Ascultați și împărtășiți
      oricând, la toate orele.`,
      icon: "play"
    }
  
  
  ];
  constructor(private storage: Storage, private router: Router) {}

  async finish() {
    await this.storage.set("introCompleted", true);
    this.router.navigateByUrl("/");
  }
}
