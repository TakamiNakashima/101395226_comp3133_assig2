import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  public logInForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router){}

  ngOnInit(): void {
    this.logInForm = this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }

  logIn(){
    this.http.get<any>("http://localhost:3000/signUpUsers")
    .subscribe(res => {
      const user = res.find((a:any) => {
        return a.email === this.logInForm.value.email && a.password === this.logInForm.value.password
      })
      if(user){
        alert("Login success")
        this.logInForm.reset()
        this.router.navigate(['dashboard'])
      } else{
        alert("User not found")
      }
    }, err => {
      alert("Something went wrong")
    })
  }

}
