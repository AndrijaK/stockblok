import React from 'react';
import InlineCss from 'react-inline-css';
import { Button,ListGroup, ListGroupItem ,Col,Grid,Row} from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import moment from 'moment-es6';

export default ViewSupplierPDF = ({ supplier }) => (

  <InlineCss stylesheet={`

      @media print {

         .supplierPDF
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
    <div className="supplierPDF">

    <div className="topTable">
    <table className="tableInfo">
      <tbody>
        <tr>
          <td>Document created:</td>
          <td>{moment().format("LL")}</td>
        </tr>
        <tr>
          <td>Created by:</td>
          <td>{supplier.owner}</td>
        </tr>
      </tbody>
      </table>
     </div>

    <h3>{supplier.supplierName}</h3>
    <div className="tableCont">
    <table>
      <tbody>
        <tr>
          <td>Created:</td>
          <td>{moment(supplier.createdAt).format("LL")}</td>
        </tr>
        <tr>
          <td>Supplier name:</td>
          <td>{supplier.supplierName}</td>
        </tr>
        <tr>
          <td>Supplier Contact person:</td>
          <td>{supplier.supplierContactPerson}</td>
        </tr>
        <tr>
          <td>Supplier address:</td>
          <td>{supplier.supplierAddress}</td>
        </tr>
        <tr>
          <td>Supplier rating:</td>
          <td>{supplier.supplierRating}</td>
        </tr>
        <tr>
          <td>Supplier contact phone:</td>
          <td>{supplier.supplierContactPhone}</td>
        </tr>
        <tr>
          <td>Supplier contact e-mail:</td>
          <td>{supplier.supplierContactEmail}</td>
        </tr>
      </tbody>
    </table>
    </div>


    </div>
  </InlineCss>
);

ViewSupplierPDF.propTypes = {
  supplier: React.PropTypes.object.isRequired,
};
