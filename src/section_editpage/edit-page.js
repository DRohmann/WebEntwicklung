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
    let section = document.querySelector("section_editpage").cloneNode(true);

    /*_db.getAllReceipes().then(function(querySnapshot)
    {
      console.log("Receipes loaded");
      onFinishedLoading(querySnapshot);
    });*/
    //Rauskommentiert da unnötig für uns, eher für Suchen- oder Startseite

    return {
        className: "section_editpage",
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
    return "Füge ein neues Lied hinzu";
  }
}

let onFinishedLoading = (receipes) =>
  {
    /*receipes.forEach(function(doc) {
      let list = document.getElementById("receipe-list");
      let table = document.getElementById("receipe-table");
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data().name);

      let receipe= document.getElementById("dummy").cloneNode(true);
      receipe.setAttribute("id", "receipe_" + doc.id);
      table.appendChild(receipe);

      document.querySelectorAll("#receipe_" + doc.id + " > .name")[0].textContent = doc.data().name;
      let buttons = document.querySelectorAll("#receipe_" + doc.id +" > .links a");
      buttons[0].setAttribute("href", "/receipe/show/" + doc.id);
      buttons[1].setAttribute("href", "/receipe/edit/" + doc.id);
      buttons[2].setAttribute("href", "/receipe/delete/" + doc.id);*/

      /*Rauskommentiert da unnötig für uns, hier würde ja dann eher
      sowas rein kommen */
      });

      _app._router.updatePageLinks();
      console.log("Alle Page Links updated");
  }

export default EditPage;
