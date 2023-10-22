import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // behaviour subject for other component to subscribe to
  private _users!: BehaviorSubject<User[]>

  // private datastore in memory
  private dataStore!: {
    users: User[]
  }


  constructor(private http: HttpClient) {
    this.dataStore = { users: [] };
    this._users = new BehaviorSubject<User[]>([]);
  }

  // this enable other component to subscribe to this behaviour subject.
  get users(): Observable<User[]> {
    return this._users.asObservable(); // init is the 1st time data received by subscribers.
  }

  addUser(user: User): Promise<User> {
    return new Promise((resolver, reject) => {
      user.id = this.dataStore.users.length + 1;
      this.dataStore.users.push(user);
      this._users.next(Object.assign({}, this.dataStore).users);
      //https://www.c-sharpcorner.com/article/observable-and-promise-in-angular/
      resolver(user);
    });
  }
  userById(id: number): User {
    return this.dataStore.users.find(x => x.id == id)!;
  }

  loadAll() {
    const userUrl = 'https://localhost:7113/users';

    return this.http.get<User[]>(userUrl)
      .subscribe({
        next: data => {
          this.dataStore.users = data;
          // only publish users from data store
          this._users.next(Object.assign({}, this.dataStore).users);
        }, error: error => {
          console.log("Failed to fetch users.");
        }
      });
  }
}
