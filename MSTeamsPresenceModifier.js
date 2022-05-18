// ==UserScript==
// @name         Web Based Microsoft Teams Presence Modifier
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Modifica lo status dell'utente collegato alla versione web di Teams attiva sul browser
// @author       instance.id
// @match        https://*.teams.microsoft.us/*
// @grant        none
// ==/UserScript==

function getAuthToken() {
  for(const i in localStorage) {
    if(i.startsWith("ts.") && i.endsWith("cache.token.https://presence.teams.microsoft.com/")) {
      return JSON.parse(localStorage[i]).token;
    }
  }
}

function makeActive() {
  console.log('fuk u teams');
  fetch("https://presence.teams.microsoft.com/v1/me/forceavailability/", {
    "headers": {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getAuthToken()}`
    },
    "body": '{"availability":"Available"}',
    "method": "PUT"
  })
  .then(response => console.log(`Got fuked: ${response.statusText}`))

}


setInterval(makeActive, 15*1000);
makeActive()
