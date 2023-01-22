import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  persistance: string = 'local';
  users: User[] = []
  subscriptions: Subscription;

  constructor(private authService: AuthService) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(){
    this.subscriptions.add(this.authService.usersSubject.subscribe(users => {
      this.users = users;
    }));
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }

  onSelectPersistance() {
    this.authService.setPersistance(this.persistance);
  }

  setCustomer(user: User, customer: boolean){
    user.roles.customer = !customer;
    this.authService.updateUser(user);
  }

  setManager(user: User, manager: boolean){
    user.roles.manager = !manager;
    this.authService.updateUser(user);
  }

  setAdmin(user: User, admin: boolean){
    user.roles.admin = !admin;
    this.authService.updateUser(user);
  }

  banOrUnban(id: string, banned: boolean) {
    this.authService.banOrUnbanUser(id, !banned);
  }
}
