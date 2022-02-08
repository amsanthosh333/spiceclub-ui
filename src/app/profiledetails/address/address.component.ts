import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { User } from 'src/app/models/user';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { windows } from 'ngx-bootstrap-icons';
import { ConfirmedValidator } from 'src/app/auth/confirmedValidator';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  providers: [ToastrService],
})
export class AddressComponent implements OnInit {
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  userid: any;
  accesstoken: any;
  tokentype: any;Proce: any;
  currentdetail: User;
  register!: FormGroup;
  City: any;
  Country: any;
  State: any;
  Address: any;
  editForm!: FormGroup;
  rowiid: any;
  username: any;
  loader: boolean=true;
  error2: any;
  state_id: any;
  country_id: any;

  lat = 48.75606;
  lng = -118.859;

  selectedMarker :any= null;

  markers = [
    // These are all just random coordinates from https://www.random.org/geographic-coordinates/
    { lat: 22.33159, lng: 105.63233, alpha: 1 },
    { lat: 7.92658, lng: -12.05228, alpha: 1 },
    { lat: 48.75606, lng: -118.859, alpha: 1 },
   
  ];
  constructor(private router: Router, private fb: FormBuilder, private toastr: ToastrService, private request: RequestService,
    private modalService: NgbModal,) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );

    this.currentUser = this.currentUserSubject.asObservable();
    this.currentdetail = this.currentUserSubject.value;
    this.userid = this.currentdetail.user?.id;
    this.username = this.currentdetail.user?.name;
    this.accesstoken = this.currentdetail.access_token;
    this.tokentype = this.currentdetail.token_type;
    console.log("currentuserid=", this.userid);

    this.editForm = this.fb.group({
      name:['',[Validators.required]],
     password: ['', [Validators.required]],
     confirm_password: ['', [Validators.required]],
   },
     {
       validator: ConfirmedValidator('password', 'confirm_password')
     }
     );

  }
  ngOnInit(): void {
    this.getaddress();
    this.viewcountry();
    this. viewstate();
    this.viewCity();

    this.register = this.fb.group({
     
     address: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['',[Validators.required]],
      city: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
      phone: [ '',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$") ]],

    });


    this.editForm = this.fb.group({
     
      address: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['',[Validators.required]],
      city: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
      phone: [ '',],
    });
  
  }
  addMarker(lat: number, lng: number) {
    this.markers.push({ lat, lng, alpha: 0.4 });
  }

  max(coordType: 'lat' | 'lng'): number {
    return Math.max(...this.markers.map(marker => marker[coordType]));
  }

  min(coordType: 'lat' | 'lng'): number {
    return Math.min(...this.markers.map(marker => marker[coordType]));
  }

  selectMarker(event: { latitude: any; longitude: any; }) {
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude
    };

    console.log('selected marker',this.selectedMarker);
    
  }
  getaddress(){
    this.request.fetchaddress(this.userid).subscribe((response: any) => {
      this.Address=response.data;   
      this.loader=false
      console.log("Address",this.Address);     
    // this. processdata()    
    });
  }
  addaddresss(content:any,content2:any){

    this.register.reset();
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
    this.modalService.open(content2, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
     
  }

  viewcountry(){
    this.request.fetchcountry().subscribe((response: any) => {
      this.Country=response.data;   
      console.log("country",this.Country);     
    // this. processdata()    
    });
  }
  selectcountry(event: any) {
    this.country_id = event.target.value;
    console.log("country id", this.country_id);
    this.request.fetchstatebycountry(this.country_id).subscribe((response: any) => {
      this.State = response.data;
      console.log("newstates", this.State);

    });

  }
  viewstate(){
    this.request.fetchstate().subscribe((response: any) => {
      this.State=response.data;   
      console.log("state",this.State);     
    // this. processdata()    
    });
  }
  selectstate(event: any) {
    this.state_id = event.target.value;
    console.log("state_id", this.state_id);
    this.request.fetchcitybystate(this.state_id).subscribe((response: any) => {
      this.City = response.data;
      console.log("newCity", this.City);

    });

  }
  viewCity(){
    this.request.fetchCity().subscribe((response: any) => {
      this.City=response.data;   
      console.log("City",this.City);     
    // this. processdata()    
    });
  }
  onAddRowSave(form: FormGroup) {  
 
    this.error2 = '';
    if (this.register.invalid) {
      console.log("form invalid")
      this.error2 = '* Enter all details';
      return;
    } else {
    const edata = { 
      user_id: this.userid,
      address:form.value.address,
      country_id:form.value.country,
      state_id:form.value.state,
      city_id:form.value.city,
      postal_code:form.value.postal_code,
      phone:form.value.phone,  
    }
    console.log(edata);
  
    this.request.addaddress(edata).subscribe((res: any) => {
      console.log("address response",res);
      if (res.status == 'Shipping information has been added successfully') {       
        form.reset()
        this.getaddress()
        this.toastr.success('Added Successfully','');
      this.modalService.dismissAll();
    // this.viewdata();    
      }
      else  {
        console.log("res",res);
        form.reset();
    this.modalService.dismissAll();
      }
    }, (error: any) => {
      console.log("error",error);
      form.reset();
      this.modalService.dismissAll();
    });
  }
  }
  editRow(row: any , content: any) {

    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });

    console.log("adderess",row);
    this.rowiid=row.id;


    this.editForm.setValue({
      address: row.address,
      country: row.country_id,
      state: row.state_id,
      city: row.city_id,
      postal_code: row.postal_code,
      phone: row.phone,

    });
  

  }
  deleteRow(row:any) {
    console.log("row",row.id);
    this.request.deleteaddress(row.id).subscribe((response: any) => {
      console.log(response); 
      if (response.message == 'Shipping information has been deleted') {
        this.modalService.dismissAll();
        this.toastr.error('Removed Successfully','');
        this.getaddress(); 
      
      }
      else  {
        this.modalService.dismissAll();
        console.log("responnn",response);
      }   
     }, (error: any) => {
       console.log(error);
     });
  }


  onEditSave(form: FormGroup) {

    // var x = this.editRow(row, content);
  console.log("row id",this.rowiid)

    const edata2 = {
       id:this.rowiid,
      user_id: this.userid,
      address:form.value.address,
      country_id:form.value.country,
      state_id:form.value.state,
      city_id:form.value.city,
      postal_code:form.value.postal_code,
      phone:form.value.phone,  
  }
  console.log("responnn",edata2);
  this.request.updateaddress(edata2).subscribe((res: any) => {
    console.log("responnn",res);
    if (res.message == 'Shipping information has been updated successfully') {
      this.modalService.dismissAll();
      this.toastr.success('Updated Successfully','');
      this.getaddress(); 
    
    }
    else  {
      this.modalService.dismissAll();
      this.toastr.error('Something went wrong','');
      console.log("responnn",res);
    }

  }, (error: any) => {
    console.log(error);
    this.modalService.dismissAll();
  });

  }


}
