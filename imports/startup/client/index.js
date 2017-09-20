import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App/App';

import '../../ui/stylesheets/app.scss';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'react-select/dist/react-select.css';

Meteor.startup(() => render(<App />, document.getElementById('react-root')));
