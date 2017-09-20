import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Suppliers from '../../../api/Suppliers/Suppliers';
import SupplierEditor from '../../components/SupplierEditor/SupplierEditor';
import NotFound from '../NotFound/NotFound';

const EditSupplier = ({ supplier, history }) => (supplier ? (
  <div className="EditSupplier">
    <h4 className="page-header">Editing a supplier</h4>
    <SupplierEditor supplier={supplier} history={history} />
  </div>
) : <NotFound />);

EditSupplier.propTypes = {
  supplier: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const suppleirId = match.params._id;
  const subscription = Meteor.subscribe('suppliers.view', suppleirId);

  return {
    loading: !subscription.ready(),
    supplier: Suppliers.findOne(suppleirId),
  };
}, EditSupplier);
