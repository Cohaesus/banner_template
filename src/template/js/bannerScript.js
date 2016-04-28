"use strict";

var Enabler;

window.onload = checkDCEnabler;

function checkDCEnabler() {
    if (Enabler.isInitialized()) {
        enablerInitHandler();
    } else {
        Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
    }
}

function enablerInitHandler() {
    document.getElementById('bg-exit').addEventListener('click', bgExitHandler, false);
    init();
}

function bgExitHandler() {
    Enabler.exitOverride("clickThrough", clickTag);
}


/* Please do not modify the code above */

/**
 * Declare local variables here
 */




/**
 * init
 *
 * Where you start your animation and
 * initialisation of your animation.
 * e.g hide the frames.
 *
 */
function init () {

}



