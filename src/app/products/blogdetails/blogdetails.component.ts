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

  constructor(private router: Router, private formBuilder: FormBuilder, private fb: FormBuilder,
    private request: RequestService, private modalService: NgbModal, private route: ActivatedRoute,
    private toastr: ToastrService, config: NgbRatingConfig, private _location: Location) {

    config.max = 5;
    config.readonly = true;

    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')

    );
    console.log("currentuser details=", this.currentUserSubject);
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
    console.log("brand id", this.id);
    this.getblogdetail(this.id)
    this.viewallblog(1);
    this.viewblogcat();

    this.comment = this.fb.group({
      rating: ['', [Validators.required]],
      comment: ['', [Validators.required]],

    });
  }
  viewallblog(page: any) {
    this.loader1 = true;
    this.imgloader = false;
    this.request.getallblog(page).subscribe((res: any) => {
      this.Blogs = res.data;
      this.loader1 = false;
      this.pagenation = res.meta

      console.log("allblog", this.Blogs);
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
      console.log("getallblogcat", this.Allcat);
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
      console.log("currentRate", this.currentRatess);
      console.log("recipecategorydetail", this.Peoduct);
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
    console.log("navigate to blogdetails");
  }

  getcommentsss() {
    this.request.getblogcomments(this.blog_id).subscribe((response: any) => {
      this.Comments = response.data;
      this.commtotal = this.Comments.length
      console.log("Comments", this.Comments);
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
          this.error1 = '*give star';
        }
        else if (!this.comment.get('comment')?.valid) {
          this.error1 = '*type some comment';
        }
        console.log(this.error1)
        return;
      }
      else {
        if ((this.comment.get('rating'))?.value == 0) {
          console.log("valueee", (this.comment.get('rating'))?.value);

          form.value.rating = 0
        }
        else {
          let edata2 = {
            blog_id: this.blog_id,
            user_id: this.userid,
            rating: form.value.rating,
            comment: form.value.comment,
          }
          console.log(edata2);
          this.request.addblogcomment(edata2).subscribe((res: any) => {
            console.log(res);
            if (res.message == 'Comment  Submitted') {
              this.toastr.success('Comment  Submitted', '');
              this.getcommentsss();
              this.comment.reset();
            }
            else {
              this.toastr.error(res.message);
              console.log("error", res);

            }
          }, (error: any) => {
            console.log("error", error);

          });
        }
      }
    }
  }
  getblogbycatg(id: any) {
    window.scroll(0, 0);
    this.router.navigate(['blog', id]);
    console.log("navigate to blog");
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

}
