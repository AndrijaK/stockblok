import React from 'react';
import InlineCss from 'react-inline-css';
import { Button,ListGroup, ListGroupItem ,Col,Grid,Row} from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import moment from 'moment-es6';

export default ViewInvoicePDF = ({ invoice }) => (

  <InlineCss stylesheet={`

      @media print {

         .invoicePDF
         {
           font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
           float:left;
           width:100%;
         }

        .btn { display: none; }

        hr { display: none; }

        h3 {
          font-size: 14px;
          margin-top: 0px;
          margin-bottom: 0px;
          color:#4e4a4a;
          border-bottom: 2px solid #aaaaaa;
          padding:10px;

        }

        p {
          margin-top: 10px;
          margin-bottom: 10px;
          font-size: 10px;
          text-align:right;
          color: #60646D;
        }

        .topTable
        {
          width:100%;
          float:left;
          clear:both;
          margin-bottom:5px;
        }

        .tableInfo
        {
          float: right;
          display:block;
        }

        .tableInfo td
        {
          border-bottom: none;
        }

        table
        {
          font-size:11px;
          color: #60646D;
          border-collapse:collapse;
          margin-bottom:0px !important;

        }

        table td
        {
          border-bottom-style: solid;
          border-bottom-width: 1px;
          border-bottom-color:#60646D;
          text-align:right;

        }


      }
  `}>
    <div className="invoicePDF">

    <div className="topTable">
    <table className="tableInfo">
      <tbody>
        <tr>
          <td>Document created:</td>
          <td>{moment().format("LL")}</td>
        </tr>
        <tr>
          <td>Created by:</td>
          <td>{invoice.owner}</td>
        </tr>
      </tbody>
      </table>
     </div>

    <h3>{invoice.invoiceSupplier}</h3>
    <div className="tableCont">
    <table>
      <tbody>
        <tr>
          <td>Created:</td>
          <td>{moment(invoice.createdAt).format("LL")}</td>
        </tr>
        <tr>
          <td>Invoice number:</td>
          <td>{invoice.invoiceNumber}</td>
        </tr>

        <tr>
          <td>Invoice date:</td>
          <td>{moment(invoice.invoiceDate).format("LL")}</td>
        </tr>

      </tbody>
    </table>
    </div>


    </div>
  </InlineCss>
);

ViewInvoicePDF.propTypes = {
  supplier: React.PropTypes.object.isRequired,
};
