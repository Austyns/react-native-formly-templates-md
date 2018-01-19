import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import _ from 'lodash';

class FormlyTextarea extends Component {
  _setkeyboardType = (keyboardType) => {
    switch (keyboardType) {
      case 'number':
        return 'numeric';
      case 'email':
        return 'email-address';
      case 'url':
        return 'url';
      default:
        return 'default';
    }
  }
  render() {
    const key = this.props.config.key;
    const to = this.props.config.templateOptions || {};
    const viewValue = this.props.viewValues[key];
    const modelValue = this.props.model[key];
    const label = to.label ? (to.label + (to.required ? ' *' : '')) : '';

    // validations        
    const fieldValidationResult = this.props.fieldValidation || {};
    const validationMessages = fieldValidationResult.messages || {};
    const firstMessage = Object.values(validationMessages)[0];

    return (
      <View style={{ flex: 1 }}>
        <TextField
          label={label}
          placeholder={to.placeholder}
          disabled={to.disabled}
          value={_.toString(viewValue || modelValue)}
          onChangeText={this.props.onChange}
          characterRestriction={to.maxlength}
          title={to.description}
          keyboardType={this._setkeyboardType(to.type)}
          autoCapitalize="none"
          autoCorrect={false}
          multiline
          error={fieldValidationResult.isValid === false ? (firstMessage || ' ') : null}
        />
        {/* if the field is invalid while there are no messages string with empty space
           should be given to the error property so it gives the error style to the component */}
      </View>
    );
  }
}

FormlyTextarea.propTypes = {
  config: PropTypes.shape({
    key: PropTypes.string.isRequired,
    templateOptions: PropTypes.shape({
      required: PropTypes.bool,
      type: PropTypes.oneOf(['number', 'url', 'email']),
      pattern: PropTypes.string,
      minlength: PropTypes.number,
      maxlength: PropTypes.number,
      disabled: PropTypes.bool,
      description: PropTypes.string,
      label: PropTypes.string,
      placeholder: PropTypes.string
    })
  }).isRequired,
  viewValues: PropTypes.any,
  model: PropTypes.object,
  onChange: PropTypes.func,
  fieldValidation: PropTypes.shape({
    messages: PropTypes.object
  })
};

module.exports = FormlyTextarea;
