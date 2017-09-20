import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button, FormControl } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

import i18n from 'meteor/universe:i18n';
const T = i18n.createComponent();

class SupplierEditor extends React.Component {
  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        supplierName: {
          required: true,
        },
        supplierContactPerson: {
          required: true,
        },
        supplierAddress: {
          required: true,
        },
        supplierRating: {
          required: true,
        },
        supplierContactPhone: {
          required: true,
        },
        supplierContactEmail: {
          required: false,
        },

      },
      messages: {
        supplierName: {
          required: 'Supplier name is required.',
        },
        supplierContactPerson: {
          required: 'Supplier contact person is required.',
        },
        supplierAddress: {
          required: 'Supplier address is required.',
        },
        supplierRating: {
          required: 'Supplier rating is required.',
        },
        supplierContactPhone: {
          required: 'Suppleir contact phone is required.',
        },
        supplierContactEmail: {
          required: 'Supplier e-mail is not required.',
        },

      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleSubmit() {
    const { history } = this.props;
    const existingSupplier = this.props.supplier && this.props.supplier._id;
    const methodToCall = existingSupplier ? 'suppliers.update' : 'suppliers.insert';

    const supplier = {
      supplierName: this.supplierName.value.trim(),
      supplierContactPerson: this.supplierContactPerson.value.trim(),
      supplierAddress: this.supplierAddress.value.trim(),
      supplierRating: ReactDOM.findDOMNode(this.supplierRating).value.trim(),
      supplierContactPhone: this.supplierContactPhone.value.trim(),
      supplierContactEmail: this.supplierContactEmail.value.trim(),
    };

    if (existingSupplier) supplier._id = existingSupplier;

    Meteor.call(methodToCall, supplier, (error, supplierId) => {
      if (error) {
        Bert.alert(error.reason, 'danger','growl-top-right');
      } else {
        const confirmation = existingSupplier ? 'Supplier updated!' : 'Supplier added!';
        this.form.reset();
        Bert.alert(confirmation, 'success','growl-top-right');
        history.push(`/suppliers/${supplierId}`);
      }
    });
  }

  render() {
    const { supplier } = this.props;
    return (<form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
      <FormGroup>
        <ControlLabel><T>common.suppliersEditor.supplierName</T></ControlLabel>
        <input
          type="text"
          className="form-control"
          name="supplierName"
          ref={supplierName => (this.supplierName = supplierName)}
          defaultValue={supplier && supplier.supplierName}
          placeholder="Add supplier name.."
        />
      </FormGroup>

      <FormGroup>
        <ControlLabel><T>common.suppliersEditor.supplierContactPerson</T></ControlLabel>
        <input
          type="text"
          className="form-control"
          name="supplierContactPerson"
          ref={supplierContactPerson => (this.supplierContactPerson = supplierContactPerson)}
          defaultValue={supplier && supplier.supplierContactPerson}
          placeholder="Add supplier contact person.."
        />
      </FormGroup>

      <FormGroup>
        <ControlLabel><T>common.suppliersEditor.supplierAddress</T></ControlLabel>
        <input
          type="text"
          className="form-control"
          name="supplierAddress"
          ref={supplierAddress => (this.supplierAddress = supplierAddress)}
          defaultValue={supplier && supplier.supplierAddress}
          placeholder="Add supplier address.."
        />
      </FormGroup>


      <FormGroup controlId="formControlsSelect">
        <ControlLabel><T>common.suppliersEditor.supplierRating</T></ControlLabel>
          <FormControl componentClass="select" name="supplierRating" ref={supplierRating => (this.supplierRating = supplierRating)} placeholder="Select supplier rating...">
            <option value="A">Rating A</option>
            <option value="B">Rating B</option>
            <option value="C">Rating C</option>
            <option value="D">Rating D</option>
            <option value="E">Rating E</option>
          </FormControl>
      </FormGroup>

      <FormGroup>
        <ControlLabel><T>common.suppliersEditor.supplierContactPhone</T></ControlLabel>
        <input
          type="text"
          className="form-control"
          name="supplierContactPhone"
          ref={supplierContactPhone => (this.supplierContactPhone = supplierContactPhone)}
          defaultValue={supplier && supplier.supplierContactPhone}
          placeholder="Add supplier contact phone.."
        />
      </FormGroup>

      <FormGroup>
        <ControlLabel><T>common.suppliersEditor.supplierContactEmail</T></ControlLabel>
        <input
          type="text"
          className="form-control"
          name="supplierContactEmail"
          ref={supplierContactEmail => (this.supplierContactEmail = supplierContactEmail)}
          defaultValue={supplier && supplier.supplierContactEmail}
          placeholder="Add supplier contact e-mail.."
        />
      </FormGroup>



      <Button type="submit" bsStyle="success">
        {supplier && supplier._id ? <T>common.suppliersEditor.SaveChangesButtonLabel</T> : <T>common.suppliersEditor.AddCodeButtonLabel</T>}
      </Button>
    </form>);
  }
}

SupplierEditor.defaultProps = {
  supplier: { supplierName: '',supplierContactPerson: '',supplierAddress: ''},
};

SupplierEditor.propTypes = {
  supplier: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default SupplierEditor;
