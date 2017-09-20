import React from 'react';
import PropTypes from 'prop-types';
import CodeListEditor from '../../components/CodeListEditor/CodeListEditor';
import i18n from 'meteor/universe:i18n';
const T = i18n.createComponent();

const AddCodeList = ({ history }) => (
  <div className="AddCodeList">
    <h4 className="page-header"><T>common.addCode.Heading</T></h4>
    <CodeListEditor history={history} />
  </div>
);

AddCodeList.propTypes = {
  history: PropTypes.object.isRequired,
};

export default AddCodeList;
