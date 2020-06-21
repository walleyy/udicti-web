import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
 
export interface Credentials{
  email:string;
  password:any;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private userUrl= "/users-role";
  private tk;


  constructor( private router: Router, 
    private af:AngularFireAuth,
    private db:AngularFireDatabase,
   ) { }


 login(isStudent:boolean, credentials:Credentials){
    this.af.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(authState=>{ 
      
      //saving the token to the localStorange
       authState.user.getIdToken().then((token:string)=>{
         this.tk=token;
         localStorage.setItem('token', token);
      });
      let jwt= new JwtHelperService();



      //navigate programmatic to incubatee/coach
      if(isStudent){
        // navigate to incubatee page

      this.db.list(`${this.userUrl}/` + authState.user.uid)
      .snapshotChanges()
      .pipe(map((arr)=>{
          return arr.map((res)=>Object.assign(res.payload.val(),{$key:res.key}))
      })).subscribe(snap=>{
                console.log(snap[0]['role']);
                //navigate to the specific pages
                if(snap[0]['role']=='applicant'){
                  this.router.navigate(['/pending', snap[0]['id']]);
                }
                else if(snap[0]['role']=='incubatee'){
                  this.router.navigate(['/incubatee', snap[0]['id']])
                }
              });  
              return;
      }
      //navigate to coachs page
      this.router.navigate(['/coach', authState.user.uid]);


      console.log(authState)
          })// end of then()
       .catch(error=>{console.log('error',error)});
}

    logOut(){
      this.af.auth.signOut();
    }

    isLoggedIn(){
      let jwt= new JwtHelperService();
      const token= localStorage.getItem('token');
      return token!=null &&  !jwt.isTokenExpired(token);  

      /**
       * for the method to be true either parts should be true
       * the later part should evaluate to true
       * means the isTokenExpired() should be false meaning token is not obselete
       */
    }

    isStudent(){

    }

}
