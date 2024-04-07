import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  public signUpForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router){  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      username: [''],
      email: [''],
      password: ['']
    })
  }

  signUp(){
    this.http.post<any>("http://localhost:3000/signUpUsers", this.signUpForm.value)
    .subscribe(res => {
      alert("Signed up successfully");
      this.signUpForm.reset();
      this.router.navigate(['login']);
    }, err => {
      alert("Something went wrong")
    })
  }

}
