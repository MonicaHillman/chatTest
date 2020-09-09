import firebase from "firebase";

class Fire {
constructor() {
this.init()
this.checkAuth()
}

init = () => {
    if (!firebase.apps.lenght) {
        firebase.initializeApp({
            apiKey: "AIzaSyAOD7qsYvq_Hf6oPixSJPENkzWfpEH30DM",
            authDomain: "chattest-ad5d4.firebaseapp.com",
            databaseURL: "https://chattest-ad5d4.firebaseio.com",
            projectId: "chattest-ad5d4",
            storageBucket: "chattest-ad5d4.appspot.com",
            messagingSenderId: "1063156270066",
            appId: "1:1063156270066:web:b195f6f04b37e34554616b",
            measurementId: "G-3NMPB4ZZM1"
        })
    }
};

checkAuth = () => {
    firebase.auth().onAuthStateChanged(user=>{
        if (!user) {
            firebase.auth().signInAnonymously();
        }
    });
};

send = messages => {
    messages.forEach(item => {
        const message = {
            text: item.text,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: item.user
        }
        this.db.push(message)
        })
};

parse = message => {
    const {user, text, timestamp} = message.val()
    const {key: _id} = message
    const createdAt = new Date(timestamp)

    return {
        _id,
        createdAt,
        text,
        user
    };
};

get = callback => {
    this.db.on('child_added', snapshot => callback(this.parse(snapshot)));    
};

off() {
    this.db.off()
}

get db() {
    return firebase.database().ref("messages");
}

get uid() {
    return (firebase.auth().currentUser || {}).uid;
}

}

export default new Fire();