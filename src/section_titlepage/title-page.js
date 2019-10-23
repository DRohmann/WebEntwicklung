"use strict";

import stylesheet from "./title-page.css";
import DB from "../database.js";

let _app = "";
let _db = "";

class TitlePage {
    constructor(app) {
      this._app = app;
      _app = this._app;
      _db = app._db;
    }
    onShow() {
      // Anzuzeigende HTML-Elemente ermitteln
      let section = document.querySelector("#section_titlepage").cloneNode(true);

      _db.getSong("gRkICzgt9paeGXJ54aPS").then(function(doc)
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
    }


export default TitlePage;
