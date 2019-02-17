import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Subscription } from 'rxjs';
import { GlobalService } from '../service/global.service';
import { Router } from '@angular/router';
import { MovieService } from '../service/movie.service';
import { Movie } from '../models/movies';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {

  account: User = new User();
  userSub: Subscription;
  movies;
  selectedMovie: Movie;
  movieInput: FormGroup;
  isAddeditMode: Boolean;

  constructor( private fb: FormBuilder,private movieService: MovieService, private global: GlobalService, private router: Router) { }

  ngOnInit() {
    this.isAddeditMode = false;
    this.userSub = this.global.user.subscribe(
      me => { this.account = me }
    );
    if (localStorage.getItem('token') && localStorage.getItem('account')) {
      this.global.me = JSON.parse(localStorage.getItem('account'))
      this.getMovies();
    } else {
      this.router.navigate(['/login']);
    }
    this.movieInput = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
addMovieClicked() {
 this.selectedMovie = null;
 this.isAddeditMode =true;
}
submitMovie(){
  this.movieService.addMovie(this.movieInput.value).subscribe(
    response => {
      this.movies.push(response);
      console.log('movies', response);
      this.isAddeditMode = false;
      this.movieInput.reset;
    },
    error => {
      console.log('error', error);
    }
  );
}
  getMovies() {
    this.movieService.getMovies().subscribe(
      response => {
        this.movies = response
        console.log('movies', response);
      },
      error => {
        console.log('error', error);
      }
    );
  }
  movieClicked(movie: Movie) {
    this.selectedMovie = movie;

    console.log('movie Cliked', movie);
  }
  logoutClicked() {
    this.global.me =new User();
    localStorage.removeItem('token');
    localStorage.removeItem('account');
    this.router.navigate(['/login']);
  }
}

