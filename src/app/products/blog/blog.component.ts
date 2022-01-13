import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user'; 
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestService } from 'src/app/services/request.service';
import {Location} from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-blog', 
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [NgbRatingConfig,ToastrService],
})
export class BlogComponent implements OnInit {
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
  loader: boolean=true;
  loader1: boolean=true;
  prodcount=[1,2,3,4,5,6];
  sideloader2: boolean=true;
  allloader1: boolean=true;
  recipeloader: boolean=true;
  constructor(private router: Router, private formBuilder: FormBuilder,private fb: FormBuilder,
    private request: RequestService,private modalService: NgbModal,
    private toastr: ToastrService,config: NgbRatingConfig,private _location: Location) {
     
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
    this.viewallblog(1);
    this.viewblogcat();
    this.comment = this.fb.group({ 
      rating:['',[ Validators.required]],
      comment: ['',[ Validators.required]],
   
    });
    this.searchall = this.fb.group({ 
      key: [''],
    });
    this.searchbyblog = this.fb.group({ 
      key: [''],
    });
  }
viewallblog(page:any){
  this.loader1=true;

  this.request.getallblog(page).subscribe((res:any)=>{
    this.Blogs=res.data;
    this.loader1=false;
    this.pagenation=res.meta   
    this.pagess=this.pagenation.links
    console.log("allblog",this.Blogs);
  }, (error: any) => {
    console.log("error",error);
  });
}
viewblogcat(){
  this.loader=true;
  this.request.getallblogcat().subscribe((response: any) => {
    this.Allcat=response.data;
    this.loader=false;
    console.log("getallblogcat",this.Allcat);
  },
  (error: any) => {
    console.log("error",error);
  });
}

getblogbycatg(id:any,page=1){
  this.loader1=true;
  this.request.getblogbycat(id,page).subscribe((response: any) => {
    this.Blogs=response.data;
    this.loader1=false;
    this.pagenation=response.meta   
    this.pagess=this.pagenation.links
    console.log("response",response);
    console.log("recipecategory",this.Blogs);
    this.page1=true;
    this.page2=false;
  },
  (error: any) => {
    console.log("error",error);
  });
}
getpage(url:any){
  this.loader1=true;
  this.request.getpage(url).subscribe((response:any)=>{
    this.Blogs=response.data;
    this.loader1=false;
    this.pagenation=response.meta   
    this.pagess=this.pagenation.links
    console.log("response",response);
    console.log("allproduct",this.Blogs);
  })
}
getblogdetail(id:any){
  this.page1=false;
  window.scroll(0,0)
  this.page2=true;
  this.sideloader2=true;
  this.allloader1=true;
  
  this.recipeloader=true;
  this.blog_id=id;
  this.request.getblogdetail(id).subscribe((response: any) => {
    this.Peoduct=response.data[0];
    this.blogdate=this.Peoduct.created_at.split(/[T ]/i, 1)[0];
    this.currentRatess=this.Peoduct.rating;
    console.log("currentRate",this.currentRatess);
    console.log("recipecategorydetail",this.Peoduct);
   
    this.sideloader2=false;
    this.allloader1=false;
    this.recipeloader=false;
  },
  (error: any) => {
    console.log("error",error);
  });
  this.getcommentsss();
}

getcommentsss(){
  this.request.getblogcomments(this.blog_id).subscribe((response: any) => {
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
        blog_id: this.blog_id,
        user_id: this.userid,
        rating:form.value.rating,
        comment:form.value.comment,
      }
      console.log(edata2); 
  this.request.addblogcomment(edata2).subscribe((res: any) => {
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
search1(form:FormGroup){
let edata ={
  key :form.value.key
}
console.log(edata);
this.request.searchblog(edata).subscribe((res:any)=>{
  this.Blogs=res.data;
  this.pagenation=res.meta   
  this.pagess=this.pagenation.links
  console.log("allblog",this.Blogs);
}, (error: any) => {
  console.log("error",error);
});
}

search2(form:FormGroup){
  let edata ={
    key :form.value.key
  }
  console.log(edata);
  this.request.searchbyblog(edata).subscribe((res:any)=>{
    this.Blogs=res.data;
    this.pagenation=res.meta   
    this.pagess=this.pagenation.links
    console.log("allblog",this.Blogs);
  }, (error: any) => {
    console.log("error",error);
  });
  }
  backk(){
    // this._location.back();
    this.page1=true;
    this.page2=false;
    
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
