export class Login {
    constructor() {

        this.submitForm = document.getElementById('submitform');
        this.loginForm = document.getElementById('loginform');
        this.forgotPasswordForm = document.getElementById('forgotPasswordform');
        this.emailElement = document.getElementById('signinEmail');
        this.passwordElement = document.getElementById('signinPassword');
        this.forgotPasswordElement = document.getElementById('forgotPassword');
        this.forgotPasswordElement.addEventListener('click', this.forgotPassword.bind(this))

        this.alertElement = document.getElementById('alertsignin');
        this.loginElement = document.getElementById('signin');
        this.loginElement.addEventListener('click', this.login.bind(this))

        this.tosignupElement = document.getElementById('tosignup');
        this.tosignupElement.addEventListener('click', this.tosignup.bind(this))

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
        this.passwordElement.value = "";
        this.alertElement.classList.add('d-none');
    }

    login() {
        let isExisting = false;
        let isCorrect = false;

        if (this.emailElement.value === '' || this.passwordElement.value === '') {
            this.alertElement.classList.remove('d-none');
            this.alertElement.innerHTML = 'All inputs is required';
            return false;
        }
        else {
            for (let i = 0; i < this.userContainer.length; i++) {

                if (this.userContainer[i].userEmail === this.emailElement.value && this.userContainer[i].userPassword === this.passwordElement.value) {
                    isCorrect = true;
                    localStorage.setItem('NameOfUser', JSON.stringify(this.userContainer[i].userName));
                    localStorage.setItem('GenderOfUser', JSON.stringify(this.userContainer[i].userGender));
                }
                else if (this.userContainer[i].userEmail === this.emailElement.value && this.userContainer[i].userPassword != this.passwordElement.value) {
                    isExisting = true;
                }
            }

            if (isCorrect) {
                this.alertElement.classList.add('d-none');
                console.log(JSON.parse(localStorage.getItem('NameOfUser')));
                console.log(JSON.parse(localStorage.getItem('GenderOfUser')));
                window.open('cruds.html', '_self');
            }
            else if (isExisting) {
                this.alertElement.classList.remove('d-none');
                this.alertElement.innerHTML = 'incorrect Password';
            }
            else {
                this.alertElement.classList.remove('d-none');
                this.alertElement.innerHTML = 'incorrect Email';
            }
        }
    }

    tosignup() {
        this.loginForm.classList.add('d-none');
        this.forgotPasswordForm.classList.add('d-none');
        this.submitForm.classList.remove('d-none');
    }

    forgotPassword() {
        this.submitForm.classList.add('d-none');
        this.forgotPasswordForm.classList.remove('d-none');
        this.loginForm.classList.add('d-none');
    }


}