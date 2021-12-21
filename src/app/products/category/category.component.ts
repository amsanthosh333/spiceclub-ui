import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user'; 

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  // currentUserSubject: BehaviorSubject<User>;
  // currentUser: Observable<User>;
  prodid:any
   _values1 = [" 1 ", "2", " 3 "," 4 "," 5 "," 6 "];
  product_id: any;
  currentPrice: number | undefined;
  // currentdetail: User;
  userid: any;
  accesstoken: any;
  tokentype: any;
  Allcat: any;
  loadingIndicator: boolean | undefined;
  catprod: any;
  subprod: any; 
  page2: boolean=false;
  page1: boolean=true;
  page3: boolean=false;
  quantityy: any;
  openproduct: any;
  Peoduct: any;
  page4: boolean=false;
  stocck: any;
  varprise: any;
  varient_value: any;
  choice: any;
  Alloddcat: any;
  Allevencat: any;
  
  constructor(private router: Router,private fb: FormBuilder,private request: RequestService,) { 
      
    // this.currentUserSubject = new BehaviorSubject<User>(
    //   JSON.parse(localStorage.getItem('currentUser')||'{}')
      
    // );
    // console.log("currentuser details=", this.currentUserSubject);
    // this.currentUser = this.currentUserSubject.asObservable();
    //  this.currentdetail = this.currentUserSubject.value;
    //  this.userid=this.currentdetail.user.id; 
    //  this.accesstoken=this.currentdetail.access_token;
    //  this.tokentype=this.currentdetail.token_type;
     ////
    //  console.log("currentuser=", this.currentUser);
    //  console.log("currentusezr=",  this.currentdetail.access_token);
 
  }



  ngOnInit(): void {
    this.viewdata();
    // console.log("currentuser=", this.quantityy);
  }

  
viewdata(){
  this.request.getallcat().subscribe((response: any) => {
    this.Allcat=response.data;
//     var Arr1 = this.Allcat,
//     Arr2 = [],
//     Arr3 = [];

// for (var i=0;i<Arr1.length;i++){
//     if ((i+2)%2==0) {
//         Arr3.push(Arr1[i]);
//         console.log("odd",Arr3);
//         this.Alloddcat=Arr3
//     }
//     else {
//         Arr2.push(Arr1[i]);
//         this.Allevencat=Arr2
//         console.log("even",Arr2);
//     }
// }

// console.log(Arr2);
    // this.page1=true,
    // this.page2=false,
    console.log("response",response);
    console.log("allcategory",this.Allcat);
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 500);
  });
}
catnavigate(){
   this.router.navigate(['/category']);
 
  
}

}
