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

                const addMemberForm = document.getElementById("add-member-form");
                if(addMemberForm){
                    addMemberForm.addEventListener("submit", (event)=>{
                        event.preventDefault();
                        const memberEmail = addMemberForm.memberEmail.value;
                        controller.validateAddMemberForm(memberEmail);
                    });
                }

                const mediaQueryResult = window.matchMedia("only screen and (max-width: 768px)");
                mediaQueryResult.addListener((mediaInfor)=>{
                    if(mediaInfor.matches){
                        model.conversations.forEach((item)=>{
                            const conversationItem = document.getElementById(item.id);
                            if(conversationItem){
                                const firstLetter = item.name.slice(0,1);
                                conversationItem.innerText = firstLetter;
                            }
                        });
                    }else{
                        model.conversations.forEach((item)=>{
                            const conversationItem = document.getElementById(item.id);
                            if(conversationItem){
                                const firstLetter = item.name;
                                conversationItem.innerText = firstLetter;
                            }
                        });
                    }
                });
                const messageInput = document.getElementById("message");
                if(messageInput){
                    messageInput.addEventListener("focus", () => {
                        const activeConversationItem = document.getElementById(model.activeConversation.id);
                        const activeConversationNoti = document.getElementById('conversation-${model.activeConversation.id}');
                        if(activeConversationNoti){
                            activeConversationItem.remove(activeConversationNoti);
                        }
                    });
                }
                // listen submit event
                const messageForm = document.getElementById('input-message');
                if (messageForm) {
                const handleMessageSubmit = (event) => {
                    // get value from input
                    event.preventDefault();
                    const message = messageForm.message.value;

                    // validate messageContent (not null)
                    if (message) {
                    model.saveMessage(message);

                    // remove old message from input
                    messageForm.message.value = '';
                    }
                };
                messageForm.addEventListener("submit", handleMessageSubmit);
                }
            }
            //load conversation, display old message
            model.loadConversations();
            //listen create event
            const createConversationButton = document.getElementById("create-conversation-button");
            if(createConversationButton){
                handleCreateClick = (_event) => {
                    view.setActiveScreen("create");
                }
                createConversationButton.addEventListener("click", handleCreateClick);
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
        case 'create':
            if(app){
                app.innerHTML = components.create;
                const cancelCreateConversation = document.getElementById("cancel-create-conversation");
                if(cancelCreateConversation){
                    handleCancelClick = (_event) => {
                        view.setActiveScreen("chat");
                    }
                    cancelCreateConversation.addEventListener("click", handleCancelClick);
                }
                const createButton = document.getElementById("create-button");
                if(createButton){
                    handleCreateConversationSubmit = () => {

                    }
                    createButton.addEventListener("submit", handleCreateConversationSubmit);
                }

                const createConversationForm = document.getElementById("create-conversation-form");
                if(createConversationForm){
                    handleCreateConversationFormSubmit = (event) => {
                        event.preventDefault();
                        const conversationName = createConversationForm.conversationName.value;
                        const friendEmail = createConversationForm.friendEmail.value;
                        const createConversationInfor = {
                            conversationName,
                            friendEmail,
                        };
                        controller.validateCreateConversation(createConversationInfor);
                    }
                    createConversationForm.addEventListener("submit", handleCreateConversationFormSubmit);
                }
            }
    }
};

view.renderConversationItem = (conversationInfor) => {
    const conversationItem = document.createElement("div");
    conversationItem.innerText = conversationInfor.name;
    conversationItem.classList.add("conversation-item");
    conversationItem.id = conversationInfor.id;

    if(conversationInfor.id === model.activeConversation.id){
        conversationItem.classList.add("active-conversation");
    }

    changeActiveConversation = (_event) => {
        const newConversationItem = document.getElementById(conversationInfor.id);
        const newConversationNoti = document.getElementById('conversation-${conversationInfor.id}');
        if(newConversationNoti){
            newConversationItem.remove(newConversationNoti);
        }
        const oldConversationItem = document.getElementById(model.activeConversation.id);
        if(oldConversationItem){
            oldConversationItem.classList.remove("active-conversation");
        }
        if(newConversationItem){
            newConversationItem.classList.add("active-conversation");
        }
        //update model.activeConversation
        model.updateActiveConversation(conversationInfor);

        const memberContainer = document.getElementById("member-container");
        if(memberContainer){
            memberContainer.innerText = "";
            model.activeConversation.users.forEach((user) => {
                const memberItem = document.createElement("div");
                memberItem.innerText = `${user}`;
                memberContainer.appendChild(memberItem);
            });
        }

        const messageContainer = document.getElementById("message-container");
        console.log(messageContainer);
        if(messageContainer){
            messageContainer.innerText = "";
        }
        model.activeConversation.messages.forEach((message) => {
            if(message.user === model.loginUser.email){
                view.sendMessage("", message.content);
            }else{
                view.sendMessage(message.user, message.content);
            }
        });
    };
    conversationItem.addEventListener("click", changeActiveConversation);

    const conversationContainer = document.getElementById("conversation-container");
    if(conversationContainer){
        conversationContainer.appendChild(conversationItem);
    }
};

view.addNotification = (conversationId) => {
    const conversation = document.getElementById(conversationId);
    if(conversation){
        //create new element
        const spanElement = document.createElement("span");
        spanElement.id = 'conversation-${conversationId}';
        spanElement.classList.add("notification");
        conversation.appendChild(spanElement);
    }
};

view.clearAddMemberConversation =() => {
    const addMemberForm = document.getElementById("add-member-form");
    const errorForm = document.getElementById("member-error-message");
    if(errorForm){
        errorForm.value = "";
    }
    if(addMemberForm){
        addMemberForm.memberEmail.value = "";
    }
};

view.addNewMember = (newMember)=>{
    const memberContainer = document.getElementById("member-container");
    if(memberContainer){
        const memberItem = document.createElement("div");
        memberItem.innerText = `${newMember}`;
        memberContainer.appendChild(memberItem);
    }
};