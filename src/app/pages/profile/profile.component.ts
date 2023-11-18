import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  constructor(private dataService: DataService, private http: HttpClient, private title: Title) {
    this.title.setTitle("Profile")
  }

  savedGenres: number[] = []; // Array to store the user's saved genres
  email = this.dataService.email
  genres = this.dataService.genres

  ngOnInit() {
    this.fetchSavedGenres();
  }

  updateSelectedGenres(genreId: number) {
    const index = this.savedGenres.indexOf(genreId);
    if (index > -1) {
      this.savedGenres.splice(index, 1);
    } else {
      this.savedGenres.push(genreId);
    }
    this.saveGenresToLocalStorage();
  }

  fetchSavedGenres() {
    const savedGenres = localStorage.getItem('savedGenres');
    this.savedGenres = savedGenres ? JSON.parse(savedGenres) : [];
  }

  saveSelectedGenres() {
    // Save the selected genres
    this.saveGenresToLocalStorage();
    // Additional logic to send the savedGenres to your backend (Firebase, API, etc.)
  }

  saveGenresToLocalStorage() {
    localStorage.setItem('savedGenres', JSON.stringify(this.savedGenres));
    this.dataService.savedPreference = this.savedGenres
  }

}
