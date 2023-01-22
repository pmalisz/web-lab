import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: User[] = []
  usersSubject: BehaviorSubject<User[]>;
  userData: any;
  user!: User | null;

  constructor( public store: AngularFirestore, public afAuth: AngularFireAuth, public router: Router) {
    this.usersSubject = new BehaviorSubject(this.users);

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        
        this.store.collection('users').doc(user.uid).ref.get().then(doc => {
          this.user = doc.data() as User;
        });

        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });

    this.getAllUsers().subscribe((users) => {
      this.users = users;
      this.usersSubject.next(this.users)
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  get isAdmin(): boolean {
    if(this.user)
      return this.user.roles.admin;

    return false;
  }

  get isManager(): boolean {
    if(this.user)
      return this.user.roles.manager || this.user.roles.admin;

    return false;
  }

  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['dish-list']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['dish-list']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  
  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.user = null;
      this.router.navigate(['sign-in']);
    });
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.store.doc(
      `users/${user.uid}`
    );
    
    const defaultRole: Role = {
      customer:true,
      manager:false,
      admin:false
    }

    const userData: User = {
      id: user.uid,
      email: user.email,
      roles: defaultRole,
      banned: false,
    };

    return userRef.set(userData, {
      merge: true,
    });
  }

  setPersistance(persistance: string){
    this.afAuth.setPersistence(persistance);
  }

  getAllUsers(): Observable<User[]>{
    return this.store.collection('users').valueChanges({ idField: 'id' }) as Observable<User[]>;
  }

  updateUser(user: User){
    this.store.collection('users').doc(user.id).update(user);

    this.getAllUsers().subscribe((users) => {
      this.users = users;
      this.usersSubject.next(this.users)
    });
  }

  banOrUnbanUser(id: string, banned: boolean) {
    this.store.collection('users').doc(id).update({banned: banned});

    if (id == this.user?.id)
      this.user.banned = banned;
  }
}
