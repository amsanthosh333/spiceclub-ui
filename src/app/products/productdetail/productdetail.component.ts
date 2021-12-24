import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service'; 
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user'; 
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {
  openproduct: any;
  Peoduct: any;
  choice: any;
  stocck: any;

  constructor(private router: Router,private fb: FormBuilder,private request: RequestService) { 
    this.viewrqwproduct();
  }

  ngOnInit(): void {
    this.viewrqwproduct();
  }
  viewrqwproduct(){
    var product_id
    this.request.viewfeatproducd(this.openproduct).subscribe((response: any) => {
      // this.data = data;
      // this.filteredData = data;
      this.Peoduct=response.data[0];
       product_id=this.Peoduct.id;
       this.choice=this.Peoduct.choice_options;
       this.stocck=this.Peoduct.current_stock;
      // console.log("topsellis",product_id);
      console.log("ddddddddddddddddddddddddddddddddddddd",this.Peoduct);
      console.log("choiceoptions",this.Peoduct.choice_options); 
      // this.page1=false,
      // this.page2=true,
    
      // this.filteredData=data.response;
      
    });
    console.log("topsellis",product_id);
  
  }
  
}
