import React from 'react';
import PropTypes from 'prop-types';
import WorkerEditor from '../../components/WorkerEditor/WorkerEditor';

import i18n from 'meteor/universe:i18n';
const T = i18n.createComponent();

const AddWorker = ({ history }) => (
  <div className="AddWorker">
    <h4 className="page-header"><T>common.addWorker.Heading</T></h4>
    <WorkerEditor history={history} />
  </div>
);

AddWorker.propTypes = {
  history: PropTypes.object.isRequired,
};

export default AddWorker;
