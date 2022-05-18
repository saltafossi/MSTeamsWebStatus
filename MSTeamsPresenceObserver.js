// ==UserScript==
// @name         Web Based Microsoft Teams Presence Observer
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Osserva lo status dell'utente collegato alla versione web di Teams attiva sul browser
// @author       instance.id
// @match        https://*.teams.microsoft.us/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const INTERVAL = 5000;
    let currentStatus = ''
    let settingData = ''

    setInterval(() => {
        let status = document.querySelector("span.ts-skype-status");
        if (currentStatus == status.title) { return; }

        console.log('Current Status: ' + status.title)

        if (status != null && (status.title == 'In a call' || status.title == 'Busy' || status.title == 'In a meeting')) {
            currentStatus = status.title;
            console.log('Busy, turn Zigbee light on!');
            settingData = 'on';
        } else {
            currentStatus = status.title;
            console.log('Not busy, turn Zigbee light off!');
            settingData = 'off';
        }

        // curl --insecure https://192.168.50.231:1880/teams_status -H "Content-Type: application/json" -d '{"status": currentStatus, "set": "on"}'
        $.ajax({
            type: "POST",
            url: "https://192.168.50.231:1880/teams_status",
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
