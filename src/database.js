"use strict";

import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB_duHYIB9Xj3jXhShsI8cfMxDXzEzePZA",
    authDomain: "spotyourmusic-4b53a.firebaseapp.com",
    databaseURL: "https://spotyourmusic-4b53a.firebaseio.com",
    projectId: "spotyourmusic-4b53a",
    storageBucket: "spotyourmusic-4b53a.appspot.com",
    messagingSenderId: "694274207492",
    appId: "1:694274207492:web:cf9e0fcbcd61b616de6a51"
};

let _db = "";

class DB{
    constructor(){
        firebase.initializeApp(firebaseConfig);
        _db = firebase.firestore();
    }

    addSong(song){
        return _db.collection("Songs").add(song);
    }

    getAllSongs(){
        return _db.collection("Songs").get();
    }

    getSong(id){
        return _db.collection("Songs").doc(id).get();
    }

    updateSong(id, song){
        return _db.collection("Songs").doc(id).update(song);
    }

    findPossibleSongs(keyword){
        return true;
    }
}

export default DB;
