import { AngularFireDatabase } from '@angular/fire/database';
import { CanActivate, Router,ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {
  private adminPath= '/coaches';
  private isAdmin:boolean;

  constructor(private auth:AngularFireAuth,
              private db:AngularFireDatabase,
              private router:Router) { }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot){
    this.auth.authState.subscribe(authState=>{
      this.db.list(`${this.adminPath}/` + authState.uid).snapshotChanges().pipe(map(arr=>{
        return arr.map(res=>{
          return res.payload.val(); 
       })
     })).subscribe(snap=>{
       if(snap[0]['role']=="admin") {this.isAdmin=true; return}
       this.isAdmin=false;
          })
    })
    
    if(this.isAdmin) return true;
     this.router.navigate(['/login'], {queryParams:{returnUrl: state.url}});
     return false;
  }
}