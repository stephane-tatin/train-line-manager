import { Component } from '@angular/core';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  user: User = {
    firstName: "Stéphane" ,
    lastName: "Tatin"
  }
}
