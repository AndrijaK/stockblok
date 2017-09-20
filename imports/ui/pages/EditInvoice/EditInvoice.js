import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Invoices from '../../../api/Invoices/Invoices';
import InvoiceEditor from '../../components/InvoiceEditor/InvoiceEditor';
import NotFound from '../NotFound/NotFound';

const EditInvoice = ({ invoice, history }) => (invoice ? (
  <div className="EditInvoice">
    <h4 className="page-header">Editing a invoice</h4>
    <InvoiceEditor invoice={invoice} history={history} />
  </div>
) : <NotFound />);

EditInvoice.propTypes = {
  invoice: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const invoiceId = match.params._id;
  const subscription = Meteor.subscribe('invoices.view', invoiceId);

  return {
    loading: !subscription.ready(),
    invoice: Invoices.findOne(invoiceId),
  };
}, EditInvoice);
