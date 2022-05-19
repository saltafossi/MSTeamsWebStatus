// ==UserScript==
// @name         Web Based Microsoft Teams Presence Observer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Osserva lo status dell'utente collegato alla versione web di Teams attiva sul browser
// @author       FranCesco
// @match         *://*.teams.microsoft.com/*
// @grant        none
// ==/UserScript==

(function () {
    let $ = window.jQuery;
    'use strict';

    const INTERVAL = 5000;
    let currentStatus = ''
    let settingData = ''

    setInterval(() => {
        let status = document.querySelector("span.ts-skype-status");
        if (currentStatus == status.title) { return; }

        alert('==Current Status: ' + status.title)

        if (status != null && (status.title == 'In a call' || status.title == 'Busy' || status.title == 'In a meeting')) {
            currentStatus = status.title;
            console.log('Busy, turn Zigbee light on!');
            settingData = 'on';
        } else {
            currentStatus = status.title;
            console.log('Not busy, turn Zigbee light off!');
            settingData = 'off';
        }

        $.ajax({
            type: "POST",
            url: "http://localhost/teams_status",
            data: {
                status: currentStatus,
                set: settingData
            },
            success: function (data) {
                console.log(data);
            },
            dataType: "json"
        });

    }, INTERVAL);
})();
