import React from 'react';
import PropTypes from 'prop-types';
import {
  View
} from 'react-native';
import Checkbox from './../../controls/checkbox';

const FormlyCheckbox = (props) => {
  const key = props.config.key;
  const to = props.config.templateOptions || {};
  const viewValue = props.viewValues[key];

  return (
    <View style={defaultComponentStyle.Container}>
      <Checkbox label={to.label} isSelected={viewValue} onButtonPress={props.onChange} />
    </View>
  );
};

FormlyCheckbox.propTypes = {
  config: PropTypes.shape({
    key: PropTypes.string.isRequired,
    templateOptions: PropTypes.shape({
      required: PropTypes.bool,
      pattern: PropTypes.string,
      minlength: PropTypes.number,
      maxlength: PropTypes.number,
      disabled: PropTypes.bool,
      description: PropTypes.string,
      label: PropTypes.string
    })
  }).isRequired,
  viewValues: PropTypes.any
};
const defaultComponentStyle = {
  RadioContainer: {
    margin: 1
  }
};

module.exports = FormlyCheckbox;
