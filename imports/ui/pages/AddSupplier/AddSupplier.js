import React from 'react';
import PropTypes from 'prop-types';
import SupplierEditor from '../../components/SupplierEditor/SupplierEditor';

import i18n from 'meteor/universe:i18n';
const T = i18n.createComponent();

const AddSupplier = ({ history }) => (
  <div className="AddSupplier">
    <h4 className="page-header"><T>common.addSupplier.Heading</T></h4>
    <SupplierEditor history={history} />
  </div>
);

AddSupplier.propTypes = {
  history: PropTypes.object.isRequired,
};

export default AddSupplier;
