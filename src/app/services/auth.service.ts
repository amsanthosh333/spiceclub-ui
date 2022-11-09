import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { DatePipe } from '@angular/common'

function _window() : any {
  return window;
}

@Injectable({
  providedIn: 'root'
  
})
export class AuthService {
  currentdetail: User;
  userid: any;
  accesstoken: any;

  tokentype: any;
  expires_at: any;
  date: Date | undefined;
  latest_date!:any;
  
  encryptdata(request: string) {
    throw new Error('Method not implemented.');
  }

  get nativeWindow() : any {
    return _window();
 }

  url: string | undefined;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
 
  private endPoint1 = "https://neophroncrm.com/spiceclubnew/api/v2"
 

  constructor(private http: HttpClient,private datepipe: DatePipe) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')||'{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentdetail = this.currentUserSubject.value;
    this.userid = this.currentdetail?.user?.id;
   this.accesstoken = this.currentdetail.access_token;
   this.tokentype = this.currentdetail.token_type;
   }

  public get currentUserValue(): User {
    return this.currentdetail
  }


  login(email: string, password: string) { 
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest')
     this.url = `${this.endPoint1}/auth/login`;
     return this.http.post<any>(this.url,{ email, password},{headers:headers}).pipe( 
       
        map((user) => { 
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          // console.log("currentuser:",user);
          return user;
        })
      );
  }
  isLoggedIn() {
    JSON.parse(localStorage.getItem('currentUser')||'{}')
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentdetail = this.currentUserSubject.value;
    this.userid = this.currentdetail?.user?.id;
   this.accesstoken = this.currentdetail.access_token;
   this.expires_at=this.currentdetail.expires_at;

     this.date=new Date();
     this.latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd h:MM:ss');
     return this.expires_at > this.latest_date // check if token is expired

  }

  otplogin(body:any) { 
     this.url = `${this.endPoint1}/auth/lgoinverifyotp`;
     return this.http.post<any>(this.url,body).pipe(      
        map((user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }
  reqotplogin(body: any) { 
    this.url = `${this.endPoint1}/auth/loginwithotp`;
    return this.http.post<any>(this.url, body)
  }

  logout() { 
    this.url = `${this.endPoint1}/auth/logout`;
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
    
    localStorage.removeItem('currentUser');
   
    this.currentUserSubject.next(null!);
    return this.http.get(this.url,{headers:headers})
  }
   adduser(body: any) {
    this.url = `${this.endPoint1}/auth/signup`;
    return this.http.post(this.url, body);
  }
  
  Quickregister(body: any) {
    this.url = `${this.endPoint1}/auth/quickregister`;
    return this.http.post(this.url, body);
  }
  registerotpverification(body: any) {  
    this.url = `${this.endPoint1}/auth/confirm_code`;
    return this.http.post<any>(this.url, body)
    .pipe(    
      map((user) => { 
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);   
        return user;
      })
    );
  }
  resendotp(body: any) { 
    this.url = `${this.endPoint1}/auth/resend_code`;
    return this.http.post<any>(this.url, body)
      
  }
  //forgot password
  conformforgot(body: any) { 
    this.url = `${this.endPoint1}/auth/password/forget_request`;
    return this.http.post<any>(this.url, body)
    
      
  }
  resetpassword(body: any) { 
    this.url = `${this.endPoint1}/auth/password/confirm_reset`;
    return this.http.post<any>(this.url, body)
      
  }
  resendforgot(body: any) { 
    this.url = `${this.endPoint1}/auth/password/resend_code`;
    return this.http.post<any>(this.url, body)
      
  }
  sociallogin3(body: any) { 
    this.url = `${this.endPoint1}/auth/social-login`;
    return this.http.post<any>(this.url, body).pipe(     
      map((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        // console.log("currentuser:",user);
        return user;
      })
    );  
  }
  sociallogin(body: any) { 
    this.url = `${this.endPoint1}/auth/social-login-count`;
    return this.http.post<any>(this.url, body)
    // return this.http.post<any>(this.url, body).pipe(     
    //   map((user) => {
    //     localStorage.setItem('currentUser', JSON.stringify(user));
    //     this.currentUserSubject.next(user);
    //     // console.log("currentuser:",user);
    //     return user;
    //   })
    // );
      
  }

}
