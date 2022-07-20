import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestService } from 'src/app/services/request.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [NgbRatingConfig, ToastrService],
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
  pagenation: any;
  pagess: any;
  page1: boolean = true;
  page2: boolean = false;
  currentRate: any;
  commtotal: any;
  blogdate: any;
  currentRatess: any;
  searchall!: FormGroup;
  searchbyblog!: FormGroup;
  error1: any;
  loader: boolean = true;
  loader1: boolean = true;
  prodcount = [1, 2, 3, 4, 5, 6,7,8];
  sideloader2: boolean = true;
  allloader1: boolean = true;
  recipeloader: boolean = true;
  imgloader: boolean = false;
  keyy: any;
  topItem: any;
  currentpage: any;
  blogid: any;
  pagee: any = 1;
  BBlogs: any;
  Firstblog: any;
  Bestblog = [];
  catblogs: boolean = false;
  loader2!: boolean;
  constructor(private router: Router, private formBuilder: FormBuilder, private fb: FormBuilder,
    private request: RequestService, private modalService: NgbModal, private route: ActivatedRoute,
    private toastr: ToastrService, config: NgbRatingConfig, private _location: Location, private activatedRoute: ActivatedRoute) {

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
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.viewblogcat();
    console.log("blllloggg");
    this.activatedRoute.queryParams.subscribe((data2: Params) => {
      this.blogid = data2['category']
      this.pagee = data2['page']
      if (this.blogid == undefined || this.blogid == null) {
        this.catblogs = false;
        this.loader2 = true
        this.viewallblog(this.pagee);
      }
      else {
        this.catblogs = true
        this.getblogbycatg(this.blogid, this.pagee);
      }
      console.log("blllloggg");
    });

    this.comment = this.fb.group({
      rating: ['', [Validators.required]],
      comment: ['', [Validators.required]],
    });
    this.searchall = this.fb.group({
      key: [''],
    });
    this.searchbyblog = this.fb.group({
      key: [''],
    });
  }

  viewallblog(page: any) {
    this.loader1 = true;
    this.imgloader = false;
    this.request.getallblog(page).subscribe((res: any) => {
      this.Blogs = res.data;
      this.Firstblog = this.Blogs[0];
      this.loader1 = false;
      this.pagenation = res.meta
      this.pagess = this.pagenation.links
      this.topItem = -1
      setTimeout(() => {
        this.imgloader = true;
      }, 2000);
    }, (error: any) => {
      console.log("error", error);
    });
  }
  bestblogs(data: any) {
    console.log("bestblog sta", data);
    // return  this.Blogs
    this.request.getbestblog(data).subscribe((res: any) => {
      this.Bestblog = res.data;
      console.log("bestblog", this.Bestblog);
    });
    return this.Bestblog
  }
  viewblogcat() {
    this.imgloader = false
    console.log("viewblogcat");
    this.request.getallblogcat().subscribe((response: any) => {
      this.Allcat = response.data;
      this.imgloader = true
      this.loader2 = false
      this.loader = false;
    },
      (error: any) => {
        console.log("error", error);
      });
  }
  getblogbycatg(id: any, page: any) {
    this.loader1 = true;
    this.imgloader = false;
    this.request.getblogbycat(id, page).subscribe((response: any) => {
      this.Blogs = response.data;
      this.loader1 = false;
      this.pagenation = response.meta
      this.pagess = this.pagenation.links
      this.page1 = true;
      this.page2 = false;
      let index = this.Allcat?.findIndex((x: any) => x.id == id);
      this.topItem = index
      // this.router.navigate(['/blog'],{ queryParams:{ category:this.blogid, page: page} });
      setTimeout(() => {
        this.imgloader = true;
      }, 2000);
    },
      (error: any) => {
        console.log("error", error);
      });
  }
  getblogbycatg2(id: any, i: any) {
    window.scroll(0, 0);
    // this.router.navigate(['blog', id]);
    this.router.navigate(['/blog'], { queryParams: { category: id, page: 1 } });
    this.topItem = i
    // this.getblogbycatg(id)

  }
  getpage(url: any) {
    if (url !== null) {
      this.loader1 = true;
      this.imgloader = false;
      window.scroll(0, 0);

      this.request.getpage(url).subscribe((response: any) => {
        this.Blogs = response.data;
        this.loader1 = false;
        this.pagenation = response.meta
        this.pagess = this.pagenation.links
        this.currentpage = response.meta.current_page;
        this.router.navigate(['/blog'], { queryParams: { category: this.blogid, page: this.currentpage } });
        setTimeout(() => {
          this.imgloader = true;
        }, 2000);
      })
    }

  }
  getblogdetailold(id: any) {
    this.page1 = false;
    this.imgloader = false;
    window.scroll(0, 0)
    this.page2 = true;
    this.sideloader2 = true;
    this.allloader1 = true;

    this.recipeloader = true;
    this.blog_id = id;
    this.request.getblogdetail(id).subscribe((response: any) => {
      this.Peoduct = response.data[0];
      this.blogdate = this.Peoduct.created_at.split(/[T ]/i, 1)[0];
      this.currentRatess = this.Peoduct.rating;
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
  getblogdetail(id: any) {
    console.log("blogid",id);
    
    window.scroll(0, 0);
    this.router.navigate(['blogdetails', id]);

  }

  getcommentsss() {
    this.request.getblogcomments(this.blog_id).subscribe((response: any) => {
      this.Comments = response.data;
      this.commtotal = this.Comments.length
    },
      (error: any) => {
        console.log("error", error);
      });
  }
  addcomment(form: FormGroup) {
    this.error1 = '';
    if (this.comment.invalid) {

      if (!this.comment.get('rating')?.valid) {
        this.error1 = '*give star';
      }
      else if (!this.comment.get('comment')?.valid) {
        this.error1 = '*type some comment';
      }
      return;
    }
    else {
      if ((this.comment.get('rating'))?.value != Number) {
        form.value.rating = 0
        let edata2 = {
          blog_id: this.blog_id,
          user_id: this.userid,
          rating: form.value.rating,
          comment: form.value.comment,
        }
        this.request.addblogcomment(edata2).subscribe((res: any) => {
          if (res.message == 'Comment  Submitted') {
            this.toastr.success('Comment  Submitted', '');
            this.getcommentsss();
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
  search1(form: FormGroup) {
    let edata = {
      key: form.value.key
    }
    this.loader1 = true;
    this.imgloader = false;
    this.request.searchblog(edata).subscribe((res: any) => {
      this.Blogs = res.data;
      this.pagenation = res.meta
      this.pagess = this.pagenation.links
      this.loader1 = false;
      setTimeout(() => {
        this.imgloader = true;
      }, 2000);
    }, (error: any) => {
      console.log("error", error);
    });
  }

  search2(form: FormGroup) {
    let edata = {
      key: form.value.key
    }
    this.loader1 = true;
    this.imgloader = false;
    this.request.searchbyblog(edata).subscribe((res: any) => {
      this.Blogs = res.data;
      this.pagenation = res.meta
      this.pagess = this.pagenation.links
      this.loader1 = false;
      setTimeout(() => {
        this.imgloader = true;
      }, 2000);
    }, (error: any) => {
      console.log("error", error);
    });
  }
  backk() {
    // this._location.back();
    this.page1 = true;
    this.page2 = false;
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
  goback() {
    this.catblogs = false;
    this.topItem=-1

  }
}
