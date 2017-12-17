import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-native-material-dropdown';
import {
  View
} from 'react-native';
import * as helpers from './../../helpers';

class FormlyTextInput extends Component {
  componentWillReceiveProps(nextProps) {
    const key = nextProps.config.key;
    const to = nextProps.config.templateOptions || {};
    const model = nextProps.model[key];
    if (model !== undefined &&
      !helpers.valueExistsInOptions(to.labelProp, to.valueProp, to.options, model)) {
      // if the value doesn't exists in options update the model with undefined
      this.props.onChange(undefined);
    }
  }
  _dataFromTemplateOptions = (to = {}) => {
    let items = [];
    // check if the options is of type array
    if (Array.isArray(to.options)) {
      items = to.options.map(option =>
        helpers.extractLabelAndValueFromOption(to.labelProp, to.valueProp, option),
      );
    }

    return items;
  }

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
        {/* currently the dropdown has an issue with objects/arrays 
          in case initializing the with them. The dropdown can't select the correct value */}
        {/* characterRestriction in the dropdown has an issue that 
        it calculates the length of the label not the value */}
        <Dropdown
          label={label}
          placeholder={to.placeholder}
          disabled={to.disabled}
          data={this._dataFromTemplateOptions(to)}
          value={viewValue}
          onChangeText={this.props.onChange}
          title={to.description}
          animationDuration={150}
          error={!fieldValidationResult.isValid ? (firstMessage || ' ') : null}
        />
        {/* if the field is invalid while there are no messages string with empty space
           should be given to the error property so it gives the error style to the component */}
      </View>
    );
  }
}

FormlyTextInput.propTypes = {
  config: PropTypes.shape({
    key: PropTypes.string.isRequired,
    templateOptions: PropTypes.shape({
      required: PropTypes.bool,
      pattern: PropTypes.string,
      minlength: PropTypes.number,
      maxlength: PropTypes.number,
      disabled: PropTypes.bool,
      description: PropTypes.string,
      label: PropTypes.string,
      placeholder: PropTypes.string,
      labelProp: PropTypes.string,
      valueProp: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.any).isRequired
    })
  }).isRequired,
  model: PropTypes.any,
  viewValues: PropTypes.any,
  onChange: PropTypes.func,
  fieldValidation: PropTypes.shape({
    messages: PropTypes.object
  })
};

module.exports = FormlyTextInput;
