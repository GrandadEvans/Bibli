// Import classes
import User from './User';
import Alert from './Alert';

// let saved = localStorage.getItem('bilbi.settings');

let settings = {
    alerts: [],
    User: new User
};

let alerts = [
    'confused',
    'sectionForReferences'
];

for(let i = 0; i < alerts.length; i++) {
    settings.alerts.push(new Alert(alerts[i]));
}

export default settings;
