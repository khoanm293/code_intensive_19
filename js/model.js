const model = {};

model.loginUser = undefined;
model.activeConversation = undefined;
model.conversations = undefined;

model.loadConversations = () => {
    const handleCollectionChange = (querySnapshot) => {
        if(!model.conversations){
            const mediaQueryResult = window.matchMedia("only screen and (max-width: 768px)");
            const conversations = [];
            querySnapshot.forEach((doc)=>{
                const docInfor = doc.data();
                docInfor.id = doc.id;
                conversations.push(docInfor);
            });
            model.conversations = conversations;
            if(mediaQueryResult.matches){
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
            model.activeConversation = model.conversations[0];

            //render conversation list
            model.conversations.forEach((conversation) => {
                view.renderConversationItem(conversation);
            });
            
            const memberContainer = document.getElementById("member-container");
            if(memberContainer){
                memberContainer.innerText = "";
                model.activeConversation.users.forEach((user) => {
                    const memberItem = document.createElement("div");
                    memberItem.innerText = `${user}`;
                    memberContainer.appendChild(memberItem);
                });
            }

            model.activeConversation.messages.forEach((message) => {
                if(message.user===model.loginUser.email){
                    view.sendMessage("", message.content);
                }else{
                    view.sendMessage(message.user, message.content);
                }
            });
        }else{
            const modifiedConversations = [];
            querySnapshot.docChanges().forEach((docChange) => {
                const conversation = docChange.doc.data();
                conversation.id = docChange.doc.id;
                modifiedConversations.push(conversation);
            });
            console.log(modifiedConversations);
            modifiedConversations.forEach((modified) => {
                let isNewConversation = true;
                for(let i=0; i<model.conversations.length; i+=1){
                    if(model.conversations[i].id === modified.id){
                        if(modified.users.length === model.conversations[i].users.length){
                            model.conversations[i] = modified;
                            isNewConversation = false;
                            const newMessage = modified.messages[modified.messages.length-1];
                            if(newMessage.user!==model.loginUser.email){
                                view.addNotification(modified.id);
                            }
                            if(modified.id === model.activeConversation.id){
                                if(newMessage.user===model.loginUser.email){
                                    view.sendMessage("", newMessage.content);
                                }else{
                                    view.sendMessage(newMessage.user, newMessage.content);
                                }
                            }
                        }else{
                            model.conversations[i] = modified;
                            isNewConversation = false;
                            const newUser = modified.users[modified.users.length-1];
                            if(modified.id === model.activeConversation.id){
                                view.addNewMember(newUser);
                            }
                            view.addNotification(modified.id);
                        }
                        break;
                    }
                }
                if(isNewConversation){
                    model.conversations.push(modified);
                    view.addNotification(modifiedConversations.id);
                }
            });
        }
    }

    const db = firebase.firestore();
    //get data, display message
    db.collection("conversations").where("users", "array-contains", model.loginUser.email).onSnapshot(handleCollectionChange);
};

model.saveMessage = (messageContent) => {
    if(messageContent){
        const newMessageObj = {
            content: messageContent,
            user: model.loginUser.email,
            createdAt: new Date(),
        };
        const db = firebase.firestore();
        db.collection("conversations")
        .doc(model.activeConversation.id)
        .update({
            messages: firebase.firestore.FieldValue.arrayUnion(newMessageObj),
        });
    }
};

model.createAccount = async (registerInfor) => {
    try {
        const newUser = await firebase.auth().createUserWithEmailAndPassword(registerInfor.email, registerInfor.password);
        await firebase.auth().currentUser.updateProfile({
            displayName: registerInfor.firstName + " " + registerInfor.lastName,
        });
        firebase.auth().currentUser.sendEmailVerification();
    } catch (error) {
        console.log(error);
        view.setMessage("email-error-message", error.message);
    }
};

model.login = async (loginInfor) => {
    try {
        const loginResult = await firebase.auth().signInWithEmailAndPassword(loginInfor.email, loginInfor.password);
        if(loginResult.user.emailVerified){
            //login success
            model.loginUser = {
                id: loginResult.user.uid,
                displayName: loginResult.user.displayName,
                email: loginResult.user.email,
            };
            view.setActiveScreen("chat");
        }else{
            //email is not verified
            view.setMessage("email-error-message", "Email is not verified");
        }
    } catch (error) {
        console.log(error);
        if(error.code === "auth/user-not-found"){
            view.setMessage("email-error-message", error.message);
        }else if(error.code === "auth/wrong-password"){
            view.setMessage("password-error-message",  error.message);
        }
    }
};

model.clearActiveConversation = () => {
    model.activeConversation = undefined;
};

model.createNewConversation = (conversationInfor) =>{
    //build new conversation
    const newConversation = {
        name: conversationInfor.conversationName,
        createdAt: new Date(),
        messages: [],
        users: [model.loginUser.email, conversationInfor.friendEmail],
    };
    const db = firebase.firestore();
    db.collection("conversations").add(newConversation);
    view.setActiveScreen("chat");
};

model.updateActiveConversation = (newActiveConversation) => {
    model.activeConversation = newActiveConversation;
};

model.addConversationMember = (memberEmail) => {
    const db = firebase.firestore();
    db.collection("conversations").doc(model.activeConversation.id).update({
        users: firebase.firestore.FieldValue.arrayUnion(memberEmail),
    });
    view.clearAddMemberConversation();
}