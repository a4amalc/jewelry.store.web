import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']

})
export class HomeComponent {

  userName: any;
  password: any;

  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    document.getElementById('id01').style.display = 'block'
  }

  onLogin() {
    let request = {
      userName: this.userName,
      password: this.password
    }
    this.authService.onLogin(request).subscribe(data => {
      console.log(data)
    });
  }
}
