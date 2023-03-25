import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  logged=localStorage.getItem("login")=="true"
  constructor(private login:LoginService){}
  ngOnInit(): void {
    this.logged=localStorage.getItem("login")=="true"
    
  }
}
