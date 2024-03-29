"use strict";

// import stylesheet from "./app.css";

import Navigo from "navigo/lib/navigo.js";
import DB from "./database.js";

import HomePage from "./section_homepage/home-page.js";
import EditPage from "./section_editpage/edit-page.js";
import SearchPage from "./section_searchpage/search-page.js";
import TitlePage from "./section_titlepage/title-page.js";

class App {
    constructor() {
        this._title = "Spot Your Music";
        this._currentView = null;

        //Single Page Router initialiesieren
        this._router = new Navigo();
        this._currentUrl = "";
        this._navAborted = false;
        this._db = new DB();

        this._router.on({
          "*":                    () => this.showStartPage(),
          "/":                    () => this.showStartPage(),
          "/search":              () => this.showSearchPage(),
          "/new":                 () => this.showEditPage(true, ""),
          "/edit/:id":      (params) => this.showEditPage(false, params.id),
          "/title/:id":     (params) => this.showTitlePage(params.id)
        });

        this._router.hooks({
          after: (params) => {
            if(!this._navAborted) {
              this._currentUrl = this._router.lastRouteResolved().url;
            } else {
              this._router.pause(true);
              this._router.navigate(this._currentUrl);
              this._router.pause(false);
              this._navAborted = false;
            }
          }
        });
    }

    start() {
      console.log("App started successfully :)");
      this._router.resolve();

      document.getElementById("top_right_button_search").addEventListener("click", () => { this._router.navigate("/search") } );
      document.getElementById("top_right_button_add").addEventListener("click", () => { this._router.navigate("/new") } );
      document.getElementById("bottom_left_button_search").addEventListener("click", () => { this._router.navigate("/search") } );
      document.getElementById("bottom_left_button_add").addEventListener("click", () => { this._router.navigate("/new") } );
      document.getElementById("headerlogo").addEventListener("click", () => { this._router.navigate("/")})
      document.getElementById("footerlogo").addEventListener("click", () => { this._router.navigate("/")})
    }

    showStartPage() {
      let view = new HomePage(this);
      this._switchVisibleView(view);
    }

    showSearchPage() {
      let view = new SearchPage(this);
      this._switchVisibleView(view);
    }

    showEditPage(newFlag, id) {
      let view = new EditPage(this, newFlag, id);
      this._switchVisibleView(view);
    }

    showTitlePage(id) {
      let view = new TitlePage(this, id);
      this._switchVisibleView(view);
    }

    _switchVisibleView(view) {
      let newUrl = this._router.lastRouteResolved().url;
      console.log(newUrl);
      let goon = () => {
        this._router.navigate(newUrl + "?goon");
      }

      if(this._currentView && !this._currentView.onLeave(goon)) {
        console.log("Navigation aborted");
        this._navAborted = true;
        return false;
      }

      document.title = `${this._title} - ${view.title}`;
      this._currentView = view;
      this._switchVisibleContent(view.onShow());
      view.onLoad();
      return true;
    }

    _switchVisibleContent(content) {

        console.log("_switchVisibleContent");
        let sections = document.querySelectorAll("body > main > section");

        sections.forEach(element => {
            element.classList.add("hidden");
        });

        let section = document.querySelector("#" + content.className);

        section.classList.remove("hidden");


        /*
      // <header> und <main> des HTML-Grundgerüsts ermitteln
      let app = document.querySelector("#app");
      let header = document.querySelector("#app > header");
      let main = document.querySelector("#app > main");

      // Zuvor angezeigte Inhalte entfernen
      // Bei der Topbar nur die untere Zeile, im Hauptbereich alles!
      app.className = "";
      header.querySelectorAll(".bottom").forEach(e => e.parentNode.removeChild(e));
      main.innerHTML = "";

      // CSS-Klasse übernehmen, um die viewspezifischen CSS-Regeln zu aktivieren
      if (content && content.className) {
          app.className = content.className;
      }

      // Neue Inhalte der Topbar einfügen
      if (content && content.topbar) {
          content.topbar.forEach(element => {
              element.classList.add("bottom");
              header.appendChild(element);
          });
      }

      // Neue Inhalte des Hauptbereichs einfügen
      if (content && content.main) {
          content.main.forEach(element => {
              main.appendChild(element);
          });
      }
      // Navigo an die Links in der View binden
      this._router.updatePageLinks();
      console.log("Page Links Updated");
      //end of _switchVisibleContent
      */
    }
}
    export default App;
