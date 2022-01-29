import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipedetailsComponent } from './recipedetails.component';

const routes: Routes = [{ path: '', component: RecipedetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipedetailsRoutingModule { }
