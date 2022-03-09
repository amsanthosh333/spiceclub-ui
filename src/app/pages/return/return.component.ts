import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent implements OnInit {
  description: any;
  desload: boolean=true;

  constructor(private request:RequestService) { }

  ngOnInit(): void {
    window.scroll(0,0)
    this.getaboutus();
  }
  getaboutus(){
    this.request.getreturn().subscribe((res:any)=>{
  console.log("res",res);
  this.description=res.data[0].content
  console.log("this.description",this.description);
  this.desload=false
     });
  }
}
