import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from '@angular/fire/auth'
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false

  constructor(private fireauth: AngularFireAuth, private router: Router, private dataService: DataService) { }

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('token', 'true');

      // if (res.user?.emailVerified == true) {
      console.log('done')
      this.isLoggedIn = true
      this.router.navigate(['/home']);
      // } else {
      //   this.router.navigate(['/login']);
      // }

    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(res => {
      alert('Registration Successful');

      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  // sign out
  logout() {
    this.fireauth.signOut().then(() => {
      console.log("Logging out UWU")
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {
      console.log(res)
      this.router.navigate(['/home']);
      this.isLoggedIn = true
      localStorage.setItem('token', JSON.stringify(res.user?.uid));
      if(res.user?.email){
        this.dataService.email = res.user?.email
      }
      
    }, err => {
      alert(err.message);
    })
  }




}
