(function () {
// Initialize Firebase
    const config = {
        apiKey: "AIzaSyDJpcngwBHO1ICpTq_VfXCvBYcInkerH-c",
        authDomain: "fir-261f1.firebaseapp.com",
        databaseURL: "https://fir-261f1.firebaseio.com",
        projectId: "fir-261f1",
        storageBucket: "fir-261f1.appspot.com",
        messagingSenderId: "218489544638"
    };
    firebase.initializeApp(config);


//Obtener elementos
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');
    const twitTimeline = document.getElementById('twitTimeline');
    const twitPost = document.getElementById('twitPost');
    const twitNewPost = document.getElementById('twitNewPost');
    const twitLogin = document.getElementById('twitLogin');
    const alert = document.getElementById('alert');
    const btnPerfil = document.getElementById('btnPerfil');
    const btnEmail = document.getElementById('btnEmail');
    const btnNewPost = document.getElementById('btnNewPost');
    const btnDestacados = document.getElementById('btnDestacados');
    const btnTimeline = document.getElementById('btnTimeline');


// Agregar Evento login
    btnLogin.addEventListener('click', e => {
        alert.classList.add('d-none');
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        // Sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => {
            alert.classList.remove('d-none');
            alert.innerHTML = e.message;
        });
    });


// Agregar Evento signup
    btnSignUp.addEventListener('click', e => {
        alert.classList.add('d-none');
        // Obtener email y pass
        // TODO: comprobar que el email sea real
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        // Sign in
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => {
            alert.classList.remove('d-none');
            alert.innerHTML = e.message;
        });
    });

    // Agregar Evento logout
    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
    });
    btnTimeline.addEventListener('click', firebaseUser => {
        oPage.goToTimeline(firebaseUser);
    });

    btnNewPost.addEventListener('click', firebaseUser => {
        oPage.goToNewPost(firebaseUser);
    });

    // Agregar un listener en tiempo real
    firebase.auth().onAuthStateChanged(firebaseUser => oPage.goToTimeline(firebaseUser));

    function writeUserData(userId, name, email, imageUrl) {
        firebase.database().ref('users/' + userId).set({
            username: name,
            email: email,
            profile_picture : imageUrl
        });
    }
}());

var oPage = {
    user : null,
    goToTimeline: function (firebaseUser) {
        if(oPage.userIsLoguedin(firebaseUser)){
            btnPerfil.classList.remove('d-none');
            btnLogout.classList.remove('d-none');
            btnEmail.innerHTML = firebaseUser.email;
            twitTimeline.classList.remove('d-none');
            twitPost.classList.add('d-none');
            twitNewPost.classList.add('d-none');

        }
    },
    goToNewPost: function(firebaseUser){
        if(oPage.userIsLoguedin(firebaseUser)){
            twitTimeline.classList.add('d-none');
            twitPost.classList.add('d-none');
            twitNewPost.classList.remove('d-none');
        }
    },
    goToPost: function (firebaseUser) {
        if(oPage.userIsLoguedin(firebaseUser)){
            twitTimeline.classList.add('d-none');
            twitPost.classList.remove('d-none');
        }
    },
    userIsLoguedin: function (firebaseUser) {
        if(firebaseUser){
            twitLogin.classList.add('d-none');
            this.user = firebaseUser;
            return true
        } else {
            console.log('no logueado');
            btnPerfil.classList.add('d-none');
            btnLogout.classList.add('d-none');
            twitNewPost.classList.add('d-none');
            twitTimeline.classList.add('d-none');
            twitLogin.classList.remove('d-none');

        }
    },
};