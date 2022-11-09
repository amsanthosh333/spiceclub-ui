import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css'],
  providers: [ToastrService],
})
export class KycComponent implements OnInit {
  registerForm: FormGroup;
  cardImageBase64: any;
  isImageSaved!: boolean;
  filename: any;
  gstImageBase64: any;
  panImageBase64: any;
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  userid: any;
  accesstoken: any;
  tokentype: any; Proce: any;
  currentdetail: User;
  register!: FormGroup;
  username: any;
  error2: any;
  uaImageBase64: any;
  constructor(private router: Router, private modalService: NgbModal, private fb: FormBuilder, private formBuilder: FormBuilder, private request: RequestService, private toastr: ToastrService) {

    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );

    this.currentUser = this.currentUserSubject.asObservable();
    this.currentdetail = this.currentUserSubject.value;
    this.userid = this.currentdetail.user?.id;
    this.username = this.currentdetail.user?.name;
    this.accesstoken = this.currentdetail.access_token;
    this.tokentype = this.currentdetail.token_type;
    this.registerForm = this.formBuilder.group({
      gst: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(15), Validators.pattern("^[a-zA-Z0-9 ]+$")],],
      gstimg: ['', Validators.required],
      pan: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[a-zA-Z0-9 ]+$")],],
      panimg: ['', Validators.required],
      ua: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12), Validators.pattern("^[a-zA-Z0-9 ]+$")],],
      uaimg: ['', Validators.required],
    },
    );
  }

  ngOnInit(): void {
  }
  onSubmit(form: FormGroup) {
    this.error2 = '';
    if (this.registerForm.invalid) {
    
      if (this.registerForm.get('gst')?.valid || this.registerForm.get('pan')?.valid || this.registerForm.get('ua')?.valid) {
  
        if(this.registerForm.get('gst')?.valid){
          if(this.registerForm.get('gstimg')?.valid){

          }
          else{
            this.error2 = '* Upload GST image';
          }
        }
       else if(this.registerForm.get('pan')?.valid){
          if(this.registerForm.get('panimg')?.valid){

          }
          else{
            this.error2 = '* Upload Pan image';
          }
        }
        else if(this.registerForm.get('ua')?.valid){
          if(this.registerForm.get('uaimg')?.valid){

          }
          else{
            this.error2 = '* Upload UA image';
          }
        }

        else {
          const edata = {
            user_id: this.userid,
            gst_number: form.value.gst,
            gst_image: this.gstImageBase64,
            pan_number: form.value.pan,
            pan_image: this.panImageBase64,
            aadhar_number: form.value.ua,
            aadhar_image: this.uaImageBase64,
          }
          this.request.addkyc(edata).subscribe((res: any) => {
            if (res.result == true) {
              form.reset()
              this.toastr.success('Submited Successfully', '');
              this.modalService.dismissAll();
              this.router.navigate(['/profile']).then(() => {
                window.location.reload();
              });
            }
            else {
              this.toastr.info('Something went wrong', '');
            }
          }, (error: any) => {
            console.log("error", error);
            this.toastr.info('Something went wrong', '');
          });
        }


      }
      else {
        this.error2 = '* Enter correct GST or PAN or UA number';
      }

      return;
    }
  
  }
  fileChangeEvent(fileInput: any) {
    this.filename = fileInput.target.files[0].name;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          // console.log(img_height, img_width);
          const imgBase64Path = e.target.result.split(',')[1];
          this.gstImageBase64 = imgBase64Path;
          this.isImageSaved = true;
          // this.previewImagePath = imgBase64Path;
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  fileChangeEvent2(fileInput: any) {
    this.filename = fileInput.target.files[0].name;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      // if (fileInput.target.files[0].size > max_size) {
      //     this.imageError =
      //         'Maximum size allowed is ' + max_size / 1000 + 'Mb';

      //     return false;
      // }

      // if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
      //     this.imageError = 'Only Images are allowed ( JPG | PNG )';
      //     return false;
      // }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result.split(',')[1];
          this.panImageBase64 = imgBase64Path;
          this.isImageSaved = true;
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  fileChangeEvent3(fileInput: any) {
    this.filename = fileInput.target.files[0].name;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      // if (fileInput.target.files[0].size > max_size) {
      //     this.imageError =
      //         'Maximum size allowed is ' + max_size / 1000 + 'Mb';

      //     return false;
      // }

      // if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
      //     this.imageError = 'Only Images are allowed ( JPG | PNG )';
      //     return false;
      // }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result.split(',')[1];
          this.uaImageBase64 = imgBase64Path;
          this.isImageSaved = true;
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}
