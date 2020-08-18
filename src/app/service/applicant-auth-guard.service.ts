import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApplicantAuthGuardService implements CanActivate {
  private userPath='/users-role';
  private isApplicant:boolean;

  constructor(private auth: AngularFireAuth,
              private db:AngularFireDatabase,
              private router:Router) { }


    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot){
      this.auth.authState.subscribe(authState=>{
        this.db.list(`${this.userPath}/` +authState.uid).snapshotChanges().pipe(map(arr=>{
          return arr.map(res=>{
            return res.payload.val();
          })
        })).subscribe(snap=>{
            if(snap[0]['role']==='applicant') { this.isApplicant=true; return}
            this.isApplicant=false;
        })
      })
       
      if(this.isApplicant) return true;
      this.router.navigate(['/login'], {queryParams:{returnUrl: state.url}})
    }
}
