const components = {
    introduction: `
    <div>
        Hello World!
    </div>
    `,

    register : `
    <div id="register-screen">
        <div id="register-screen-content">
            <div id="logo">
                <h1>Teckids Chat</h1>
            </div>
            <div id="register-form">
                <form id="form-wrapper">
                    <div id="name-wrapper">
                        <div class="input-wrapper">
                            <input class="input" name="firstName" placeholder="First Name"/>
                            <div class="error-message" id="firstName-error-message"></div>
                        </div>
                        <div class="input-wrapper">
                            <input class="input" type="text" name="lastName" placeholder="Last Name"/>
                            <div class="error-message" id="lastName-error-message"></div>
                        </div>
                    </div>
                    <div class="input-wrapper">
                        <input class="input" type="email" name="email" placeholder="Email adress"/>
                        <div class="error-message" id="email-error-message"></div>
                    </div>
                    <div class="input-wrapper">
                        <input class="input" type="password" name="password" placeholder="Password"/>
                        <div class="error-message" id="password-error-message"></div>
                    </div>
                    <div class="input-wrapper">
                        <input class="input" type="password" name="confirmPassword" placeholder="Confirm password">
                        <div class="error-message" id="confirmPassword-error-message"></div>
                    </div>
                    <div id="form-footer">
                        <span id="login-button">You already have an account! Login</span>
                        <button class="button" type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
    </div>   
    `,
    
    login: `
    <div id="login-screen">
        <div id="login-screen-content">
            <div id="logo">
                <h1>Teckids Chat</h1>
            </div>
            <div id="login-form">
                <form id="form-wrapper">
                    <div class="input-wrapper">
                        <input class="input" type="email" name="email" placeholder="Email address">
                        <div class="error-message" id="email-error-message"></div>
                    </div>
                    <div class="input-wrapper">
                        <input class="input" type="password" name="password" placeholder="Password">
                        <div class="error-message" id="password-error-message"></div>
                    </div>
                    <div id="form-footer">
                        <span id="create-account-button">Create an account</span>
                        <button class="button" type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `,
};

