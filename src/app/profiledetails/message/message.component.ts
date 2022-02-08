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
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
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
  Convertations: any;
  page2: boolean=false;
  Messages: any;
  page1: boolean=true;
  conv_id: any;
  message!: FormGroup;
  Mesg: any;
  lastmessage_id: any;
  currentname: any;
  currentlogo: any;

  constructor(private router: Router,private fb: FormBuilder,private request: RequestService,private modalService: NgbModal,) { 
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')||'{}')
      
    );
    console.log("currentuser details=", this.currentUserSubject);
    this.currentUser = this.currentUserSubject.asObservable();
     this.currentdetail = this.currentUserSubject.value;
     this.userid=this.currentdetail.user.id; 
     this.accesstoken=this.currentdetail.access_token;
     this.tokentype=this.currentdetail.token_type;

     setInterval(()=> { this.lastmessage() }, 60000);
  }


  ngOnInit(): void {
    window.scroll(0,0)
    this.viewdata();
    this.message = this.fb.group({ 
      message:['',[Validators.required]],
    });
  }
  viewdata(){
    this.request.getallconv(this.userid).subscribe((response: any) => {
      this.Convertations=response.data;   
      console.log("response",response);
      console.log("Convertations",this.Convertations);
      this.viewrow(this.Convertations[0])
    },
    (error: any) => {
      console.log("error",error); 
    });
  }
  viewrow(row:any){
    this.conv_id=row.id
    this.currentname=row.shop_name;
    this.currentlogo=row.shop_logo;
    this.request.getallmessages(row.id).subscribe((response: any) => {
      this.page2=true;this.page1=false;
      this.Messages=response.data.reverse();   
      console.log("response",response);
      console.log("Messages",this.Messages);
    },
    (error: any) => {
      console.log("error",error); 
    });
  }
  sendmsg(form:FormGroup){
    if (this.message.invalid) {
     console.log("empty");
     
      return;
    } else {
    let edata={
    conversation_id :this.conv_id,
    user_id :this.userid ,
    message: form.value.message
    }
    this.request.sendmessages(edata).subscribe((response: any) => {  
      // this.Messages=response.data;   
      console.log("response",response);
      if(response.success==true){
        this.Mesg=response.data; 
        this.lastmessage_id= this.Mesg.id
        this.lastmessage();
      }
      else{
     console.log("err Messages",response);
      }  
    },
    (error: any) => {
      console.log("error",error); 
    });
  }
  }
  lastmessage(){
    this.request.getnewmessages(this.conv_id,this.lastmessage_id,).subscribe((response: any) => {  
      // this.Messages=response.data;   
      console.log("newmsg",response);
      if(response.success==true){
        this.Messages=response.data.reverse(); 
        // this.lastmessage_id= this.Mesg.id

      }
      else{
     console.log("err Messages",response);
      }  
    },
    (error: any) => {
      console.log("error",error); 
    });

  }
  
 

}