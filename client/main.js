import {Meteor} from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import {Session} from 'meteor/session';

import '../imports/startup/simple-schema-configuration.js';
import {routes, onAuthChange} from '../imports/routes/routes';

export var isAuthenticated;

Tracker.autorun(() => {
  isAuthenticated = !!Meteor.userId(); //if there is a string =true, null = false
  onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});