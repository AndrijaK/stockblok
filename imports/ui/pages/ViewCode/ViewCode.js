import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button, Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import CodeLists from '../../../api/CodeLists/CodeLists';
import NotFound from '../NotFound/NotFound';
import Loading from '../../components/Loading/Loading';
import moment from 'moment-es6';

const renderCode = (code, match, history) => (code ? (
  <div className="ViewWorker" id="ViewWorker">
    <Panel header={code.codeValue}>
    <ListGroup>
      <ListGroupItem>Created: {moment(code.createdAt).format("LL")}</ListGroupItem>
      <ListGroupItem>Description: {code.codeDescription}</ListGroupItem>
    </ListGroup>

    </Panel>
  </div>

) : <NotFound />);

const ViewCode = ({ loading, code, match, history }) => (
  !loading ? renderCode(code, match, history) : <Loading />
);

ViewCode.propTypes = {
  loading: PropTypes.bool.isRequired,
  code: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const codeId = match.params._id;
  const subscription = Meteor.subscribe('codelists.view', codeId);

  return {
    loading: !subscription.ready(),
    code: CodeLists.findOne(codeId) || {},
  };
}, ViewCode);
