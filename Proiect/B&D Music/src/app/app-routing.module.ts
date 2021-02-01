import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { LoginGuard } from "./guards/login.guard";
import { IntroGuard } from "./guards/intro.guard";
const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "intro", loadChildren: "./intro/intro.module#IntroPageModule" },
  {
    path: "login",
    loadChildren: "./login/login.module#LoginPageModule",
    canActivate: [IntroGuard]
  },
  {
    path: "register",
    loadChildren: "./register/register.module#RegisterPageModule",
  },
  {
    path: "menu",
    loadChildren: "./menu/menu.module#MenuPageModule",
    
    canActivate: [LoginGuard, IntroGuard]
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
