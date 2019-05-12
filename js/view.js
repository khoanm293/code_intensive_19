const view = {};
view.setMessage = (elementID, message) => {
    const element = document.getElementById(elementID);
    if(element){
        element.innerText = message;
    }
};

view.sendMessage = (sender, message) => {
    const messageContent = document.createElement("div");
    messageContent.classList.add("message-content");
    if(sender){
        messageContent.classList.add("friend-message");
    }else{
        messageContent.classList.add("my-message");
    }
    const senderElement = document.createElement("div");
    senderElement.classList.add("sender");
    if (sender) {
      senderElement.innerText = sender;
    }

    const content = document.createElement("div");
    content.classList.add("content");
    content.innerText = message;

    messageContent.appendChild(senderElement);
    messageContent.appendChild(content);

    const messageContainer = document.getElementById("message-container");
    if(messageContainer){
        messageContainer.appendChild(messageContent);
    }
}

view.setActiveScreen = (componentName) => {
    const app = document.getElementById("app");
    switch(componentName){
        case 'chat':
            if(app){
                app.innerHTML = components.chat;
                // listen submit event
                const messageForm = document.getElementById('input-message');
                if (messageForm) {
                const handleMessageSubmit = (event) => {
                    // get value from input
                    event.preventDefault();
                    const message = messageForm.message.value;

                    // validate messageContent (not null)
                    if (message) {
                    view.sendMessage('', message);
                    view.sendMessage('Chat bot', message);

                    // remove old message from input
                    messageForm.message.value = '';
                    }
                };
                messageForm.addEventListener("submit", handleMessageSubmit);
                }
            }
            break;
        case 'introduction':
            if(app){
                app.innerHTML = components.introduction;
                document.getElementById("display-name").innerText = model.loginUser.displayName;
                document.getElementById("email-name").innerText = model.loginUser.email;
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