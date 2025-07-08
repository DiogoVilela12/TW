// ==UserScript==
// @name         TW Diggy
// @version      1.0.0
// @description  Script TW
// @author       Diggy

// @match        *://*.tribalwars.com.br/game.php*
// @exclude      https://www.tribalwars.com.br/
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net

// @downloadURL
// @updateURL
// @grant        none
// @resource

// ==/UserScript==

(function () {
    'use strict';

    //GET RESOURCES

    let resources = {
        wood: 0,
        clay: 0,
        iron: 0,
        farm: 0
    };

    function setResources() {
        const interval = setInterval(() => {
            const resourceBox = $('.box.smallPadding');

            console.log(resourceBox)

            if (resourceBox.length > 0) {
                resources.wood = $('#wood').text();
                resources.clay = $('#stone').text();
                resources.iron = $('#iron').text();
                resources.farm = $('#pop_current_label').text();
                console.log(resources);
                clearInterval(interval);
            }
        }, 1000);

    }

    setResources();

    //GET TIME

    let serverTime;

    function setServerTime() {

        const interval = setInterval(() => {
            const serverTimeHTML = $('#serverTime');
            const serverStr = $('#serverTime').text();

            if (serverTimeHTML.length > 0) {
                const [h, m, s] = serverStr.split(":").map(Number);
                serverTime = new Date();
                serverTime.setHours(h, m, s, 0);
                console.log(serverTime);
                clearInterval(interval);
            }
        }, 1000);
    }

    setServerTime()

})();