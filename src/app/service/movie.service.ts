import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class MovieService {
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMovies (): Observable<any> {
    return this.http.get(this.baseUrl+'movies/', this.getTokenHeader());
  }

  private getTokenHeader(){
    const token = localStorage.getItem('token');
    const httpHeaders = new HttpHeaders(
      {'Content-Type' : 'application/json; charset=utf-8',
      'Authorization' : 'Token ' + token});
    return {headers: httpHeaders };
  }

}
