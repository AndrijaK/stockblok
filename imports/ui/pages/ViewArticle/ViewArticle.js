import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button, Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Articles from '../../../api/Articles/Articles';
import NotFound from '../NotFound/NotFound';
import Loading from '../../components/Loading/Loading';
import moment from 'moment-es6';

import { QRCode } from 'react-qr-svg';
import { base64ToBlob } from '../../../modules/base64-to-blob.js';
import fileSaver from 'file-saver';

var Barcode = require('react-barcode');

import Codes from '../../../api/CodeLists/CodeLists';

import ViewArticlePDF from '../ViewArticlePDF/ViewArticlePDF';

const downloadPDF = (event) => {

   event.preventDefault();
   const { target } = event;
   const articleId = event.target.getAttribute('data-id');
   target.innerHTML = '<em>Processing...</em>';
   target.classList.add('downloading');
   Meteor.call('articles.generatePDFSingle', { articleId }, (error, response) => {
     if (error) {

       Bert.alert(error.reason, 'danger');
     } else {
       const blob = base64ToBlob(response.base64);
       fileSaver.saveAs(blob, response.fileName);
       target.innerHTML = 'Create PDF';
       target.classList.remove('downloading');
     }
   });
}


const renderArticle = (article, match, history) => (article ? (

  <div className="ViewArticle">
    <Panel header={article.articleName}>
    <ListGroup>
      <ListGroupItem>Created: {moment(article.createdAt).format("LL")}</ListGroupItem>
      <ListGroupItem>Article code: {article.articleCodeValue}</ListGroupItem>
      <ListGroupItem>Description: {article.articleDescription}</ListGroupItem>
      <ListGroupItem>Standard: {article.articleStandard}</ListGroupItem>
      <ListGroupItem>Heat number: {article.articleHeatNumber}</ListGroupItem>
      <ListGroupItem>Quantity: {article.articleQuantity}</ListGroupItem>
      <ListGroupItem>Price: {article.articlePrice}</ListGroupItem>
      <ListGroupItem>Total value: {article.articleTotalValue}</ListGroupItem>
    </ListGroup>

    <QRCode bgColor="#FFFFFF" fgColor="#000000" level="H" style={{ width: 128,marginTop:'10px' }} value={article.articleQRcode} />

    </Panel>
    <div>
      <Button data-id={ article._id } bsStyle="success" onClick={ downloadPDF }>Create PDF</Button>
    </div>

  </div>

) : <NotFound />);

const ViewArticle = ({ loadingArticle, loadingCode, article, match, history }) => (
  !loadingArticle && !loadingCode ? renderArticle(article, match, history) : <Loading />
);

ViewArticle.propTypes = {
  loading: PropTypes.bool.isRequired,
  article: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(({ match }) => {
  const articleId = match.params._id;
  const subscription = Meteor.subscribe('articles.view', articleId);
  const codeSubscription = Meteor.subscribe('codelists');

  let articleSingle;
  let code;

  if(subscription.ready() && codeSubscription.ready())
  {
     articleSingle = Articles.findOne(articleId);
     code = Codes.findOne(articleSingle.articleCodeId);
     articleSingle.articleCodeValue = code.codeValue;
  }



  return {
    loadingArticle: !subscription.ready(),
    loadingCode: !codeSubscription.ready(),
    article: articleSingle || {},
  };
}, ViewArticle);
