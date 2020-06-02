import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "" },
  // {
  //   path: "auth",
  //   loadChildren: () => import('./com/annaniks/marathon/pages/auth/auth.module').then(m => m.AuthModule),
  // },
  {
    path: "",
    loadChildren: () => import('./com/annaniks/marathon/pages/main/main.module').then(m => m.MainModule),
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
