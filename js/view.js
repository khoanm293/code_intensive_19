const view = {};
view.setMessage = (elementID, message) => {
    const element = document.getElementById(elementID);
    if(element){
        element.innerText = message;
    }
};
view.setActiveScreen = () => {
    // const app = document.getElementById("app");
    // if(app){
    //     app.innerHTML = components.index;
    // }

    // register submit listener
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

    // login submit listner
    // const loginForm = document.getElementById("form-wrapper");
    // if(loginForm){
    //     const handleSubmit = (event) =>{
    //         event.preventDefault();
    //         const email = loginForm.email.value;
    //         const password = loginForm.password.value;

    //         const loginInfor = {
    //             email,
    //             password,
    //         };
    //         controller.validateLoginForm(loginInfor);
    //     };
    //     loginForm.addEventListener("submit", handleSubmit);
    // }
};