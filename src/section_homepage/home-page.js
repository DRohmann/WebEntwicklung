"use strict";

import stylesheet from "./home-page.css";
import DB from "../database.js";

let _app = "";
let _db = "";

class HomePage {
    constructor(app) {
      this._app = app;
      _app = this._app;
      _db = app._db;
    }
    onShow() {
      // Anzuzeigende HTML-Elemente ermitteln
      let section = document.querySelector("#section_homepage").cloneNode(true);

      return {
          className: "section_homepage",
          topbar: section.querySelectorAll("header > *"),
          main: section.querySelectorAll("main > *"),
      };
    }

    onLoad() {
      document.getElementById("start_b_search").addEventListener("click", () => { _app._router.navigate("/search") } );
      document.getElementById("start_b_new").addEventListener("click", () => {_app._router.navigate("/new") } );

      fillTable();
      return;
    }

    onLeave(goon) {
        document.getElementById("start_right_title_table").innerHTML = "";
        return true;
    }

    get title() {
      return "Startseite";
    }
  }

  let fillTable = () =>
    {
      let table = document.getElementById("start_right_title_table");
      _db.getTenSongsTimestamp().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
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
        });
      });
    }


export default HomePage;
