import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CryptoService } from '../services/crypto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']

})
export class HomeComponent {

  userName: any;
  password: any;

  constructor(private authService: AuthService, private cryptoService:CryptoService, 
    private router: Router,
    ) { }
  ngOnInit(): void {
    document.getElementById('id01').style.display = 'block'
  }

  onLogin() {
    let request = {
      userName: this.userName,
      password: this.cryptoService.encrypt('123456$#@$^@1ERF', this.userName)
    }
    this.authService.onLogin(request).subscribe((data:any) => {
      if(data && data.roleId>0){
        this.authService.userDetails = data;
        this.router.navigateByUrl('/dashboard');
      }
    });
  }
}
