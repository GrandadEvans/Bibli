"use strict";

import {checker as keyChecker} from "modules/keys";


class TOUBU {

    constructor() {
    }
    
    createParagraph(event, wordCount) {

        // Get a unix time to use as an id
        /* TODO: extract to a function to detect existing and append -1, -2 etc */
        let new_p_unix = moment().unix();

        // Get rid fo the active class
        $(event.target).removeClass('active');

        // Add a new paragraph to hold the new content
        $(`<p id="${new_p_unix}" class="active" contenteditable="true" spellcheck="true" data-level="p"></p>`)
            .insertAfter($(event.target));

        // Make it the last entry in the tbody
        $('tbody').append(`
            <tr>
                <td>&nbsp;</td>
                <td id="${new_p_unix}-text">&nbsp;</td>
                <td id="${new_p_unix}-word-count" class="word-count">${wordCount}</td>
            </tr>`);

        // Start editing the new paragraph
        $('.active').focus();
    };

    breaksToSpaces(input) {
        return input.replace('<br>', ' ');
    }

    countWords(target) {
        let targetId = target.id;
        let targetCountId = `${targetId}-word-count`;

        let wordCount = $(target)
            .html()                 // grab the html
            .replace(/\s\s+/g, ' ') // replace multiple spaces with single ones
            .trim()                 // trim
            .split(" ")             // separate to words
            .length;                // count

        wordCount = toubu.breaksToSpaces(wordCount);

        // Insert the paragraphs word count
        $(`#${targetCountId}`).text(wordCount);

        // R
        let pHtml = $(`#${targetId}`).html();
        pHtml = toubu.breaksToSpaces(pHtml);

        pHtml = S(pHtml).left(9).s;

        if ($(target).text().length <= 8) {
            $(`#${targetId}-text`).html(pHtml)
        } else if ($(target).text().length == 9) {
            $(`#${targetId}-text`).html(pHtml);
        } else {
            $(`#${targetId}-text`).html(`${pHtml}&hellip;`);
        }

        let totalCount = 0;

        $('.word-count').each(function(index, el) {
            let w = parseInt($(el).text());
            totalCount = totalCount + w;
        });
        $('#total-word-count').text(totalCount);

        return wordCount;
    }
}

let toubu = new TOUBU();

$('.essay-area').on('keyup', function(event) {
    event.preventDefault();

    let t = event.target;
    let wordCount = toubu.countWords(t);

    // If the key is enter we want to insert a new paragraph
    if (keyChecker.isEnter(event.keyCode) && !keyChecker.shiftIsPressed(event)) {
        if (t.lastChild.nodeName === 'DIV') {
            t.removeChild(t.lastChild);
        }
        toubu.createParagraph(event, wordCount);
    }
});

$('#select-font-family').change(function(event) {
    $('.active').attr('data-font-family', event.target.value);
});

$('#select-font-size').change(function(event) {
    $('.active').attr('data-font-size', event.target.value + 'pt');
});

$('#select-level').change(function(event) {
    $('.active').attr('data-p-level', event.target.value);
});

$('.starter').on('click', function(event) {
    toubu.createParagraph(event, 0);
    $('.starter').css('display', 'none');
});
