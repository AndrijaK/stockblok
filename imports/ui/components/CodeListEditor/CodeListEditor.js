import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button, FormControl } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

import i18n from 'meteor/universe:i18n';
const T = i18n.createComponent();

class CodeListEditor extends React.Component {
  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        codeValue: {
          required: true,
        },
        codeDescription: {
          required: true,
        },


      },
      messages: {
        codeValue: {
          required: "Code value is required !",
        },
        codeDescription: {
          required: "Code description is required!",
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleSubmit() {
    const { history } = this.props;
    const existingCode = this.props.code && this.props.code._id;
    const methodToCall = existingCode ? 'codelists.update' : 'codelists.insert';

    const code = {
      codeValue: this.codeValue.value.trim(),
      codeDescription: ReactDOM.findDOMNode(this.codeDescription).value.trim(),

    };

    if (existingCode) code._id = existingCode;

    Meteor.call(methodToCall, code, (error, codeId) => {
      if (error) {
        Bert.alert(error.reason, 'danger','growl-top-right');
      } else {
        const confirmation = existingCode ? 'Code updated!' : 'Code added!';
        this.form.reset();
        Bert.alert(confirmation, 'success','growl-top-right');
        history.push(`/code-list/${codeId}`);
      }
    });
  }

  render() {
    const { code } = this.props;
    return (<form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>

      <FormGroup>
        <ControlLabel><T>common.codeListEditor.CodeValue</T></ControlLabel>
        <T _translateProps={['placeholder']}>
        <input
          type="text"
          className="form-control"
          name="codeValue"
          ref={codeValue => (this.codeValue = codeValue)}
          defaultValue={code && code.codeValue}
          placeholder="common.codeListEditor.CodeValuePlaceholder"
        />
        </T>
      </FormGroup>

      <FormGroup controlId="formControlsTextarea">
        <ControlLabel><T>common.codeListEditor.CodeDescription</T></ControlLabel>
        <T _translateProps={['placeholder']}>
        <FormControl
        name="codeDescription"
        componentClass="textarea"
        placeholder="common.codeListEditor.CodeDescriptionPlaceholder"
        ref={codeDescription => (this.codeDescription = codeDescription)}
        defaultValue={code && code.codeDescription} />
        </T>
      </FormGroup>

      <T _translateProps={['children']}>
        <Button type="submit" bsStyle="success">
          {code && code._id ? <T>common.codeListEditor.SaveChangesButtonLabel</T> : <T>common.codeListEditor.AddCodeButtonLabel</T>}
        </Button>
      </T>

    </form>);
  }
}

CodeListEditor.defaultProps = {
  code: { codeValue: '',codeDescription: ''},
};

CodeListEditor.propTypes = {
  code: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default CodeListEditor;
