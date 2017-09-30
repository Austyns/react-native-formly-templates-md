import React from 'react';
import { FieldMixin } from 'react-native-formly';
import {
  View
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import _ from 'lodash';

const FormlyTextInput = React.createClass({
  mixins: [FieldMixin],
  propTypes: {
    config: React.PropTypes.shape({
      templateOptions: React.PropTypes.shape({
        required: React.PropTypes.bool,
        type: React.PropTypes.oneOf(['number', 'url', 'email', 'password']),
        pattern: React.PropTypes.string,
        minlength: React.PropTypes.number,
        maxlength: React.PropTypes.number,
        disabled: React.PropTypes.bool,
        description: React.PropTypes.string,
        label: React.PropTypes.string,
        placeholder: React.PropTypes.string
      }).isRequired
    })
  },
  render() {
    const key = this.props.config.key;
    const to = this.props.config.templateOptions || {};
    const viewValue = this.props.viewValues[key];
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
          value={_.toString(viewValue)}
          onChangeText={this.onChange}
          characterRestriction={to.maxlength}
          title={to.description}
          keyboardType={this._setkeyboardType(to.type)}
          secureTextEntry={to.type === 'password'}
          autoCapitalize="none"
          autoCorrect={false}
          error={!fieldValidationResult.isValid ? (firstMessage || ' ') : null}
        />
        {/* if the field is invalid while there are no messages string with empty space 
          should be given to the error property so it gives the error style to the component */}
      </View>
    );
  },
  _setkeyboardType(keyboardType) {
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
});

module.exports = FormlyTextInput;
