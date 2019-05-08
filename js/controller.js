const controller = {};
controller.validateRegisterForm = (registerInfor) =>{
    const {firstName, lastName, email, password, confirmPassword} = registerInfor;

    // validate input name
    if(!firstName){
        view.setMessage("firstName-error-message", "Please input first name");
    }else{
        view.setMessage("firstName-error-message", "");
    }

    if(!lastName){
        view.setMessage("lastName-error-message", "Please input last name");
    }else{
        view.setMessage("lastName-error-message", "");
    }

    // validate input email
    const emailRegex = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
    if(emailRegex.test(email)){
        view.setMessage("email-error-message", "");
    }else{
        view.setMessage("email-error-message", "Invalid email address");
    }

    //validate input password
    if(!password){
        view.setMessage("password-error-message", "Please input password");
    }else if(password.length < 6){
        view.setMessage("password-error-message", "Password should be greater than 6 letters");
    }else{
        view.setMessage("password-error-message", "");
    }

    if(!confirmPassword){
        view.setMessage("confirmPassword-error-message", "Please input confirm password");
    }else if(confirmPassword !== password){
        view.setMessage("confirmPassword-error-message", "Confirm Password didn't match");
    }else{
        view.setMessage("confirmPassword-error-message", "");
    }

    //call model to create user
    if(firstName && lastName && email && password && emailRegex.test(email) && password === confirmPassword){
        model.createAccount(registerInfor);
    }
}
controller.validateLoginForm = (loginInfor) => {

    const {email, password} = loginInfor;
    //validate input email
    const emailRegex = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
    if(emailRegex.test(email)){
        view.setMessage("email-error-message", "");
    }else{
        view.setMessage("email-error-message", "Invalid email address");
    }
    //validate input password
    if(!password){
        view.setMessage("password-error-message", "Please input password");
    }else if(password.length < 6){
        view.setMessage("password-error-message", "Password should be greater than 6 letters");
    }else{
        view.setMessage("password-error-message", "");
    }

    //call model to login user
    if(email && password && emailRegex.test(email)){
        model.login(loginInfor);
    }

}