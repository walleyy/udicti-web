import { Component, OnInit } from '@angular/core';
import {AccountsService} from '../../service/accounts.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  accounts = [
    { namee: 'amina' },
    { namee: 'abdul'},
    { namee: 'anna' } ,
    ];
  newLink: string;
  editData: [];
  accountFormGroup: FormGroup;
  editClicked = false;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountsService
  ) {
    // this.getAllAccounts();
    // this.initiateForm();
    // this.print();
  }

  ngOnInit() {
  }

  private initiateForm() {
    this.accountFormGroup = this.formBuilder.group({
      heading: ['', [Validators.required, Validators.nullValidator]],
      details: ['', [Validators.required, Validators.nullValidator]]
    });
  }
print() {
    console.log(this.accounts);
}
  // private getAllAccounts() {
  //   this.accountService.listAccount().then(value => {
  //     this.accounts = value._embedded.accounts;
  //   }).catch(reason => {
  //     alert('Amegoma kuleta data');
  //   });
  // }

  editAccount(pageId: string, link: string) {
    this.editClicked = true;
    const el = document.getElementById(pageId);
    el.scrollIntoView();
    this.newLink = link.replace('ide:3000', 'api.udicti.tk:8000/ide/api');
    this.accountService.fetchAccount(this.newLink).then(value => {
      console.log(value);
      this.editData = value;
    }).catch(reason => {
      alert('Amegoma kuleta data');
    });
  }

  delete(link: string) {
    this.editClicked = false;
    this.newLink = link.replace('ide:3000', 'api.udicti.tk:8000/ide/api');
    if (confirm('Are you sure to delete ')) {
      this.accountService.deleteAccount(this.newLink).then(value => {
        // this.getAllAccounts();
      }).catch(error => {
        alert('Failed to add data');
      });
    }
  }

  update() {
    this.editClicked = false;
    this.accountService.updateAccount(this.newLink, this.accountFormGroup.value).then(value => {
      this.accountFormGroup.reset();
      // this.getAllAccounts();
    }).catch(error => {
      alert('Failed to add data');
    });
  }

  cancel() {
    this.accountFormGroup.reset();
    this.editClicked = false;
  }

  scroll(id: string) {
    const el = document.getElementById(id);
    el.scrollIntoView();
  }
}
