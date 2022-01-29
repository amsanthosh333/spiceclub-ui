import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private subject = new Subject<any>();

  sendClickEvent(){
    this.subject.next(value)
  }
  getClickEvent():Observable<any>{
  return this.subject.asObservable()
  
}
 
} 
function value(value: any, any: any) {
  throw new Error('Function not implemented.');
}

