const model = {};

model.loginUser = undefined;
model.activeConversation = undefined;

const handleDocumentChange = (doc) => {
    const conversationNewData = doc.data();
    if(model.activeConversation){
        //render last message
        const lastMessage = conversationNewData.message[conversationNewData.message.length-1];
        const isOwnMessage = lastMessage.user === model.loginUser.email;
        if(isOwnMessage){
            view.sendMessage("",lastMessage.content);
        }else{
            view.sendMessage(lastMessage.user,lastMessage.content);
        }
    }else{
        //load message and display
        model.activeConversation = conversationNewData;
        for(let i=0; i<conversationNewData.message.length; i += 1){
            const message = conversationNewData.message[i];
            const isOwnMessage = message.user === model.loginUser.email;
            if(isOwnMessage){
                view.sendMessage("",message.content);
            }else{
                view.sendMessage(message.user,message.content);
            }
        }
    }
}

model.loadConversations = () => {
    const db = firebase.firestore();
    //get data, display message
    db.collection("conversations")
    .doc("oaiS5biyGK6vI0xvXiHn").onSnapshot(handleDocumentChange);
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
        .doc("oaiS5biyGK6vI0xvXiHn")
        .update({
            message: firebase.firestore.FieldValue.arrayUnion(newMessageObj),
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