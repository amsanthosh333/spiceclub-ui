import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router,ParamMap, Params, NavigationEnd } from '@angular/router';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user'; 
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestService } from 'src/app/services/request.service';
import {Location,PopStateEvent} from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  providers: [NgbRatingConfig,ToastrService],
})
export class RecipeComponent implements OnInit {
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
  keyy: any;
  topItem: any;
 
  currentpage: any;
  pagee: any=1;
  categoryy_id: any;
  constructor(private router: Router, private formBuilder: FormBuilder,private fb: FormBuilder,
    private request: RequestService,private modalService: NgbModal,private route: ActivatedRoute,
    private toastr: ToastrService,config: NgbRatingConfig, private activatedRoute: ActivatedRoute,
    private _location: Location,private location: Location) {
     
      config.max = 5;
      config.readonly = true;
      
      this.currentUserSubject = new BehaviorSubject<User>(
        JSON.parse(localStorage.getItem('currentUser')||'{}')
        
      );
      // console.log("currentuser details=", this.currentUserSubject);
      this.currentUser = this.currentUserSubject.asObservable();
       this.currentdetail = this.currentUserSubject.value;
       this.userid=this.currentdetail.user?.id; 
       this.accesstoken=this.currentdetail.access_token;
       this.tokentype=this.currentdetail.token_type;

     
     }

  ngOnInit(): void {
    window.scroll(0,0);
    // this.rec_id = this.route.snapshot.paramMap.get('id');
    this.getallrecipecat();
    this.activatedRoute.queryParams.subscribe((data2: Params) => {
    this.rec_id = data2['category']
    this.pagee = data2['page']
      console.log("queryParams data", this.rec_id);
      if (this.rec_id ==undefined || this.rec_id ==null ) {
        console.log("rec!undefined",this.rec_id);  
      // this.rec_id='';
      this.getallrecipe(this.pagee);
      // this.getallrecipecat();
      }
      else { 
        console.log("rec!else");  
        this.getrecipebycatg(this.rec_id,this.pagee); 
      // this.getallrecipecat();
      }
    })

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

  getallrecipe(page:any){
    this.recipeloader=true;
    this.imgloader = false;
    this.request.getallrecipe(page).subscribe((res:any)=>{
    this.Blogs=res.data;
    this.pagenation=res.meta   
    this.pagess=this.pagenation.links
    this.recipeloader=false;
    this.topItem=-1
    // this.router.navigate(['recipe'] ,{ queryParams: { page: page} });
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
  },
  (error: any) => {
    console.log("error",error);
  });
}

getrecipebycatg(id:any,page:any){
  this.recipeloader=true;
  this.imgloader = false;
 
  this.request.getrecipebycat(id,page).subscribe((response: any) => {
    this.Blogs=response.data;
    this.pagenation=response.meta   
    this.pagess=this.pagenation.links;
    this.recipeloader=false; 
    this.page1=true;
    this.page2=false;
    // console.log("this.Allcat",this.Allcat);
     let index = this.Allcat?.findIndex((x:any ) => x.id == id );
    this.topItem=index
    // console.log("this.topItemr",this.topItem);
   
    
    this.router.navigate(['/recipe'],{ queryParams:{ category:this.rec_id, page: page} });
    setTimeout(() => {
      this.imgloader = true;
    }, 2000);
  },
  (error: any) => {
    console.log("error",error);
  });
}
getrecipebycatg2(id:any,i:any){
  window.scroll(0,0);
  this.rec_id=id 
  this.topItem=i
  this.router.navigate(['/recipe'],{ queryParams:{ category:this.rec_id, page: 1} });
  // this.getrecipebycatg(id,1)
}
getpage(url:any,label:any){
  if(url!==null){
  this.recipeloader=true;
  this.imgloader = false;
  window.scroll(0,0);
  this.request.getpage(url).subscribe((response:any)=>{
    this.Blogs=response.data;
    this.pagenation=response.meta;
    this.pagess=this.pagenation.links;
    this.currentpage=response.meta.current_page;
    // console.log("this.currentpage",this.currentpage);
    // this.router.navigate(['recipe',this.rec_id,this.currentpage]);
        // this.router.navigate(['recipe'] ,{ queryParams: { page: page} });
    this.router.navigate(['/recipe'],{ queryParams:{ category:this.rec_id, page:this.currentpage} });
    this.recipeloader=false;
 
    setTimeout(() => {
      this.imgloader = true;
    }, 2000);
  })
}
}
getrecipedetaillold(id:any){
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
getrecipedetaill(id:any){
  window.scroll(0,0);
  this.router.navigate(['recipedetails', id]);
}
getcommentsss(){
  this.request.getcomments(this.blog_id).subscribe((response: any) => {
    this.Comments=response.data;
    this.commtotal=this.Comments.length 
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
  this.request.addrecipecomment(edata2).subscribe((res: any) => {
    if (res.message == 'Comment  Submitted') {  
      this.toastr.success('Comment  Submitted', '');
      this.getcommentsss();
    }
    else  {
      this.toastr.error(res.message);
  

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
this.recipeloader=true;
this.imgloader = false;
this.request.searchblog(edata).subscribe((res:any)=>{
  this.Blogs=res.data;
  this.pagenation=res.meta   
  this.pagess=this.pagenation.links
  setTimeout(() => {
    this.imgloader = true;
  }, 2000);
}, (error: any) => {
  console.log("error",error);
});
}

search2(form:FormGroup){

  let edata ={
    key :form.value.key
  }
  this.recipeloader=true;
  this.imgloader = false;
  this.request.searchbyblog(edata).subscribe((res:any)=>{
    this.Blogs=res.data;
    this.pagenation=res.meta   
    this.pagess=this.pagenation.links
    setTimeout(() => {
      this.imgloader = true;
    }, 2000);
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