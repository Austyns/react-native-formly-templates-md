import React from 'react';
import { FieldMixin } from 'react-native-formly';
import { Dropdown } from 'react-native-material-dropdown';
import {
  View,
} from 'react-native';
import * as helpers from './../../helpers';

const FormlyTextInput = React.createClass({
  mixins: [FieldMixin],
  propTypes: {
    templateOptions: React.PropTypes.shape({
      required: React.PropTypes.bool,
      pattern: React.PropTypes.string,
      minlength: React.PropTypes.number,
      maxlength: React.PropTypes.number,
      disabled: React.PropTypes.bool,
      description: React.PropTypes.string,
      label: React.PropTypes.string,
      placeholder: React.PropTypes.string,
      labelProp: React.PropTypes.string,
      valueProp: React.PropTypes.string,
      options: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,

    }),
  },
  componentWillReceiveProps(nextProps) {
    const key = nextProps.config.key;
    const to = nextProps.config.templateOptions || {};
    const model = nextProps.model[key];
    if (model !== undefined &&
      !helpers.valueExistsInOptions(to.labelProp, to.valueProp, to.options, model)) {
      // if the value doesn't exists in options update the model with undefined
      this.onChange(undefined);
    }
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
          onChangeText={this.onChange}
          title={to.description}
          animationDuration={150}
          error={!fieldValidationResult.isValid ? (firstMessage || ' ') : null}
        />
        {/* if the field is invalid while there are no messages string with empty space
           should be given to the error property so it gives the error style to the component */}
      </View>
    );
  },
  _dataFromTemplateOptions(to = {}) {
    let items = [];
    // check if the options is of type array
    if (Array.isArray(to.options)) {
      items = to.options.map(option =>
        helpers.extractLabelAndValueFromOption(to.labelProp, to.valueProp, option),
      );
    }

    return items;
  },
});

module.exports = FormlyTextInput;
