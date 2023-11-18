import { Component,HostListener } from '@angular/core';
import { AuthService } from './service/auth.service';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth: AuthService, private dataService: DataService){}
  title = 'OTT';
  navbg:any;
  @HostListener('document:scroll') scrollover(){
    console.log(document.body.scrollTop,'scrolllength#');
    
    if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0)
    {
      this.navbg = {
        'background-color':'#000000'
      }
    }else
    {
        this.navbg = {}
    }
  }

  logout(){
    this.dataService.email = ''
    this.auth.isLoggedIn = false
    this.auth.logout();
  }
}
