import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Workers from '../../../api/Workers/Workers';
import WorkerEditor from '../../components/WorkerEditor/WorkerEditor';
import NotFound from '../NotFound/NotFound';

const EditWorker = ({ worker, history }) => (worker ? (
  <div className="EditWorker">
    <h4 className="page-header">Editing a worker</h4>
    <WorkerEditor worker={worker} history={history} />
  </div>
) : <NotFound />);

EditWorker.propTypes = {
  worker: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const workerId = match.params._id;
  const subscription = Meteor.subscribe('workers.view', workerId);

  return {
    loading: !subscription.ready(),
    worker: Workers.findOne(workerId),
  };
}, EditWorker);
