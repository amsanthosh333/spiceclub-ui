import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
@Component({
  selector: 'app-storelocation',
  templateUrl: './storelocation.component.html',
  styleUrls: ['./storelocation.component.css']
})
export class StorelocationComponent implements OnInit {
  description: any;
  desload: boolean=true;

  constructor(private request:RequestService) { }

  ngOnInit(): void {
    window.scroll(0,0)
    this.getaboutus();
  }

  getaboutus(){
    this.request.getstorelocation().subscribe((res:any)=>{
      console.log("store location res",res);
  this.description=res.data[0].content
  this.desload=false
     });
  }
}