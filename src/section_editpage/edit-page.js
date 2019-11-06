"use strict";

import stylesheet from "./edit-page.css";
import DB from "../database.js";

let _app = "";
let _db = "";
let _newFlag = "";
let _id = "";

class EditPage {
  constructor(app, newFlag, id) {
    this._app = app;
    _app = this._app;
    _db = app._db;
    _newFlag = newFlag;
    _id = id;
  }

  onShow() {
    // Anzuzeigende HTML-Elemente ermitteln
    let section = document.querySelector("#section_editpage").cloneNode(true);

    return {
        className: "section_editpage",
        topbar: section.querySelectorAll("header > *"),
        main: section.querySelectorAll("main > *"),
    };
  }

  onLoad() {
    console.log(_id);
    document.getElementById("edit_b_safe").addEventListener("click", safeEventListener);
    document.getElementById("edit_b_abort").addEventListener("click", () => { _app._router.navigate("/") } );
    return;
  }

  onLeave(goon) {
      document.getElementById("cell_title_value").value = "";
      document.getElementById("cell_artist_value").value = "";
      document.getElementById("cell_genre_value").value = "";
      document.getElementById("cell_album_value").value = "";
      document.getElementById("cell_lyrics_value").value = "";
      document.getElementById("cell_youtube_value").value = "";
    return true;
  }

  get title() {
    return "Füge ein neues Lied hinzu";
  }
}

let safeEventListener = (event) =>
  {
      let songTitel = document.getElementById("cell_title_value").value;
      let songArtist = document.getElementById("cell_artist_value").value;
      let songGenre = document.getElementById("cell_genre_value").value;
      let songAlbum = document.getElementById("cell_album_value").value;
      let songLyrics = document.getElementById("cell_lyrics_value").value;
      let songYT = document.getElementById("cell_youtube_value").value;
      let songTime = new Date();

      if(songTitel=="" || songArtist==""){
          alert("Bitte Titel und Interpreten eingeben!");
          document.getElementById("cell_title_value").value='';
          document.getElementById("cell_artist_value").value='';
          return false;
      }else{

      let song = {
          "TITLE": songTitel,
          "ARTIST": songArtist,
          "GENRE": songGenre,
          "ALBUM": songAlbum,
          "SONGTEXT": songLyrics,
          "YTLINK": songYT,
          "TIMESTAMP": songTime
      };

      console.log(song);

      if (_newFlag) {
          _db.addSong(song).then(function(doc) {
              _app._router.navigate("/title/" + doc.id);
          });
      }else{
          _db.updateSong(_id ,song).then(() => {
              _app._router.navigate("/title/" + _id);
          });
      }
  }
  }

export default EditPage;
