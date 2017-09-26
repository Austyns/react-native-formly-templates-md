import React from 'react';
import { FieldMixin } from 'react-native-formly';
import {
  View,
} from 'react-native';
import { RadioButton, RadioGroup } from './radio-md';
import * as helpers from './../../helpers';

const FormlyRadio = React.createClass({
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


    return (
      <View style={defaultComponentStyle.Container}>
        <View style={defaultComponentStyle.RadioContainer}>
          <RadioGroup
            selectedItem={viewValue}
            formHorizontal={to.inline}
            labelHorizontal={to.labelHorizontal}
            disabled={to.disabled}
            onSelectionChange={this.onChange}
          >
            {this._renderItemsFromTemplateOptions(to)}
          </RadioGroup>
        </View>
      </View>
    );
  },
  _renderItemsFromTemplateOptions(to = {}) {
    const items = [];
    // check if the options is of type array
    if (Array.isArray(to.options)) {
      to.options.forEach((option) => {
        const {
          label,
          value,
        } = helpers.extractLabelAndValueFromOption(to.labelProp, to.valueProp, option);
        items.push(<RadioButton id={value} label={label} />);
      }, this);
    }

    return items;
  },

});

const defaultComponentStyle = {
  RadioContainer: {
    margin: 1,
  },
};

module.exports = FormlyRadio;
