"use strict";

import stylesheet from "./search-page.css";
import DB from "../database.js";

let _app = "";
let _db = "";

class SearchPage {
    constructor(app) {
      this._app = app;
      _app = this._app;
      _db = app._db;
    }
    onShow() {
      // Anzuzeigende HTML-Elemente ermitteln
      let section = document.querySelector("#section_searchpage").cloneNode(true);

      /*_db.getAllReceipes().then(function(querySnapshot)
      {
        console.log("Receipes loaded");
        onFinishedLoading(querySnapshot);
      });*/
      //Rauskommentiert da unnötig für uns, eher für Suchen- oder Startseite

      return {
          className: "section_searchpage",
          topbar: section.querySelectorAll("header > *"),
          main: section.querySelectorAll("main > *"),
      };
    }

    onLoad() {
        if (!document.getElementById("search_bar").getAttribute('hasEventListener')) {
      document.getElementById("search_bar").addEventListener("keypress", (event) => {
          document.getElementById("search_bar").setAttribute('hasEventListener', true);
          if (event.key == 'Enter') {
              console.log("Enter pressed");
              searchTitle();
          }
      } );
  }
      return;
    }

    onLeave(goon) {
      document.getElementById("search_bar").value = "";
        document.getElementById("search_table").innerHTML = "";
      return true;
    }

    get title() {
      return "Suche ein Lied";
    }
  }

  let searchTitle = () => {
    let input = document.getElementById("search_bar").value.toUpperCase();
    let table = document.getElementById("search_table");
    while(table.firstChild) {
        table.removeChild(table.firstChild);
    }
    table.innerHTML = "";
    _db.getAllSongs().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        if (doc.data().TITLE.toUpperCase().includes(input) ||
            doc.data().ARTIST.toUpperCase().includes(input) ||
            doc.data().ALBUM.toUpperCase().includes(input))
        {
            var row = document.createElement("TR");
            var title = document.createElement("TD");
            title.appendChild(document.createTextNode(doc.data().TITLE));
            row.appendChild(title);
            var artist = document.createElement("TD");
            artist.appendChild(document.createTextNode(doc.data().ARTIST));
            row.appendChild(artist);
            var album = document.createElement("TD");
            album.appendChild(document.createTextNode(doc.data().ALBUM));
            row.addEventListener("click", () => { _app._router.navigate("/title/" + doc.id) } );
            row.appendChild(album);
            table.appendChild(row)
        }
      });
    });
  }

export default SearchPage;
