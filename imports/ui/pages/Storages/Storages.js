import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button, Glyphicon} from 'react-bootstrap';
import { timeago, monthDayYearAtTime } from '@cleverbeagle/dates';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import Loading from '../../components/Loading/Loading';

import StoragesCollection from '../../../api/Storages/Storages';

import ReactTable from 'react-table'
import moment from 'moment-es6';

import { LinkContainer } from 'react-router-bootstrap';
import swal from 'sweetalert2';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const handleStorageDelete = (storageId) => {

  swal({
   title: 'Do you want to delete this storage?',
   text: "You won't be able to revert this!",
   type: 'warning',
   showCancelButton: true,
   confirmButtonColor: '#3085d6',
   cancelButtonColor: '#d33',
   confirmButtonText: 'Yes, delete it!'
 }).then(function () {

   Meteor.call('storages.remove', storageId, (error) => {
     if (error) {
       Bert.alert(error.reason, 'danger');
     } else {
       Bert.alert('Storage deleted!', 'success');
     }
   });
 });

};


const storageNameFormater = (cell, row)=> {
  return (<LinkContainer to={"/storages/"+row._id}><a>{cell}</a></LinkContainer> );
};

const createdAtFormater = (cell, row)=> {
  return (moment(cell).format("LL") );
};

const actionsFormater = (cell, row)=> {
  return (
    <div>
    <Glyphicon glyph="remove" style={{color:'red',cursor:'pointer'}} onClick={() => handleStorageDelete(row._id)}/>
    <LinkContainer to={"/storages/"+row._id+"/edit"}><a><Glyphicon glyph="edit" style={{color:'#3c763d',cursor:'pointer',marginLeft:'5px'}}/></a></LinkContainer>
    </div>
  );
};


const Storages = ({ loading, storages, match, history }) => (!loading ? (

  <div>
  <BootstrapTable data={storages} search tableStyle={{marginTop:"10px"}} pagination>
      <TableHeaderColumn  isKey hidden dataField='_id'>ID</TableHeaderColumn>
      <TableHeaderColumn  dataField='storageName' dataSort={true} dataFormat={storageNameFormater}>Storage name</TableHeaderColumn>
      <TableHeaderColumn  dataField='storageAbbrevation'>Storage abbrevation</TableHeaderColumn>
      <TableHeaderColumn  dataField='storageState'>Storage state</TableHeaderColumn>
      <TableHeaderColumn  dataField='storageManager'>Manager</TableHeaderColumn>
      <TableHeaderColumn  dataField='createdAt' dataFormat={createdAtFormater}>Created at</TableHeaderColumn>
      <TableHeaderColumn dataFormat={actionsFormater}>Actions</TableHeaderColumn>
  </BootstrapTable>
  </div>

) : <Loading />);


Storages.propTypes = {
  loading: PropTypes.bool.isRequired,
  storages: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('storages');
  return {
    loading: !subscription.ready(),
    storages: StoragesCollection.find().fetch(),
  };
}, Storages);
