import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sig-up',
  templateUrl: './sig-up.component.html',
  styleUrls: ['./sig-up.component.css']
})
export class SigUpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const getDataFromStorage = localStorage.getItem("data");
    if (!getDataFromStorage) {
      localStorage.setItem("data", JSON.stringify([]));
    }
  }
  submitData = new FormGroup({
    userName: new FormControl("", [Validators.required]),
    rollNo: new FormControl("", [Validators.required]),
    userEmail: new FormControl("", [Validators.required, Validators.email]),
    userPassword: new FormControl("", [Validators.required]),
  })
  getData = JSON.parse(localStorage.getItem('data') || '[]');
  studentRollNoList: any[] = []
  userData() {
    if (this.getData.length === 0) {
      this.getData = [];
      this.getData.push(this.submitData.value);
      localStorage.setItem("data", JSON.stringify(this.getData));
      this.studentRollNoList.push(this.submitData.value.rollNo);
    } else {
      if (this.studentRollNoList.includes(this.submitData.value.rollNo)) {
        alert("you can't submit..!")
      } else {
        this.getData.push(this.submitData.value);
        localStorage.setItem("data", JSON.stringify(this.getData));
        this.studentRollNoList.push(this.submitData.value.rollNo)
      }
    }
    this.submitData.reset();
  }

  get Validtors() {
    return this.submitData.get("userName");
  }
  get NumberValidtors() {
    return this.submitData.get("rollNo");
  }
  get EmailValidtors() {
    return this.submitData.get("userEmail");
  }
  get PasswordValidtors() {
    return this.submitData.get("userPassword");
  }
  deleteData(id: number) {
    let localData = JSON.parse(localStorage.getItem('data') || '[]');
    const filteredLocalData = localData.filter((delItm: any) => {
      return delItm.rollNo !== id;
    });
    localStorage.setItem("data", JSON.stringify(filteredLocalData));
    this.getData = filteredLocalData
  }
  EditData(id: number) {
    let localData = JSON.parse(localStorage.getItem('data') || '[]');
    const filteredLocalData = localData.filter((delItm: any) => {
      console.log("delItm", delItm);

      const filteredLocalData = localData.filter((delItm: any) => {
        if (delItm.rollNo === id) {
          this.submitData.get("userName")?.setValue(delItm.userName);
          this.submitData.get("userEmail")?.setValue(delItm.userEmail);
          this.submitData.get("rollNo")?.setValue(delItm.rollNo);
          this.submitData.get("userPassword")?.setValue(delItm.userPassword);
          this.studentRollNoList.push(this.submitData.value.rollNo)
        }
        return delItm.rollNo !== id;
      });
      localStorage.setItem("data", JSON.stringify(filteredLocalData));
      this.getData = filteredLocalData
    });
  }
}
