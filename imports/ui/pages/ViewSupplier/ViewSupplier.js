import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button, Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Suppliers from '../../../api/Suppliers/Suppliers';
import NotFound from '../NotFound/NotFound';
import Loading from '../../components/Loading/Loading';
import moment from 'moment-es6';
import { base64ToBlob } from '../../../modules/base64-to-blob.js';
import fileSaver from 'file-saver';

const downloadPDF = (event) => {

   event.preventDefault();
   const { target } = event;
   const supplierId = event.target.getAttribute('data-id');
   target.innerHTML = '<em>Processing...</em>';
   target.classList.add('downloading');
   Meteor.call('suppliers.generatePDFSingle', { supplierId }, (error, response) => {
     if (error) {
       Bert.alert(error.reason, 'danger');
     } else {
       const blob = base64ToBlob(response.base64);
       fileSaver.saveAs(blob, response.fileName);
       target.innerHTML = 'Generate PDF';
       target.classList.remove('downloading');
     }
   });
}

const renderSupplier = (supplier, match, history) => (supplier ? (
  <div className="ViewWorker">
    <Panel header={supplier.supplierName}>
    <ListGroup>
      <ListGroupItem>Created: {moment(supplier.createdAt).format("LL")}</ListGroupItem>
      <ListGroupItem>Supplier name: {supplier.supplierName}</ListGroupItem>
      <ListGroupItem>Supplier contact person: {supplier.supplierContactPerson}</ListGroupItem>
      <ListGroupItem>Supplier address: {supplier.supplierAddress}</ListGroupItem>
      <ListGroupItem>Supplier rating: {supplier.supplierRating}</ListGroupItem>
      <ListGroupItem>Supplier contact phone: {supplier.supplierContactPhone}</ListGroupItem>
      <ListGroupItem>Supplier contact e-mail: {supplier.supplierContactEmail}</ListGroupItem>
    </ListGroup>
    <Button data-id={ supplier._id } bsStyle="success" onClick={ downloadPDF }>Generate PDF</Button>
    </Panel>
  </div>
) : <NotFound />);

const ViewSupplier = ({ loading, supplier, match, history }) => (
  !loading ? renderSupplier(supplier, match, history) : <Loading />
);

ViewSupplier.propTypes = {
  loading: PropTypes.bool.isRequired,
  supplier: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const supplierId = match.params._id;
  const subscription = Meteor.subscribe('suppliers.view', supplierId);

  return {
    loading: !subscription.ready(),
    supplier: Suppliers.findOne(supplierId) || {},
  };
}, ViewSupplier);
