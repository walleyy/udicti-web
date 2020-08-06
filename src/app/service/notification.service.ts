import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Notification } from '../coach/notifications/notifications.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  baseUrl= '/notifications'

  constructor(private db: AngularFireDatabase) { }

   postNotification(notification:Notification){
     this.db.list(`${this.baseUrl}`).push(notification);
   }

   getNotification(){
     return this.db.list(`${this.baseUrl}`).snapshotChanges().pipe( map(arr=>{
        return arr.map(res=>{
         return Object.assign(res.payload.val(), {key:res.key});
        })
     }))
}


}