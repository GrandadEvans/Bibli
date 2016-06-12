"use strict";

export class checker {

    isEnter(keyCode) {
        return (keyCode === 13);
    }

    shiftIsPressed (event) {
        return event.shiftKey;
    }
}

