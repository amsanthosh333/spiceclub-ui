import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user'; 
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestService } from 'src/app/services/request.service';
import {Location} from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-recipedetails',
  templateUrl: './recipedetails.component.html',
  styleUrls: ['./recipedetails.component.css'],
  providers: [NgbRatingConfig,ToastrService],
})
export class RecipedetailsComponent implements OnInit {
  p: number = 1;
  Sort = [
    { id: 'price_low_to_high', value: 'price_low_to_high' },
    { id: 'price_high_to_low', value: 'price_high_to_low' },
    { id: 'new_arrival', value: 'new_arrival' },
    { id: 'popularity', value: 'popularity' },
    { id: 'top_rated', value: 'top_rated' },
  ];
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  prodid:any
   _values1 = [" 1 ", "2", " 3 "," 4 "," 5 "," 6 "];
   _values2 = [" 1 ", "2", " 3 "," 4 "," 5 "];
  product_id: any;
  currentPrice: number | undefined;
  currentdetail: User;
  userid: any;
  accesstoken: any;
  tokentype: any;
  Allcat: any;
  Blogcat: any;
  rec_id: any;
  Peoduct: any;
  Comments: any;
  comment!: FormGroup;
  Blogs: any;
  blog_id: any;
  pagenation: any;
  pagess: any;
  page1: boolean=true;
  page2: boolean=false;
  currentRate:any;
  commtotal: any;
  blogdate: any;
  currentRatess: any;
  searchall!: FormGroup;
  searchbyblog!: FormGroup;
  error1: any;
  photoss: any;
  nutritional: any;
  Tags: any;
  recipeloader: boolean=true;
  prodcount=[1,2,3,4,5,6];
  sideloader1: boolean=true;
  photoloader1: boolean=true;
  sideloader2: boolean=true;
  discrloading: boolean=true;
  discriptloader: boolean=true;
  imgloader: boolean=false;
  id: any;
  constructor(private router: Router, private formBuilder: FormBuilder,private fb: FormBuilder,
   private route: ActivatedRoute, private request: RequestService,private modalService: NgbModal,private toastr: ToastrService,config: NgbRatingConfig,private _location: Location) {
     
      config.max = 5;
      config.readonly = true;
      
      this.currentUserSubject = new BehaviorSubject<User>(
        JSON.parse(localStorage.getItem('currentUser')||'{}')
        
      );
      console.log("currentuser details=", this.currentUserSubject);
      this.currentUser = this.currentUserSubject.asObservable();
       this.currentdetail = this.currentUserSubject.value;
       this.userid=this.currentdetail.user?.id; 
       this.accesstoken=this.currentdetail.access_token;
       this.tokentype=this.currentdetail.token_type;

     
     }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log("brand id",this.id);
    this.getrecipedetaill(this.id)
    this.getallrecipe(1);
    this.getallrecipecat();
  }
  getallrecipe(page:any){
    this.recipeloader=true;
    this.imgloader = false;
  this.request.getallrecipe(page).subscribe((res:any)=>{
    this.Blogs=res.data;
    this.pagenation=res.meta   
    this.pagess=this.pagenation.links
    this.recipeloader=false;
    console.log("allrecipe",this.Blogs);
    setTimeout(() => {
      this.imgloader = true;
    }, 2000);
  }, (error: any) => {
    console.log("error",error);
  });
}
getallrecipecat(){
  this.sideloader1=true;
  
  this.request.getallrecipecat().subscribe((response: any) => {
    this.Allcat=response.data;
    this.sideloader1=false;
    console.log("getallrecipecat",this.Allcat);
  },
  (error: any) => {
    console.log("error",error);
  });
}
getrecipebycatg(id:any){
  window.scroll(0,0);
  this.router.navigate(['recipe', id]);
  console.log("rec",id);
  console.log("navigate to recipe");
}
  getrecipedetaill(id:any){
    this.page1=false;
   window.scroll(0,0);
   this.page2=true;
   this.sideloader2=true;
   this.photoloader1=true;
   this.discrloading=true;
   this.discriptloader=true;
   this.blog_id=id;
   this.request.getrecipedetail(id).subscribe((response: any) => {
     this.Peoduct=response.data[0];
     this.photoss=this.Peoduct.photos;
     this.nutritional=this.Peoduct.nutritional_fact;
     this.Tags=this.Peoduct.tags;
     this.currentRatess=this.Peoduct.rating;
      
     console.log("photoss",this.photoss);
     console.log("nutritional",this.nutritional);
     // this.blogdate=this.Peoduct.created_at.split(/[T ]/i, 1)[0];
     // this.currentRatess=this.Peoduct.rating;
     console.log("recipecategorydetail",this.Peoduct);
     this.sideloader2=false;
    
     this.discrloading=false;
     this.discriptloader=false;
     setTimeout(() => {
       this.photoloader1=false;
     }, 3000);
   },
   (error: any) => {
     console.log("error",error);
   });
   this.getcommentsss();
 }
 
 getcommentsss(){
   this.request.getcomments(this.blog_id).subscribe((response: any) => {
     this.Comments=response.data;
     this.commtotal=this.Comments.length
     console.log("Comments",this.Comments);  
   },
   (error: any) => {
     console.log("error",error);
   });
 }
 addcomment(form: FormGroup){
   this.error1 = '';
   if (this.comment.invalid) {
 
     if(!this.comment.get('rating')?.valid){
       this.error1 = '*give star';
     }
     else if ( !this.comment.get('comment')?.valid) {
       this.error1 = '*type some comment';
     }
     console.log(this.error1)  
     return;
   }
   else{
     if ((this.comment.get('rating'))?.value!=Number){
       form.value.rating=0
       let edata2={
         recipe_id: this.blog_id,
         user_id: this.userid,
         rating:form.value.rating,
         comment:form.value.comment,
       }
       console.log(edata2); 
   this.request.addrecipecomment(edata2).subscribe((res: any) => {
     console.log(res);
     if (res.message == 'Comment  Submitted') {  
       this.toastr.success('Comment  Submitted', '');
       this.getcommentsss();
     }
     else  {
       this.toastr.error(res.message);
       console.log("error",res);
 
     }
   }, (error: any) => {
     console.log("error",error);
   
   }); }
 }
 }
 backk(){
  this._location.back();
  // this._location.back();
 
  }
 addRecordSuccess() {
  this.toastr.success('Added Successfully', '');
}
editRecordSuccess() {
  this.toastr.success('Edit Record Successfully', '');
}
deleteRecordSuccess() {
  this.toastr.error(' Removed Successfully', '');
}
}