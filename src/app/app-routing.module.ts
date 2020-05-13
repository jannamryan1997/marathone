import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "" },
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
