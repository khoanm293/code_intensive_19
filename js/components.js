const components = {
    create:`
    <div id="create-conversation-screen">
        <div id="header">Teckids Chat</div>
        <div id="create-form-container">
            <h2>Create new conversation</h2>
            <form id="create-conversation-form">
                <div class="input-wrapper">
                    <input class="input" type="text" name="conversationName" placeholder="Conversation name">
                    <div class="error-message" id="conversation-name-error-message"></div>
                </div>
                <div class="input-wrapper">
                    <input class="input" type="text" name="friendEmail" placeholder="Your friend's email">
                    <div class="error-message" id="friend-email-error-message"></div>
                </div>
                <div id="button-group">
                    <input id="create-button" class="button" type="submit" value="Create conversation">
                    <button id="cancel-create-conversation" class="secondary-button">Cancel</button>
                </div>
            </form>
        </div>
    </div>
    `,

    chat:`
    <div id="chat-screen">
        <div id="header">Teckids Chat</div>
        <div id="chat-parent">
            <div id="conversation-list">
                <div id="create-conversation">
                    <button id="create-conversation-button" class="button">+ Add new conversation</button>
                </div>
                <div id="conversation-container">
                </div>
            </div>
            <div id="chat-container">
                <div id="conversation-name">Teckids Chat</div>
                    <div id="message-container">
                </div>
                <form id="input-message">
                    <input id="message" type="text" placeholder="Enter your message..." name="Message">
                    <input id="submit" type="submit" value="Send">
                </form>
            </div>
            <div id="member-list">
                <div id="member-container"></div>
                <form id="add-member-form">
                    <div class="input-wrapper">
                        <input class="input" type="text" name="memberEmail" placeholder="Input new email..."/>
                        <div class="error-message" id="member-error-message"></div>
                    </div>
                    <div id="button-wrapper">
                        <input id="add-member-button" class="button" type="submit" value="Add member"/>
                    </div>
                </form>
            </div>
        </div>

    </div>
    `,

    message:`
    <div id="message-content" class="message-content">
        <div id="sender" class="sender"></div>
        <div id="content" class="content"></div>
    </div>
    `,

    introduction: `
    <div>
        <div id="display-name"></div>
        <div id="email-name"></div>
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

