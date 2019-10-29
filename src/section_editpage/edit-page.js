"use strict";

import stylesheet from "./edit-page.css";
import DB from "../database.js";

let _app = "";
let _db = "";

class EditPage {
  constructor(app) {
    this._app = app;
    _app = this._app;
    _db = app._db;
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
    document.getElementById("edit_b_safe").addEventListener("click", safeEventListener);
    document.getElementById("edit_b_abort").addEventListener("click", () => { _app._router.navigate("/") } );
    return;
  }

  onLeave(goon) {
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
      let songYT = "https://www.youtube.com/embed/" + document.getElementById("cell_youtube_value").value;

      let song = {
          "TITEL": songTitel,
          "ARTIST": songArtist,
          "GENRE": songGenre,
          "ALBUM": songAlbum,
          "SONGTEXT": songLyrics,
          "YTLINK": songYT
      };

      console.log(song);
      _db.addSong(song).then(() => {
          _app._router.navigate("/title");

      });
  }

export default EditPage;
