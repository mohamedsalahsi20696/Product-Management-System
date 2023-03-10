export class Signup {
    constructor() {

        this.submitForm = document.getElementById('submitform');
        this.loginForm = document.getElementById('loginform');
        this.forgotPasswordForm = document.getElementById('forgotPasswordform');

        this.nameElement = document.getElementById('signupName');
        this.emailElement = document.getElementById('signupEmail');
        this.passwordElement = document.getElementById('signupPassword');
        this.phoneElement = document.getElementById('signupphone');
        this.malegenderElement = document.getElementById('signupmalegender');
        this.femalegenderElement = document.getElementById('signupfemalegender');
        this.alertElement = document.getElementById('alertsignup');
        this.signupElement = document.getElementById('signup');
        this.signupElement.addEventListener('click', this.addUser.bind(this))

        this.tologinElement = document.getElementById('tologin');
        this.tologinElement.addEventListener('click', this.tologin.bind(this))

        this.userContainer = [];
        this.getAllUser();
        this.clearForm();
        // localStorage.clear();
    }

    getAllUser() {
        if (localStorage.getItem('Account') != null) {
            this.userContainer = JSON.parse(localStorage.getItem('Account'));
        }
    }

    clearForm() {
        this.nameElement.value = "";
        this.emailElement.value = "";
        this.passwordElement.value = "";
        this.phoneElement.value = "";
        this.malegenderElement.checked = false;
        this.femalegenderElement.checked = false;
        this.alertElement.classList.add('d-none');
    }

    addUser() {
        if (this.nameElement.value === '' ||
            this.emailElement.value === '' ||
            this.passwordElement.value === '' ||
            this.phoneElement.value === '' ||
            (this.malegenderElement.checked === false && this.femalegenderElement.checked === false)) {

            this.alertElement.classList.remove('d-none');
            this.alertElement.innerHTML = 'All inputs is required';
            return false;
        }
        else {
            if (this.validationSignUp()) {

                let user = {
                    userName: this.nameElement.value,
                    userEmail: this.emailElement.value,
                    userPassword: this.passwordElement.value,
                    userPhone: this.phoneElement.value,
                    userGender: this.malegenderElement.checked === true ? 'male' : 'female',
                }

                this.userContainer.push(user);
                localStorage.setItem('Account', JSON.stringify(this.userContainer));
                window.location.reload();
            }
        }
    }

    validationSignUp() {
        let validateEmail = this.validationSignUpEmail(this.emailElement.value);

        if (validateEmail) {
            let validatePassword = this.validationSignUpPassword(this.passwordElement.value);
            if (validatePassword) {
                let validatePhone = this.validationSignUpPhone(this.phoneElement.value);
                if (validatePhone) {
                    return true;
                }
            }
        }
        else
            return false;
    }

    validationSignUpEmail(term) {

        if (this.userContainer.length > 0) {
            let isExisting = false;

            for (let i = 0; i < this.userContainer.length; i++) {
                if (this.userContainer[i].userEmail === term) {
                    isExisting = true;
                }
            }

            if (isExisting) {
                this.alertElement.classList.remove('d-none');
                this.alertElement.innerHTML = 'email already exists';
                return false;
            }
        }
        return true;
    }

    validationSignUpPassword(term) {
        let regx = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/ig;

        if (regx.test(term)) {
            this.alertElement.classList.add('d-none');
            return true;
        }
        else {
            this.alertElement.classList.remove('d-none');
            this.alertElement.innerHTML = 'password is weak ';
            return false;
        }
    }

    validationSignUpPhone(term) {
        let regx = /^01[0125]\d{8}$/ig;

        if (regx.test(term)) {
            this.alertElement.classList.add('d-none');
            return true;
        }
        else {
            this.alertElement.classList.remove('d-none');
            this.alertElement.innerHTML = 'phone not valid';
            return false;
        }
    }

    tologin() {
        console.log('in sign up tologin')

        this.submitForm.classList.add('d-none');
        this.forgotPasswordForm.classList.add('d-none');
        this.loginForm.classList.remove('d-none');
    }
}