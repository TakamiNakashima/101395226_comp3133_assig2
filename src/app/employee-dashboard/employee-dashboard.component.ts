import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Employee } from './employee-dashboard.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent implements OnInit{
  
  formValue !: FormGroup;
  employee : Employee = new Employee();
  empData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formBuilder: FormBuilder, private api: ApiService){  }

  ngOnInit(): void{
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      gender: [''],
      salary: ['']
    })
    this.getAllEmps();
  }

  clickAddBtn(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  addNewEmpDetails(){
    this.employee.firstName = this.formValue.value.firstName;
    this.employee.lastName = this.formValue.value.lastName;
    this.employee.email = this.formValue.value.email;
    this.employee.gender = this.formValue.value.gender;
    this.employee.salary = this.formValue.value.salary;

    this.api.addNewEmp(this.employee)
    .subscribe(res => {
      console.log(res);
      alert("Employee added successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmps();
    },
    err => {
      alert("Something went wrong")
    })
  }

  getAllEmps(){
    this.api.getAllEmps()
    .subscribe(res => {
      this.empData = res;
    })
  }

  deleteEmpById(row: any){
    this.api.deleteEmpById(row.id)
    .subscribe(res => {
      alert("Employee deleted")
      this.getAllEmps();
    })
  }

  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;

    this.employee.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName)
    this.formValue.controls['lastName'].setValue(row.lastName)
    this.formValue.controls['email'].setValue(row.email)
    this.formValue.controls['gender'].setValue(row.gender)
    this.formValue.controls['salary'].setValue(row.salary)
  }

  updateEmpDetails(){
    this.employee.firstName = this.formValue.value.firstName;
    this.employee.lastName = this.formValue.value.lastName;
    this.employee.email = this.formValue.value.email;
    this.employee.gender = this.formValue.value.gender;
    this.employee.salary = this.formValue.value.salary;

    this.api.updateEmpById(this.employee, this.employee.id)
    .subscribe(res => {
      alert("Updated successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmps();
    })
  }

}
