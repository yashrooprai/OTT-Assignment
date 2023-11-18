import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { DataService } from '../../service/data.service';
import { Title} from '@angular/platform-browser';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  constructor(private auth : AuthService, private dataService : DataService,private title:Title) {
    this.title.setTitle('Login');
   }

  ngOnInit(): void {
  }
 

  email : string = '';
  password : string = '';

  login() {

    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }
    this.dataService.email = this.email
    this.auth.login(this.email,this.password);
    
    this.email = '';
    this.password = '';

  }

  signInWithGoogle() {
    this.auth.googleSignIn();
  }

}
