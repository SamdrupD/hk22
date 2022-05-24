import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';

import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-user-profile-modal',
  templateUrl: './user-profile-modal.component.html',
  styleUrls: ['./user-profile-modal.component.scss']
})
export class UserProfileModalComponent implements OnInit {

  ngOnInit(): void {
    this.api.getUsersList().subscribe((res: any) => {
      res.forEach((ans: any) => {
        if(ans.id === '0uv4r4jLry1UEtW2XAJz'){
          this.userEditForm.patchValue(ans);
        }
      });
    });
    this.setForm();
  }

  gender = new FormControl()

  genderList: string[] = ['male', 'female'];

  userEditForm!: FormGroup;
   attachment = new FormControl();
     campaignOne!: FormGroup;
  campaignTwo!: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<UserProfileModalComponent>, private api: ApiService) {

   const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16)),
    });

    this.campaignTwo = new FormGroup({
      start: new FormControl(new Date(year, month, 15)),
      end: new FormControl(new Date(year, month, 19)),
    });
     }

  setForm(): void {
    this.userEditForm = this.fb.group({
       name: [''],
       address: [''],
       email: [''],
       password: [''],
       phone:['']
    });
  }

  addJobPosting() {
    const payLoad = {
     ...this.userEditForm.value,
     gender: this.gender.value
    }
    this.close(payLoad);
    // console.log(this.jobPostingForm.value);
    // debugger
  }

  selectFiles(files: any) {
     this.attachment.setValue(files.files);
  }

  close(payload?: any){
   this.dialogRef.close(payload);
  }

}