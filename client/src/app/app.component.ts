import { Component } from '@angular/core';
import { MatCard } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'revN';
  user = {
    isLoggedIn: false
  };

  orgs = [{ name: 'Test Org' }];
  currentOrg = '';
  events = [{ name: 'Test Event' }];

  setOrg(name: String) {
    console.log(name);
  }

  setEvent(name: String) {
    console.log(name);
  }
}
