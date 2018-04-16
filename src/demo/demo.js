(function() {
// Initialize Firebase
    var config = {
        apiKey: "AIzaSyDJpcngwBHO1ICpTq_VfXCvBYcInkerH-c",
        authDomain: "fir-261f1.firebaseapp.com",
        databaseURL: "https://fir-261f1.firebaseio.com",
        projectId: "fir-261f1",
        storageBucket: "fir-261f1.appspot.com",
        messagingSenderId: "218489544638"
    };
    firebase.initializeApp(config);

//Obtener elementos
    const preObject = document.getElementById('objeto');
    const ulList = document.getElementById('lista');

//Crear Referencias
    const dbRefObject = firebase.database().ref().child('objeto');
    const dbRefList = dbRefObject.child('habilidades');

//Sincronizar cambios objeto
    dbRefObject.on('value', snap => {
        preObject.innerText = JSON.stringify(snap.val(), null, 3);
    });

    dbRefList.on('child_added', snap => {
        const li = document.createElement('li');
        li.innerText = snap.val();
        li.id = snap.key;
        ulList.appendChild(li);
    });

    dbRefList.on('child_changed', snap => {
        const liChanged = document.getElementById('snap.key');
        liChanged.innerText = snap.val();
    });

    dbRefList.on('child_removed', snap => {
        const liToRemove = document.getElementById('snap.key');
        liToRemove.remove(this);
    });


// var holamundo = document.getElementById('objeto');
// var dbRef =firebase.database().ref().child('text');
// dbRef.on('value', snap => holamundo.innerText = snap.val());

}());
