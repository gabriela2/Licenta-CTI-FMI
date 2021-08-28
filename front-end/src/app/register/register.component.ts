import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorsFromBackend: string[] = [];
  model: any;


  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService,
    private formBuider: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuider.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern("^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])|(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^a-zA-Z0-9])|(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])).{8,}$")]],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern("^(07[0-9]{8}|02[0-9]{8}|03[0-9]{8})$")]],
      isOrganisation: ['nu'],
      organizationIdentificationNumber: ['-', Validators.required],
      houseNumber: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      country: ['', Validators.required],
      zipCode: ['', Validators.required]
    })
  }
  register() {
    console.log(this.registerForm.value);
    let model = {
      email: this.registerForm.get('email').value,
      username: this.registerForm.get('username').value,
      password: this.registerForm.get('password').value,
      lastName: this.registerForm.get('lastName').value,
      firstName:this.registerForm.get('firstName').value,
      phoneNumber: this.registerForm.get('phoneNumber').value,
      isOrganisation: this.registerForm.get('isOrganisation').value ==='da'?true:false,
      organizationIdentificationNumber: this.registerForm.get('isOrganisation').value==='da'? this.registerForm.get('organizationIdentificationNumber').value: null,
      houseNumber: this.registerForm.get('houseNumber').value,
      street: this.registerForm.get('street').value,
      city: this.registerForm.get('city').value,
      district: this.registerForm.get('district').value,
      country: this.registerForm.get('country').value,
      zipCode: this.registerForm.get('zipCode').value,
    }
    this.authService.register(model).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('/login');

    }, error => {
      console.log(error);
      this.toastrService.error(error.error);
    })
  }
  cancel() {
    this.router.navigateByUrl('/login');

  }



}
