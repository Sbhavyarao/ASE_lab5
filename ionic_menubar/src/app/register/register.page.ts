import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators , FormControl} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder,
              private alertController: AlertController, private toastController: ToastController, private fireAuth: AngularFireAuth) { }
  registerForm: FormGroup;
  submitted = false;
  errorMessage = '';
  toast: any;
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  get f() { return this.registerForm.controls; }
  async presentAlert(errorMessage) {
    const alert = await this.alertController.create({
      header: 'Oops!',
      message: errorMessage,
      buttons: ['OK']
    });
    await alert.present();
  }

  presentToast() {
    this.toast = this.toastController.create({
      message: 'Registered successfully',
      duration: 6000,
      position: 'bottom',
      color: 'light'
    }).then((toastData) => {
      toastData.present();
    });
  }
  HideToast() {
    this.toast = this.toastController.dismiss();
  }
  /*register() {
    this.submitted = true;
    try {
      const result = this.fireAuth.auth.createUserWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password)
      this.presentToast();
      this.router.navigate(['login']);
    } catch (err) {
      console.log('error : ', err);
    }
  }
*/
  register() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    /*try {
      const res =  this.fireAuth.auth.signInWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password);
      this.router.navigate(['login']);
      this.presentToast();
    } catch (err) {
      this.presentAlert(err.message);
    }*/
    try {
      this.fireAuth.auth.createUserWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password).then(() => {
        this.presentToast();
        this.router.navigate(['login']);
      }).catch(() => {
        this.presentAlert('invalid email/password should be of 6 characters');
        this.registerForm.setValue({
          name: '',
          email: '',
          password: ''
        });
        this.submitted = false;
      });
    } catch (e) {
      console.error('error: ', e);
    }
  }
}
