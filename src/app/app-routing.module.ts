import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './com/annaniks/marathon/core/guards/auth.guard';


const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "" },
  {
    path: "",
    canActivate: [AuthGuard],
    loadChildren: () => import('./com/annaniks/marathon/pages/main/main.module').then(m => m.MainModule),
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
