import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { SearchComponent } from './pages/search/search.component';
import { MovieTrailerComponent } from './pages/movie-trailer/movie-trailer.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'home',component:HomeComponent, canActivate: [AuthGuard]},
  {path:'search',component:SearchComponent, canActivate: [AuthGuard]},
  {path:'movie/:id',component:MovieDetailsComponent, canActivate: [AuthGuard]},
  { path: 'movie-trailer/:key', component: MovieTrailerComponent},
  { path: 'profile', component: ProfileComponent , canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
