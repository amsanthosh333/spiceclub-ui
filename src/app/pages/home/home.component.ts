import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from 'src/app/services/request.service'; 
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Slider: any;
  loadingIndicator: boolean | undefined;
  Futurecatg: any;
  opencat: any;
  FeaturePro: any;
  page1: boolean=true;
  page2: boolean=false;
  openproduct: any;
  Peoduct: any;
  page3: boolean=false;
  Banners: any;
  Todaysdeal: any;
  sliddder: any;
   imggg= 'https://neophroncrm.com/spiceclubnew/public/uploads/all/UDLqy0hIg1qmw8OlafXKE4bt9LxODcXMOPvTiabw.png'
  Bestsellpro: any;
  Futuredpro: any;
  photoo: any=[];
  photooo:any = [
    "https://neophroncrm.com/spiceclubnew/public/uploads/all/UDLqy0hIg1qmw8OlafXKE4bt9LxODcXMOPvTiabw.png",
    "https://neophroncrm.com/spiceclubnew/public/uploads/all/Vcp3JrmWUsJH04QO9b14cRe0maSP03F87nsfHXaw.png"
  ];
  p1: any;
  p2: any;
  
  
  constructor(private router: Router,private fb: FormBuilder,private request: RequestService,private modalService: NgbModal,) {

    // console.log("slidermmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",this.photoo);
    // this.viewdata();
    console.log("slidermmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",this.photooo);
   }

  ngOnInit(): void {
    this.viewdata();
    this.viewbestsellpro();
    this.viewfuturedpro();
    this.viewdata3();
    // this.viewdata2();
    // this.viewdata3();
    // this.viewdata4();
   
  }
 
  
  viewdata(){
    this.request.getslider().subscribe((response: any) =>{ 
      this.Slider=response.data;
      console.log("slider.data",response.data);
      
      this.photoo = this.Slider.map( (item:any) => 'https://neophroncrm.com/spiceclubnew/public/' + item.photo);
      console.log("photosss",this.photoo)
       setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });
  }
  viewbestsellpro(){
    this.request.getbestsellpro().subscribe((response: any) => {
      this.Bestsellpro=response.data.slice(0,8);
      console.log("best sellling",this.Bestsellpro);  
    });
  }
  viewfuturedpro(){
    this.request.getfuturedpro().subscribe((response: any) => {
      this.Futuredpro=response.data;   
      console.log("response.data",response);
      console.log("allbrands",this.Futuredpro);
   
    });
  }
  openquick(content:any){
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }
  viewdata3(){
    this.request.getbanner().subscribe((response: any) => {
      this.Banners=response.data;    
       console.log("slider.data",response.data);
      console.log("slider",this.Slider);
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });
  }

}
