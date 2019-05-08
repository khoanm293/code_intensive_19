window.onload = () => {
    //init Firebase
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyBWLwiav-m62IMfbr8-dF519G3yK2dOjZE",
      authDomain: "khoanguyen-ci19-mindx.firebaseapp.com",
      databaseURL: "https://khoanguyen-ci19-mindx.firebaseio.com",
      projectId: "khoanguyen-ci19-mindx",
      storageBucket: "khoanguyen-ci19-mindx.appspot.com",
      messagingSenderId: "867649746329",
      appId: "1:867649746329:web:ddbca835c122800e"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    console.log(firebase.apps.length);

    //login screen
    view.setActiveScreen("login");
};