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

// @resource     customCSS_global  https://raw.githubusercontent.com/DiogoVilela12/TW/refs/heads/main/style.css
// @grant        GM_addStyle
// @grant        GM_getResourceText


// ==/UserScript==

(function () {
    'use strict';

    // Add CSS

    function addCustomCSS() {
        const globalCSS = GM_getResourceText("customCSS_global");
        GM_addStyle(globalCSS);
    };

    addCustomCSS();
    const assetsUrl = 'https://raw.githubusercontent.com/DiogoVilela12/TW/refs/heads/main/assets';


    function setHTML() {
        var settingsWindow = document.createElement("div");
        settingsWindow.setAttribute("id", "diggy");
        settingsWindow.innerHTML = `
        
        <div id="button_box" class="button">
            <button class="button_box">
                <img class="button_logo" src="assets/logo.png" alt="teste">
            </button>
        </div>

        <div class="toolbox">
            <nav class="toolbox_nav">
                <a class="toolbox_link" href=""> Link 01</a>
                <a class="toolbox_link" href=""> Link 01 </a>
                <a class="toolbox_link" href=""> Link 01 </a>
                <a class="toolbox_link" href=""> Link 01 </a>
                <a class="toolbox_link" href=""> Link 01 </a>
            </nav>

            <div class="content">
                <form class="form">
                    <div class="form_group">
                        <label class="form_label" for="name">Nome</label>
                        <input class="form_input" type="text" id="name" name="name" />
                    </div>

                    <div class="form_group">
                        <label class="form_label" for="email">Email</label>
                        <input class="form_input" type="email" id="email" name="email" />
                    </div>

                    <button class="form_button" type="submit">Enviar</button>
                </form>
            </div>
        </div>
        `;

        function toggleToolbox() {
            const toolbox = document.querySelector('.toolbox');
            const button = document.querySelector('.button_box')

            if (toolbox.style.display === 'none' || toolbox.style.display === '') {
                toolbox.style.display = 'flex';
                button.classList.add('button_box_active');
            } else {
                toolbox.style.display = 'none';
                button.classList.remove('button_box_active');
            }
        }

        document.body.appendChild(settingsWindow);

        document.getElementById("button_box").addEventListener("click", toggleToolbox);
    }

    setHTML();

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

    //CLOSE OR GET POPUP BOXES

    function removePopUp() {
        setInterval(() => {
            const popup_box_container = $('.popup_box_container');

            if (popup_box_container.length > 0) {
                popup_box_container.remove();
                console.log('Popup removido.');
            }
        }, 3000);
    }

    window.onload = function () {
        removePopUp();
    };

})();