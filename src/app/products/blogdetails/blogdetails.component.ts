import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestService } from 'src/app/services/request.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-blogdetails',
  templateUrl: './blogdetails.component.html',
  styleUrls: ['./blogdetails.component.css'],
  providers: [NgbRatingConfig, ToastrService],
})
export class BlogdetailsComponent implements OnInit {
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  prodid: any
  _values1 = [" 1 ", "2", " 3 ", " 4 ", " 5 ", " 6 "];
  _values2 = [" 1 ", "2", " 3 ", " 4 ", " 5 "];
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
  error1: any;
  commtotal: any;
  currentRate: any;
  blogdate: any;
  currentRatess: any;
  searchall!: FormGroup;
  searchbyblog!: FormGroup;
  loader: boolean = true;
  loader1: boolean = true;
  prodcount = [1, 2, 3, 4, 5, 6];

  sideloader2: boolean = true;
  allloader1: boolean = true;
  recipeloader: boolean = true;
  imgloader: boolean = false
  pagenation: any;
  id: any;
  productname: any;
  currenturl: any;
  topItem:any;
  CatBlogs: any;
  loader2: boolean=true;
  prdcomment: boolean=true;
  recipecat: any;
  constructor(private router: Router, private formBuilder: FormBuilder, private fb: FormBuilder,
    private request: RequestService, private modalService: NgbModal, private route: ActivatedRoute,
    private toastr: ToastrService, config: NgbRatingConfig, private _location: Location) {

    config.max = 5;
    config.readonly = true;

    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')

    );
    // console.log("currentuser details=", this.currentUserSubject);
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentdetail = this.currentUserSubject.value;
    this.userid = this.currentdetail.user?.id;
    this.accesstoken = this.currentdetail.access_token;
    this.tokentype = this.currentdetail.token_type;

    if (this.userid == undefined) {
      this.userid = 0;
    }
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getblogdetail(this.id)
    this.viewallblog(1);
    this.viewblogcat();
this.getblogbycatg2(this.id)
    this.comment = this.fb.group({
      rating: ['', [Validators.required]],
      comment: ['', [Validators.required]],
    });
    this.currenturl = this.router.url
  }
  viewallblog(page: any) {
    this.loader1 = true;
    this.imgloader = false;
    this.request.getallblog(page).subscribe((res: any) => {
      this.Blogs = res.data;
      this.loader1 = false;
      this.pagenation = res.meta;
     
      setTimeout(() => {
        this.imgloader = true;
      }, 2000);
    }, (error: any) => {
      console.log("error", error);
    });
  }
  viewblogcat() {
    this.loader = true;
    this.request.getallblogcat().subscribe((response: any) => {
      this.Allcat = response.data;
      this.loader = false;
      let index = this.Allcat?.findIndex((x: any) => x.id == this.id);
      this.topItem = index
    },
      (error: any) => {
        console.log("error", error);
      });
  }
  getblogbycatg2(id: any) {
    this.loader2 = true;
    
    this.request.getblogbycat(id, 1).subscribe((response: any) => {
      this.CatBlogs = response.data;
      this.loader2 = false;
    },
      (error: any) => {
        console.log("error", error);
      });
  }
  getblogdetail(id: any) {

    this.imgloader = false;
    window.scroll(0, 0)

    this.sideloader2 = true;
    this.allloader1 = true;

    this.recipeloader = true;
    this.blog_id = id;
    this.request.getblogdetail(id).subscribe((response: any) => {
      this.Peoduct = response.data[0];
      this.blogdate = this.Peoduct.created_at.split(/[T ]/i, 1)[0];
      this.currentRatess = this.Peoduct.rating;
      this.productname = this.Peoduct.name;
      this.recipecat= this.Peoduct.category
      this.getblogbycatg2(this.recipecat)
      this.sideloader2 = false;
      this.allloader1 = false;
      this.recipeloader = false;
      setTimeout(() => {
        this.imgloader = true;
      }, 3000);
    },
      (error: any) => {
        console.log("error", error);
      });
    this.getcommentsss();
  }
  getblogdetail2(id: any) {
    window.scroll(0, 0);
    this.router.navigate(['blogdetails', id]);
    this.getblogdetail(id)
  }
  backtoblog(){
    this._location.back();
  }
  getcommentsss() {
    this.request.getblogcomments(this.blog_id).subscribe((response: any) => {
      this.Comments = response.data;
      this.commtotal = this.Comments.length
      this.prdcomment=false

    },
      (error: any) => {
        console.log("error", error);
      });
  }
  addcomment(form: FormGroup) {
    if (this.userid == 0) {
      this.toastr.info('You need to login', '');
    }
    else {
      this.error1 = '';
      if (this.comment.invalid) {
        if (!this.comment.get('rating')?.valid) {
          this.error1 = '*Give star';
        }
        else if (!this.comment.get('comment')?.valid) {
          this.error1 = '*Type some comment';
        }
        return;
      }
      else {
        if (isNaN(form.value.rating)) {
          form.value.rating = 0     
        }
     
          let edata2 = {
            blog_id: this.blog_id,
            user_id: this.userid,
            rating: form.value.rating,
            comment: form.value.comment,
          }
  
          this.request.addblogcomment(edata2).subscribe((res: any) => {

            if (res.result == true) {
              this.toastr.success('Comment  Submitted', '');
              const currentRoute = this.router.url;

              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate([currentRoute]); // navigate to same route
              });
            }
            else {
              this.toastr.error(res.message);

            }
          }, (error: any) => {
            console.log("error", error);

          });
        
      }
    }
  }
  getblogbycatg(id: any) {
    window.scroll(0, 0);
    this.router.navigate(['/blog'], { queryParams: { category: id, page: 1 } });
    
  }
  backk() {
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
  shareinstaUrl(foodid:any) {
    window.open('https://instagram.com/accounts/login/?text=%20Check%20up%20this%20awesome%20content' + encodeURIComponent(document.title) + ':%20 ' +
     encodeURIComponent('https://spiceclub-a8420.web.app/' + foodid));
    return false;
  }
}
