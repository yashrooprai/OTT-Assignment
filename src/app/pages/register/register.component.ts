import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email : string = '';
  password : string = '';

  constructor(private auth : AuthService, private http: HttpClient, private title:Title) { 
    this.title.setTitle("Register")
  }

  ngOnInit(): void {
  }

  register() {

    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }
    const data = {
      email: this.email,
      password: this.password,
      
    };
    this.http.post(environment.db,data).subscribe((response) => console.log(response))
    this.auth.register(this.email,this.password);
    
    this.email = '';
    this.password = '';
    
    

  }


}
