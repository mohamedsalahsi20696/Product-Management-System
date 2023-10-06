import { Signup } from "./signup.js"

export class ForgotPassword {
    constructor() {

        this.submitForm = document.getElementById('submitform');
        this.loginForm = document.getElementById('loginform');
        this.forgotPasswordForm = document.getElementById('forgotPasswordform');

        this.emailElement = document.getElementById('forgotEmail');
        this.phoneElement = document.getElementById('forgotphone');
        this.newPasswordElement = document.getElementById('newPassword');
        this.confirmPasswordElement = document.getElementById('confirmPassword');
        this.alertElement = document.getElementById('alertforgotpassword');

        this.confirmElement = document.getElementById('confirm');
        this.confirmElement.addEventListener('click', this.confirm.bind(this))

        this.tologinforgotElement = document.getElementById('tologinforgot');
        this.tologinforgotElement.addEventListener('click', this.tosignin.bind(this))

        this.userContainer = [];
        this.getAllUser();
        this.clearForm();
    }

    getAllUser() {
        if (localStorage.getItem('Account') != null) {
            this.userContainer = JSON.parse(localStorage.getItem('Account'));
        }
    }

    clearForm() {
        this.emailElement.value = "";
        this.phoneElement.value = "";
        this.newPasswordElement.value = "";
        this.confirmPasswordElement.value = "";
        this.alertElement.classList.add('d-none');
    }

    confirm() {
        if (this.emailElement.value === '' || this.phoneElement.value === '' ||
            this.newPasswordElement.value === '' || this.confirmPasswordElement.value === '') {
            this.alertElement.classList.remove('d-none');
            this.alertElement.innerHTML = 'All inputs is required';
            return false;
        }
        else {
            let isCorrect = false;
            let isExisting = false;
            let index = 0;

            for (let i = 0; i < this.userContainer.length; i++) {
                if (this.userContainer[i].userEmail === this.emailElement.value && this.userContainer[i].userPhone === this.phoneElement.value) {
                    isCorrect = true;
                    index = i;
                }
                else if (this.userContainer[i].userEmail === this.emailElement.value && this.userContainer[i].userPhone != this.phoneElement.value) {
                    isExisting = true;
                }
            }

            if (isCorrect) {
                if (this.newPasswordElement.value === this.confirmPasswordElement.value) {
                    let signup = new Signup();

                    if (signup.validationSignUpPassword(this.newPasswordElement.value)) {

                        this.alertElement.classList.add('d-none');
                        this.userContainer[index].userPassword = this.newPasswordElement.value;
                        localStorage.setItem('Account', JSON.stringify(this.userContainer));
                        window.location.reload();
                    }
                    else {
                        this.alertElement.classList.remove('d-none');
                        this.alertElement.innerHTML = 'password is weak';
                        return false;
                    }
                }
                else {
                    this.alertElement.classList.remove('d-none');
                    this.alertElement.innerHTML = 'new password not access in confirm password';
                }
            }
            else if (isExisting) {
                this.alertElement.classList.remove('d-none');
                this.alertElement.innerHTML = 'incorrect phone';
            }
            else {
                this.alertElement.classList.remove('d-none');
                this.alertElement.innerHTML = 'incorrect email';
            }
        }
    }

    tosignin() {
        this.loginForm.classList.remove('d-none');
        this.forgotPasswordForm.classList.add('d-none');
        this.submitForm.classList.add('d-none');

    }

}