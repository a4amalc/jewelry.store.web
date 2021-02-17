import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CryptoService } from '../services/crypto.service';
import { Router } from '@angular/router';
import { LocalStoreService } from '../services/local-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']

})
export class HomeComponent {
  //TODO use angular reactive forms instead of ngModel 
  userName: string;
  password: string;
  isLoginValid: any = true;
  @ViewChildren('loginModal') loginModal: QueryList<ElementRef>;

  constructor(private authService: AuthService, private cryptoService: CryptoService,
    private router: Router,
    private localStoreService: LocalStoreService
  ) { }

  ngOnInit(): void {
    let userData = this.localStoreService.getData('userDetails');
    if (userData) {
      this.authService.userDetails = JSON.parse(userData)
    }
    if (this.authService.userDetails) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  ngAfterViewInit() {
    this.loginModal.first.nativeElement.style.display = 'block'
  }

  onLogin() {
    let request = {
      userName: this.userName,
      // todo --- move the encryption key to configuration
      password: this.cryptoService.encrypt('123456$#@$^@1ERF', this.userName)
    }
    this.authService.onLogin(request).subscribe((data: any) => {
      if (data && data.roleId > 0) {
        this.isLoginValid = true;
        this.authService.userDetails = data;
        //todo encrypt the data before saving to local storage
        this.localStoreService.setData('userDetails', JSON.stringify(data));
        this.router.navigateByUrl('/dashboard');
      }
      else {
        this.isLoginValid = false;
      }
    });
  }
}
