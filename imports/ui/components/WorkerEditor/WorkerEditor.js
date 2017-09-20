import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button, FormControl } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

import i18n from 'meteor/universe:i18n';
const T = i18n.createComponent();

class WorkerEditor extends React.Component {
  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        workerName: {
          required: true,
        },
        workerLastname: {
          required: true,
        },
        workerPosition: {
          required: true,
        },

      },
      messages: {
        workerName: {
          required: 'Worker name is needed !',
        },
        workerLastname: {
          required: 'Worker lastname is needed !',
        },
        workerPosition: {
          required: 'Worker position is needed !',
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleSubmit() {
    const { history } = this.props;
    const existingWorker = this.props.worker && this.props.worker._id;
    const methodToCall = existingWorker ? 'workers.update' : 'workers.insert';

    const worker = {
      workerName: this.workerName.value.trim(),
      workerLastname: this.workerLastname.value.trim(),
      workerPosition: ReactDOM.findDOMNode(this.workerPosition).value.trim(),
    };

    if (existingWorker) worker._id = existingWorker;

    Meteor.call(methodToCall, worker, (error, workerId) => {
      if (error) {
        Bert.alert(error.reason, 'danger','growl-top-right');
      } else {
        const confirmation = existingWorker ? 'Worker updated!' : 'Worker added!';
        this.form.reset();
        Bert.alert(confirmation, 'success','growl-top-right');
        history.push(`/workers/${workerId}`);
      }
    });
  }

  render() {
    const { worker } = this.props;
    return (<form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
      <FormGroup>
        <ControlLabel><T>common.workerEditor.workerName</T></ControlLabel>
        <T _translateProps={['placeholder']}>
        <input
          type="text"
          className="form-control"
          name="workerName"
          ref={workerName => (this.workerName = workerName)}
          defaultValue={worker && worker.workerName}
          placeholder="common.workerEditor.workerNamePlaceholder"
        />
        </T>
      </FormGroup>

      <FormGroup>
        <ControlLabel><T>common.workerEditor.workerLastname</T></ControlLabel>
        <T _translateProps={['placeholder']}>
        <input
          type="text"
          className="form-control"
          name="workerLastname"
          ref={workerLastname => (this.workerLastname = workerLastname)}
          defaultValue={worker && worker.workerLastname}
          placeholder="common.workerEditor.workerLastnamePlaceholder"
        />
        </T>
      </FormGroup>

      <FormGroup controlId="formControlsSelect">
        <ControlLabel><T>common.workerEditor.workerPosition</T></ControlLabel>
          <FormControl componentClass="select" name="workerPosition" ref={workerPosition => (this.workerPosition = workerPosition)} placeholder="Select worker position...">
            <option value="Manufacturing manager">Manufacturing manager</option>
            <option value="Product engineer">Production engineer</option>
            <option value="R&D engineer">R&D engineer</option>
            <option value="Storage manager">Storage manager</option>
          </FormControl>
      </FormGroup>

      <T _translateProps={['children']}>
      <Button type="submit" bsStyle="success">
        {worker && worker._id ? <T>common.workerEditor.SaveChangesButtonLabel</T> : <T>common.workerEditor.AddCodeButtonLabel</T>}
      </Button>
      </T>
    </form>);
  }
}

WorkerEditor.defaultProps = {
  worker: { workerName: '',workerLastname: '',workerPosition: ''},
};

WorkerEditor.propTypes = {
  worker: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default WorkerEditor;
