import { Component, Input, OnInit, Output, EventEmitter, ElementRef, OnDestroy } from '@angular/core';
import { interval,  Observable,  Subscription, timer } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit  {
  @Input()
    interval!: any;
  
    @Output() onComplete = new EventEmitter();
  days!: number ;
  hours!: number;
  minutes!: number;
  seconds!: number;
  enddate!: String;
  countDowndate!: number;
  demo!: string;

  constructor() { }

  ngOnInit() {
  this.countDowndate =new Date(this.interval).getTime();
  
   const x=setInterval(()=>{
     var now = new Date().getTime();
     var distance = this.countDowndate -now;
     this.days = Math.floor(distance/(1000*60*60*24));
     this.hours = Math.floor((distance % (1000*60*60*24))/ (1000*60*60));
     this.minutes = Math.floor((distance % (1000*60*60))/(1000*60*60));
     this.seconds =Math.floor((distance % (1000*60))/1000);
     this.demo= this.days + "d " + this.hours +"h " + this.minutes + "m " +this.seconds +"s "
   })

  }
  time(){

  }
}
