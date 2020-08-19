import { MatSnackBar } from '@angular/material';
import { User } from './../register/register.component';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

export interface Credentials {
  email: string;
  password: any;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private userUrl = '/users-role';
  private coachPath='/coaches';
  private tk;

  constructor( private router: Router, 
    private af:AngularFireAuth,
    private db:AngularFireDatabase,
    private snackBar: MatSnackBar,
    private route:ActivatedRoute
   ) { }


 login(isStudent: boolean, credentials: Credentials) {
    this.af.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(authState=>{ 
      
      //saving the token to the localStorange
       authState.user.getIdToken().then((token:string)=>{
         this.tk=token;
         localStorage.setItem('token', token);
      });

      let returnURL= this.route.snapshot.queryParamMap.get('returnUrl') //getting return URL



      // navigate programmatic to incubatee/coach
       if (isStudent) {

        // navigate to incubatee page

      this.db.list(`${this.userUrl}/` + authState.user.uid)
      .snapshotChanges()

      .pipe(map((arr) => {
          return arr.map((res) => Object.assign(res.payload.val(), {$key: res.key}));
      })).subscribe(snap => {
                console.log(snap[0]);

                if(snap[0]['deleteUser'] !==undefined  && snap[0]['deleterUser']==true){
                  this.af.auth.currentUser.delete();
                  this.snackBar.open("Sorry! You application has been denied..Try again Next time", 'OK', {duration:5000})
                  this.router.navigate(['/'])
                  return;
                }
                // navigate to the specific pages
                if (snap[0]['role'] === 'applicant') {
                  this.router.navigate(['/pending', snap[0]['userID'  || returnURL]]);
                } else if (snap[0]['role'] === 'incubatee') {
                  this.router.navigate([ '/incubatee', snap[0]['userID']  || returnURL ]);
                }
              });
      return;
      }


      // navigate to coachs page

        this.db.list(`${this.coachPath}/` + authState.user.uid).snapshotChanges()
           .pipe(map(arr=>{
             return arr.map(res=>Object.assign(res.payload.val(), {key:res.key}))
           }))
            .subscribe(snap=>{
              console.log(snap[0]['role'])
            
              if(snap[0] && snap[0]['role']==='admin'){
              this.router.navigate([returnURL || '/landingadmin'])
              }
              else if ( snap[0] && snap[0]['role']==='coach'){
                if( snap[0]['deleteUser'] && snap[0]['deleterUser']==true){
                  //deleting user's account
                    this.af.auth.currentUser.delete();
                    this.db.object('/coaches/' + authState.user.uid).remove();
                    this.snackBar.open('Your account has been deactivated', 'OK', {duration: 3000})
                    this.router.navigate(['/'])
                }
                this.router.navigate([returnURL || '/splashpg']);
              }
            })
  
          })// end of then()
       .catch(error => {console.log('error', error); });
}// end of login()

    logOut() {
      this.af.auth.signOut();
    }


    isLoggedIn() {
      const jwt = new JwtHelperService();
      const token = localStorage.getItem('token');
      return token != null &&  !jwt.isTokenExpired(token);

      /**
       * for the method to be true either parts should be true
       * the later part should evaluate to true
       * means the isTokenExpired() should be false meaning token is not obselete
       */
    }



}
