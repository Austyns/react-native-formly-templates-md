import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { FieldMixin } from 'react-native-formly';
import {
  View
} from 'react-native';
import RadioButton from './RadioButton';
import RadioGroup from './RadioGroup';
import * as helpers from './../../helpers';

const FormlyRadio = createReactClass({
  propTypes: {
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
    viewValues: PropTypes.any
  },
  mixins: [FieldMixin],
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
  _renderItemsFromTemplateOptions(to = {}) {
    const items = [];
    // check if the options is of type array
    if (Array.isArray(to.options)) {
      to.options.forEach((option) => {
        const {
          label,
          value
        } = helpers.extractLabelAndValueFromOption(to.labelProp, to.valueProp, option);
        items.push(<RadioButton id={value} label={label} />);
      }, this);
    }

    return items;
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
  }

});

const defaultComponentStyle = {
  RadioContainer: {
    margin: 1
  }
};

module.exports = FormlyRadio;
