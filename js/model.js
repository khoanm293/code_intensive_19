const model = {};

model.loginUser = undefined;

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
            view.setActiveScreen("introduction");
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