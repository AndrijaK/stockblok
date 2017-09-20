import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button, Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Workers from '../../../api/Workers/Workers';
import NotFound from '../NotFound/NotFound';
import Loading from '../../components/Loading/Loading';
import moment from 'moment-es6';
import { base64ToBlob } from '../../../modules/base64-to-blob.js';
import fileSaver from 'file-saver';
//import html2canvas from 'html2canvas';

//const jsPDF = require('jspdf');


/*const printDocument = () => {
   const input = document.getElementById('ViewWorkerPDF');
   html2canvas(input)
     .then((canvas) => {
       const imgData = canvas.toDataURL('image/png');
       const pdf = new jsPDF();
       pdf.addImage(imgData, 'JPEG', 0, 0);
       // pdf.output('dataurlnewwindow');
       pdf.save("download.pdf");
     })
   ;
 }*/


const downloadPDF = (event) => {

   event.preventDefault();
   const { target } = event;
   const workerId = event.target.getAttribute('data-id');
   target.innerHTML = '<em>Processing...</em>';
   target.classList.add('downloading');
   Meteor.call('workers.generatePDFSingle', { workerId }, (error, response) => {
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



const renderWorker = (worker, match, history) => (worker ? (
  <div className="ViewWorker" id="ViewWorker">
    <Panel header={worker.workerName + " " + worker.workerLastname}>
    <ListGroup>
      <ListGroupItem>Created: {moment(worker.createdAt).format("LL")}</ListGroupItem>
      <ListGroupItem>Worker position: {worker.workerPosition}</ListGroupItem>
    </ListGroup>
    <Button data-id={ worker._id } bsStyle="success" onClick={ downloadPDF }>Generate PDF</Button>
    </Panel>
  </div>

) : <NotFound />);

const ViewWorker = ({ loading, worker, match, history }) => (
  !loading ? renderWorker(worker, match, history) : <Loading />
);

ViewWorker.propTypes = {
  loading: PropTypes.bool.isRequired,
  worker: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const workerId = match.params._id;
  const subscription = Meteor.subscribe('workers.view', workerId);

  return {
    loading: !subscription.ready(),
    worker: Workers.findOne(workerId) || {},
  };
}, ViewWorker);
