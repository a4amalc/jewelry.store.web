import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FileService } from '../services/file.service';
import { saveAs } from 'file-saver';
import { LocalStoreService } from '../services/local-store.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userDetails: any;

  //TODO use angular reactive forms instead of ngModel 
  price: number = 0;
  total: number = 0;
  weight: any = 0;
  discount: any;

  @ViewChildren('preview') preview: QueryList<ElementRef>;
  @ViewChildren('previewModal') previewModal: QueryList<ElementRef>;

  constructor(private authService: AuthService,
    private fileService: FileService,
    private localStoreService:LocalStoreService
  ) { }

  ngOnInit() {
    let userData = this.localStoreService.getData('userDetails');
    if (userData) {
      this.authService.userDetails = JSON.parse(userData)
    }
    this.userDetails = this.authService.userDetails;
    if (this.userDetails && this.userDetails.roleId == 2) {
      this.authService.getAppSettings().subscribe((data: any) => {
        if (data.length > 0) {
          this.discount = parseInt(data.find(x => x.settingKey == 'DISCOUNT').value);
        }
      });
    }
    else {
      this.discount = 0;
    }
  }

  calculateTotal() {
    let totalPrice = this.price * this.weight
    let discountAmount = this.discount > 0 ? totalPrice * (this.discount / 100) : 0;
    this.total = totalPrice - discountAmount;
  }

  printToScreen() {
    this.toggleModal('block');
  }

  printToFile() {
    let request = {
      fileName: "test",
      price: this.price.toString(),
      weight: this.weight.toString(),
      discount: this.discount.toString(),
      total: this.total.toString()
    }
    this.toggleModal('none');
    this.fileService.exportAsPdf(request).subscribe((data: any) => {
      if (data) {
        var blob = new Blob([data], { type: 'application/pdf' });
        saveAs(blob, "invoice");
      }
    })
  }

  printToPaper() {
    this.fileService.print().subscribe((data: any) => {

    });
  }

  toggleModal(state) {
    this.previewModal.first.nativeElement.style.display = state
  }

}
