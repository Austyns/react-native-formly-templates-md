import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  View
} from 'react-native';
import RadioButton from './../../controls/radioButton';
import RadioGroup from './../../controls/radioGroup';
import * as helpers from './../../helpers';

class FormlyRadio extends Component {
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
  _renderItemsFromTemplateOptions = (to = {}) => {
    const items = [];
    // check if the options is of type array
    if (Array.isArray(to.options)) {
      to.options.forEach((option, i) => {
        const {
          label,
          value
        } = helpers.extractLabelAndValueFromOption(to.labelProp, to.valueProp, option);
        items.push(<RadioButton key={i + _.toString(value)} id={value} label={label} />);
      }, this);
    }

    return items;
  }
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
            labelHorizontal={!to.labelVertical}
            disabled={to.disabled}
            onSelectionChange={this.props.onChange}
          >
            {this._renderItemsFromTemplateOptions(to)}
          </RadioGroup>
        </View>
      </View>
    );
  }

};
FormlyRadio.propTypes = {
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
      inline: PropTypes.bool,
      labelProp: PropTypes.string,
      valueProp: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.any).isRequired
    })
  }).isRequired,
  model: PropTypes.any,
  viewValues: PropTypes.any
}

const defaultComponentStyle = {
  RadioContainer: {
    margin: 1
  }
};

module.exports = FormlyRadio;
