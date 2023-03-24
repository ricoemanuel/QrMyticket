import { Component } from '@angular/core';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  logged=this.login.userObserver()
  constructor(private login:LoginService){}
}
