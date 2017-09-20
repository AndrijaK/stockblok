import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button, FormControl } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';
import { createContainer } from 'meteor/react-meteor-data';
import Loading from '../Loading/Loading';
import SuppliersCollection from '../../../api/Suppliers/Suppliers';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class InvoiceEditor extends React.Component {

  constructor(props) {
  super(props);
  this.handeDateChange = this.handeDateChange.bind(this);
  this.state = {startDate: moment()};
  }

  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        invoiceNumber: {
          required: true,
        },
        invoiceSupplier: {
          required: true,
        },


      },
      messages: {
        invoiceNumber: {
          required: "Invoice number is needed !",
        },
        invoiceSupplier: {
          required: "Invoice supplier is needed !",
        },

      },
      submitHandler() { component.handleSubmit(); },
    });

  }

  getSupplierId(selectedSupplier)
  {
    supplier = SuppliersCollection.findOne({supplierName:selectedSupplier});
    return supplier._id;
  }

  handleSubmit() {

    const { history } = this.props;
    const existingInvoice = this.props.invoice && this.props.invoice._id;
    const methodToCall = existingInvoice ? 'invoices.update' : 'invoices.insert';

    const invoiceDate = this.props.invoice.invoiceDate ? this.props.invoice.invoiceDate : this.state.startDate.toDate();

    const invoice = {
      invoiceNumber: this.invoiceNumber.value.trim(),
      invoiceSupplier: ReactDOM.findDOMNode(this.invoiceSupplier).value.trim(),
      invoiceDate: invoiceDate,
      invoiceSupplierId: this.getSupplierId(ReactDOM.findDOMNode(this.invoiceSupplier).value.trim()),
    };

    if (existingInvoice) invoice._id = existingInvoice;

    Meteor.call(methodToCall, invoice, (error, invoiceId) => {
      if (error) {
        Bert.alert(error.reason, 'danger','growl-top-right');
      } else {
        const confirmation = existingInvoice ? 'Invoice updated!' : 'Invoice added!';
        this.form.reset();
        Bert.alert(confirmation, 'success','growl-top-right');
        history.push(`/invoices/${invoiceId}`);
      }
    });
  }

  handeDateChange(date)
  {
     this.props.invoice.invoiceDate = date.toDate();
     this.setState({
      startDate: date
     });
  }

  render() {
    const { invoice } = this.props;
    return (<form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
      <FormGroup>
        <ControlLabel>Invoice number</ControlLabel>
        <input
          type="text"
          className="form-control"
          name="invoiceNumber"
          ref={invoiceNumber => (this.invoiceNumber = invoiceNumber)}
          defaultValue={invoice && invoice.invoiceNumber}
          placeholder="Add invoice number.."/>
      </FormGroup>


      <FormGroup controlId="formControlsSelect">
        <ControlLabel>Invoice supplier</ControlLabel>
          <FormControl componentClass="select" name="invoiceSupplier" ref={invoiceSupplier => (this.invoiceSupplier = invoiceSupplier)} placeholder="Select invoice position...">
          {this.props.suppliers.map(function(supplier,i){
            return <option key={i} value={supplier.supplierName}>{supplier.supplierName}</option>
          })}
          </FormControl>
      </FormGroup>

      <FormGroup>
      <ControlLabel>Invoice date</ControlLabel>
      <DatePicker className="form-control"  selected={this.state.startDate} onChange={this.handeDateChange } />
      </FormGroup>

      <Button type="submit" bsStyle="success">
        {invoice && invoice._id ? 'Save Changes' : 'Add a invoice'}
      </Button>
    </form>);
  }
}

InvoiceEditor.defaultProps = {
  invoice: { invoiceNumber: '',invoiceSupplier: ''},
};

InvoiceEditor.propTypes = {
  invoice: PropTypes.object,
  history: PropTypes.object.isRequired,
};


export default createContainer(() => {
  const subscription = Meteor.subscribe('suppliers');
  const currentUser = Meteor.user();
  return {
    loading: !subscription.ready(),
    suppliers: SuppliersCollection.find({owner:currentUser._id}).fetch(),
  };
}, InvoiceEditor);
