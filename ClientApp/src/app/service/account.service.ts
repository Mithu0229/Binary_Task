import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url=environment.apiUrl;
  
  constructor(private http: HttpClient ) {
    
   }

   register(model: any) : Observable<any>{
    console.log(this.url +'account/Register',model);
    return this.http.post(this.url+'Account/Register',model);
  }
   
  login(model: any) : Observable<any>{
    
    console.log(this.url);
    return this.http.post(this.url+'Account/login',model);
  }

 

}
