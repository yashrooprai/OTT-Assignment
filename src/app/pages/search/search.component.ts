import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup} from '@angular/forms';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';
import { Title,Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private service:MovieApiServiceService,private title:Title,private meta:Meta) {
    this.title.setTitle('Search movies - OTT');
    this.meta.updateTag({name:'description',content:'search here movies like avatar,war etc'});
   }

  ngOnInit(): void {
  }

  searchResult:any;
 
  searchForm = new FormGroup({
    'movieName': new FormControl(null),
    'genre': new FormControl(''),
    'actor': new FormControl('')
});

submitForm() {
    const searchData = this.searchForm.value;

    this.service.getSearchMovie(searchData).subscribe((result) => {
        
        this.searchResult = result.results;
    });
}
  

}
