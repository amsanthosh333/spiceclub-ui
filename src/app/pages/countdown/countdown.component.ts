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
    // console.log("this,.interval",this.interval);
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

//     @Input()
//   interval!: number;

//   @Output() onComplete = new EventEmitter();

//   public countdown!: string;

//   private completed!: boolean;

//   constructor() { }

//   ngOnInit() {

//     this.countdown = this.getTime();
//     const countdownObservable = timer(1000, 1000).subscribe(val => {
//       this.manipulateInterval();
//       this.countdown = this.getTime();
//       if (this.interval === 0) {
//         this.countdownCompleted();
//       }
//     });    
//   }

//   private getTime(): string {
//     if (this.interval < 0) {
//       this.interval = Math.abs(this.interval);
//       this.completed = true;
//     }
//     const days = Math.floor(this.interval / 86400);
//     const hours = Math.floor(this.interval / 3600);
//     const minutes = Math.floor((this.interval - (hours * 3600)) / 60);
//     const seconds = (this.interval - (hours * 3600) - (minutes * 60));
//     return `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   }

//   private manipulateInterval() {
//     if (this.completed) {
//       this.interval++;
//     } else {
//       this.interval--;
//     }
//   }

//   countdownCompleted() {
//     this.completed = true;
//     this.onComplete.emit();
//   }
  

// }

