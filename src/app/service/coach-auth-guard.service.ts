import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { map}  from 'rxjs/operators';
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class CoachAuthGuardService implements CanActivate{
  private coachesPath='/coaches';
  private isCoach:boolean;

  constructor(private db:AngularFireDatabase,
             private auth:AngularFireAuth,
             private router: Router) { }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot){
    this.auth.authState.subscribe(authState=>{

      this.db.list(`${this.coachesPath}/` + authState.uid).snapshotChanges().pipe(map(arr=>{
        return arr.map(res=>{
          return res.payload.val();
        })
      })).subscribe(snap=>{
        if(snap[0]['role']==='coach') {this.isCoach=true; return;}
        this.isCoach=false;
      })
    })

   if (this.isCoach) return true;
    this.router.navigate(['/login'], {queryParams:{returnUrl:state.url}})
    return false;
  }
}
