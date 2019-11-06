"use strict";

import stylesheet from "./title-page.css";
import DB from "../database.js";

let _app = "";
let _db = "";
let youtubeIdent = "";
let _id = "";

class TitlePage {
    constructor(app, id) {
      this._app = app;
      _app = this._app;
      _db = app._db;
      _id = id;
    }
    onShow() {
      // Anzuzeigende HTML-Elemente ermitteln
      let section = document.querySelector("#section_titlepage").cloneNode(true);

      _db.getSong(_id).then(function(doc)
      {
        console.log("Song loaded");
        onFinishedLoading(doc);
      });

      return {
          className: "section_titlepage",
          topbar: section.querySelectorAll("header > *"),
          main: section.querySelectorAll("main > *"),
      };
    }

    onLoad() {
        document.getElementById("title_b_start").addEventListener("click", () => { _app._router.navigate("/") } );
        document.getElementById("title_b_edit").addEventListener("click", () => {
            _app._router.navigate("/edit/" + _id)
            document.getElementById("cell_title_value").value = document.getElementById("title_cell_title").textContent;
            document.getElementById("cell_artist_value").value = document.getElementById("title_cell_artist").textContent;
            document.getElementById("cell_genre_value").value = document.getElementById("title_cell_genre").textContent;
            document.getElementById("cell_album_value").value = document.getElementById("title_cell_album").textContent;
            document.getElementById("cell_lyrics_value").value = document.getElementById("title_cell_lyrics").textContent;
            document.getElementById("cell_youtube_value").value = youtubeIdent;
        });
      return;
    }

    onLeave(goon) {
      return true;
    }

    get title() {
      return "Dein ausgewähltes Lied";
    }
  }

  let onFinishedLoading = (doc) =>
    {
        console.log("Finished loading");
        document.getElementById("title_cell_title").textContent = doc.data().TITLE;
        document.getElementById("title_cell_artist").textContent = doc.data().ARTIST;
        document.getElementById("title_cell_genre").textContent = doc.data().GENRE;
        document.getElementById("title_cell_album").textContent = doc.data().ALBUM;
        document.getElementById("title_cell_lyrics").textContent = doc.data().SONGTEXT;
        youtubeIdent = doc.data().YTLINK;
        document.getElementById("title_frame_youtube").src = "https://www.youtube.com/embed/" + youtubeIdent;
    }


export default TitlePage;
