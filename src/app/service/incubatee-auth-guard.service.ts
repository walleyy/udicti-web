import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IncubateeAuthGuardService implements CanActivate {
  private userPath='/users-role';
  private isIncubatee:boolean

  constructor(private auth:AngularFireAuth,
              private db: AngularFireDatabase,
              private router:Router) { }

  canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){
      this.auth.authState.subscribe(authState=>{
        this.db.list(`${this.userPath}/` + authState.uid).snapshotChanges().pipe( map(arr=>{
          return arr.map(res=>{
            return res.payload.val();
          })
        })).subscribe(snap=>{
          if(snap[0]['role']=='incubatee') {this.isIncubatee=true; return}
          this.isIncubatee=false;
        })
      })

    if(this.isIncubatee) return true;
      this.router.navigate(['/login'], {queryParams:{returnUrl:state.url}});
      return false;
  }


}
