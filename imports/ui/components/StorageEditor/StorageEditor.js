import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button, FormControl } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';
import { createContainer } from 'meteor/react-meteor-data';
import Loading from '../Loading/Loading';

import WorkersCollection from '../../../api/Workers/Workers';

class StorageEditor extends React.Component {


  componentDidMount() {

    const component = this;
    validate(component.form, {
      rules: {
        storageName: {
          required: true,
        },
        storageAbbrevation: {
          required: true,
        },
        storageState: {
          required: true,
        },
        storageAddress: {
          required: true,
        },
        storageContactPhone: {
          required: false,
        },
        storageContactEmail: {
          required: false,
        },
        storageManager: {
          required: true,
        },
      },
      messages: {
        storageName: {
          required: 'Storage name is needed !',
        },
        storageAbbrevation: {
          required: 'Storage abbrevation is needed!',
        },
        storageState: {
          required: 'Storage state is needed!',
        },
        storageAddress: {
          required: 'Storage address is needed!',
        },
        storageContactPhone: {
          required: 'Storage contact phone is not needed!',
        },
        storageContactEmail: {
          required: 'Storage contact e-mail is not needed!',
        },
        storageManager: {
          required: 'Storage manager is needed!',
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleSubmit() {

    const { history } = this.props;
    const existingStorage = this.props.storage && this.props.storage._id;
    const methodToCall = existingStorage ? 'storages.update' : 'storages.insert';
    const storage = {
      storageName: this.storageName.value.trim(),
      storageAbbrevation: this.storageAbbrevation.value.trim(),
      storageState: ReactDOM.findDOMNode(this.storageState).value.trim(),
      storageAddress: this.storageAddress.value.trim(),
      storageContactPhone: this.storageContactPhone.value.trim(),
      storageContactEmail: this.storageContactEmail.value.trim(),
      storageManager: ReactDOM.findDOMNode(this.storageManager).value.trim(),
      storageArticles:[]
    };


    if (existingStorage) storage._id = existingStorage;

    Meteor.call(methodToCall, storage, (error, storageId) => {
      if (error) {
        Bert.alert(error.reason, 'danger','growl-top-right');
      } else {
        const confirmation = existingStorage ? 'Storage updated!' : 'Storage added!';
        this.form.reset();
        Bert.alert(confirmation, 'success','growl-top-right');
        history.push(`/storages/${storageId}`);
      }
    });
  }


  render() {
      const { storage } = this.props;

        return (
          <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
          <FormGroup>
            <ControlLabel>Storage name</ControlLabel>
            <input
              type="text"
              className="form-control"
              name="storageName"
              ref={storageName => (this.storageName = storageName)}
              defaultValue={storage && storage.storageName}
              placeholder="Add storage name..."
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel>Storage abbreavtion:</ControlLabel>
            <input
              type="text"
              className="form-control"
              name="storageAbbrevation"
              ref={storageAbbrevation => (this.storageAbbrevation = storageAbbrevation)}
              defaultValue={storage && storage.storageAbbrevation}
              placeholder="Add storage abbrevation..."
            />
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Storage state:</ControlLabel>
              <FormControl componentClass="select" name="storageState" ref={storageState => (this.storageState = storageState)} placeholder="Select storage state...">
                <option value="Croatia">Croatia</option>
                <option value="Bosnia and Hercegovina">Bosnia and Hercegovina</option>
              </FormControl>
          </FormGroup>

          <FormGroup>
            <ControlLabel>Storage address:</ControlLabel>
            <input
              type="text"
              className="form-control"
              name="storageAddress"
              ref={storageAddress => (this.storageAddress = storageAddress)}
              defaultValue={storage && storage.storageAddress}
              placeholder="Add storage address..."
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel>Storage contact phone:</ControlLabel>
            <input
              type="text"
              className="form-control"
              name="storageContactPhone"
              ref={storageContactPhone => (this.storageContactPhone = storageContactPhone)}
              defaultValue={storage && storage.storageContactPhone}
              placeholder="Add storage contact phone..."
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel>Storage contact e-mail:</ControlLabel>
            <input
              type="text"
              className="form-control"
              name="storageContactEmail"
              ref={storageContactEmail => (this.storageContactEmail = storageContactEmail)}
              defaultValue={storage && storage.storageContactEmail}
              placeholder="Add storage econtact e-mail..."
            />
          </FormGroup>

        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Storage manager:</ControlLabel>
            <FormControl componentClass="select" name="storageManager" ref={storageManager => (this.storageManager = storageManager)} placeholder="Select storage manager...">
            {this.props.workers.map(function(worker,i){
              return <option key={i} value={worker.workerName + " " + worker.workerLastname}>{worker.workerName} {worker.workerLastname}</option>
            })}
            </FormControl>
        </FormGroup>

          <Button type="submit" bsStyle="success">
          {storage && storage._id ? 'Save Changes' : 'Add Storage'}
          </Button>
        </form>);

  }
}

StorageEditor.defaultProps = {
  storage: {
    storageName: ''
  },
};

StorageEditor.propTypes = {
  storage: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('workers');
  const currentUser = Meteor.user();
  return {
    loading: !subscription.ready(),
    workers: WorkersCollection.find({owner:currentUser._id}).fetch(),
  };
}, StorageEditor);
