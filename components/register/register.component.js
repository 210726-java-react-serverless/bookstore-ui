import { ViewComponent } from '../view.component.js';
import env from '../../util/env.js';

RegisterComponent.prototype = new ViewComponent('register');
function RegisterComponent() {

    let firstNameFieldElement;
    let lastNameFieldElement;
    let emailFieldElement;
    let usernameFieldElement;
    let passwordFieldElement;
    let registerButtonElement;
    let errorMessageElement;

    let firstName = '';
    let lastName = '';
    let email = '';
    let username = '';
    let password = '';

    function updateFirstName(e) {
        firstName = e.target.value;
    }

    function updateLastName(e) {
        lastName = e.target.value;
    }

    function updateEmail(e) {
        email = e.target.value;
    }

    function updateUsername(e) {
        username = e.target.value;
    }

    function updatePassword(e) {
        password = e.target.value;
    }

    function updateErrorMessage(errorMessage) {
        if (errorMessage) {
            errorMessageElement.removeAttribute('hidden');
            errorMessageElement.innerText = errorMessage;
        } else {
            errorMessageElement.setAttribute('hidden', 'true');
            errorMessageElement.innerText = '';
        }
    }

    function register() {
        if (!firstName || !lastName || !email || !username || !password) {
            updateErrorMessage("You must provide all information to submit registration");
            return;
        } else {
            updateErrorMessage('');
        }

        let user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: password
        };

        let status = 0;

        fetch(`${env.apiUrl}/users`, {
            method: `POST`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(resp => {
            status = resp.status;
            return resp.json();
        }).then(data => {
            console.log(data);
        })
    }

    this.render = function() {
        RegisterComponent.prototype.injectStylesheet();
        RegisterComponent.prototype.injectTemplate(() => {
            firstNameFieldElement = document.getElementById('register-form-first-name');
            lastNameFieldElement = document.getElementById('register-form-last-name');
            emailFieldElement = document.getElementById('register-form-email');
            usernameFieldElement = document.getElementById('register-form-username');
            passwordFieldElement = document.getElementById('register-form-password');
            registerButtonElement = document.getElementById('register-form-button');
            errorMessageElement = document.getElementById('error-msg');

            firstNameFieldElement.addEventListener('keyup',updateFirstName);
            lastNameFieldElement.addEventListener('keyup',updateLastName);
            emailFieldElement.addEventListener('keyup',updateEmail);
            usernameFieldElement.addEventListener('keyup',updateUsername);
            passwordFieldElement.addEventListener('keyup',updatePassword);
            registerButtonElement.addEventListener('click',register);
        });
    }

}

export default new RegisterComponent();