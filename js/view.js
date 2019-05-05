const view = {};
view.setMessage = (elementID, message) => {
    const element = document.getElementById(elementID);
    if(element){
        element.innerText = message;
    }
};
view.setActiveScreen = (componentName) => {
    const app = document.getElementById("app");
    switch(componentName){
        case 'introduction':
            app.innerHTML = components.introduction;
            if(app){
                app.innerHTML = components.introduction;
            }
            break;
        case 'register':
            app.innerHTML = components.register;

            const loginButton = document.getElementById("login-button");
            if(loginButton){
                const handleLoginClick = (_event) => {
                    view.setActiveScreen("login");
                }
                loginButton.addEventListener("click", handleLoginClick);
            }
            const registerForm = document.getElementById("form-wrapper");
            if(registerForm){
                const handleSubmit = (event) => {
                    event.preventDefault();

                    // get input value
                    const firstName = registerForm.firstName.value;
                    const lastName = registerForm.lastName.value;
                    const email = registerForm.email.value;
                    const password = registerForm.password.value;
                    const confirmPassword = registerForm.confirmPassword.value;

                    const registerInfor = {
                        firstName,
                        lastName,
                        email,
                        password,
                        confirmPassword,
                    };

                controller.validateRegisterForm(registerInfor);
                };
                registerForm.addEventListener("submit", handleSubmit);
            }
            break;
        case 'login':
            app.innerHTML = components.login;

            const createAccountButton = document.getElementById("create-account-button");
            if(createAccountButton){
                handleCreatAccountClick = (_event) => {
                    view.setActiveScreen("register");
                };
                createAccountButton.addEventListener("click", handleCreatAccountClick);
            }

            const loginForm = document.getElementById("form-wrapper");
            if(loginForm){
                const handleSubmit = (event) =>{
                    event.preventDefault();
                    const email = loginForm.email.value;
                    const password = loginForm.password.value;

                    const loginInfor = {
                        email,
                        password,
                    };
                    controller.validateLoginForm(loginInfor);
                };
                loginForm.addEventListener("submit", handleSubmit);
            }
            break;
    }
};