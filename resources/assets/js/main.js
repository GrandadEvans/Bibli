import settings from './settings';
import Vue from 'vue';
import Modal from './components/Modal.vue';
import InfoBox from './components/infoBox.vue';

Vue.transition('useOwnUrlP', {
    enterClass: 'flash'
});

let vm = new Vue({
    el: '#app',

    // http: {
    //     headers: {
    //         'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value
    //     }
    // },

    data: {
        references: [
        ],
        currentUrl: '',
        urlSubmitted: false,
        pageTitle: '',
        pageTitleRetrieved: false,
        useDefaultPageTitle: true,
        settings: settings
    },

    components: {
        Modal,
        "info-box": InfoBox
    },

    methods: {
        removeReference(ref) {
            this.references.$remove(ref);
        },

        getTitle() {
            let vm = this;
            let url = this.currentUrl;

            this.urlSubmitted = true;
            $('input').blur();
            if (url.indexOf('://') === -1) {
                url = `http://${url}`;
            }
            let tld = encodeURIComponent(url);

            if (this.findRefByUrl(url) === true) {
                swal("Oh Poop!", "This Web Address already exists in your references", "error");
                this.cancelNewPageTitle();
                return false;
            }

            $.get({
                url: 'http://bibli.app/title?url=' + tld,
                success: (data) => {
                    vm.pageTitle = data;
                    vm.pageTitleRetrieved = true;
                },
                done: (data) => {
                    console.success(data);
                }
            })
        },

        addPage() {
            this.references.push({
                type: "Website",
                name: this.pageTitle,
                url: this.currentUrl
            });
            this.pageTitle = '';
            this.currentUrl = '';
            this.urlSubmitted = false;
            this.pageTitleRetrieved = false;
            this.useDefaultPageTitle = true;
            swal("Awesome!", "Your page is ready for including in your Bibli.!", "success");
        },

        addOwnPageTitle() {
            this.useDefaultPageTitle = false;
            $('#addOwnPageTitleLabel').addClass('animated').addClass('flash');
        },

        cancelNewPageTitle() {
            this.pageTitle = '';
            this.currentUrl = '';
            this.urlSubmitted = false;
            this.pageTitleRetrieved = false;
            this.useDefaultPageTitle = true;
            $('#newPageTitle').slideUp();
        },

        findRefByUrl(url) {
            for (var i=0; i<this.references.length; i++) {
                console.log("a", decodeURIComponent(this.references[i].url));
                console.log("b", decodeURIComponent(url));
                if (decodeURIComponent(this.references[i].url) === decodeURIComponent(url)) {
                    return true;
                }
            }

            return false;
        },

        findAlertById(id, returnMe) {
            if (typeof returnMe === "undefined") returnMe = 'alert';

            let r = null;

            let alerts = settings.alerts;
            alerts.forEach((currentAlert, index, alerts) => {
                if (currentAlert.id === id) {
                    if (returnMe === 'index') {
                        r =  index;
                    } else {
                        r = alerts[index];
                    }
                }
            });

            return r || false;
        },
        alertHasBeenDismissed(id) {
            "use strict";
            if (this.findAlertById(id).dismissed) {
                return true;
            }
            return false;
        },
        dismissAlert(id) {
            "use strict";
            var index = this.findAlertById(id, 'index');
            this.settings.alerts[index].dismissed = true;
            return true;
        }
    },
    
    computed: {
        pageRetrieved() {
            if (this.pageTitleRetrieved === true) {
                return 'has-success'
            }
        },
        urlFieldIcon() {
            if (this.pageTitleRetrieved === true) {
                return 'check-circle'
            }
            return 'globe';
        }
        
    },
});



/**
 * Whenever the people array is changed then persist that straight into localStorage
 */
vm.$watch('settings.people', function (newVal) {
    localStorage.setItem('Bibli.people', JSON.stringify(newVal));
});
