import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators , FormControl} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder,
              private alertController: AlertController, private toastController: ToastController, private fireAuth: AngularFireAuth) { }
  loginForm: FormGroup;
  submitted = false;
  errorMessage = '';
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  get f() { return this.loginForm.controls; }
  async presentAlert(errorMessage) {
    const alert = await this.alertController.create({
      header: 'Oops!',
      message: errorMessage,
      buttons: ['OK']
    });
    await alert.present();
  }

  facebookLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.fireAuth.auth
          .signInWithPopup(provider)
          .then(res => {
            resolve(res);
            this.router.navigate(['home']);
          }, err => {
            console.log(err);
            reject(err);
            this.loginForm.setValue({
              email: '',
              password: ''
            });
            this.submitted = false;
          });
    });
  }
  async login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    try {
      const res = await this.fireAuth.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password);
      this.router.navigate(['home']);
    } catch (err) {
      this.presentAlert('please check your details');
      this.loginForm.setValue({
        email: '',
        password: ''
      });
      this.submitted = false;
    }
  }
  /* login() {
     this.submitted = true;
     if (this.loginForm.invalid) {
       return;
     }

     try {
       const res =  this.fireAuth.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password);
       this.router.navigate(['home']);
     } catch (err) {
       this.presentAlert('please check your details');
     }
     /!*if (this.loginForm.value.password === '1234' && this.loginForm.value.email === 'bhavya@gmail.com') {
       this.router.navigate(['/', 'home']);
     } else {
       this.presentAlert('please check your details');
     }*!/
   }
 */}
