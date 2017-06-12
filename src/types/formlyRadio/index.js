var React = require('react');
import { FieldMixin } from 'react-native-formly';
import { RadioButton, RadioGroup } from './radio-md';
import _ from 'lodash';
import {
  View,
  Text
} from 'react-native';



var FormlyRadio = React.createClass({
  mixins: [FieldMixin],
  propTypes: {
    templateOptions: React.PropTypes.shape({
      required: React.PropTypes.bool,
      disabled: React.PropTypes.bool,
      description: React.PropTypes.string,
      label: React.PropTypes.string,
      labelProp: React.PropTypes.string,
      valueProp: React.PropTypes.string,
      options: React.PropTypes.arrayOf(React.PropTypes.any).isRequired
    }),
  },
  componentWillReceiveProps: function (nextProps) {
    let key = nextProps.config.key;
    var to = nextProps.config.templateOptions || {};
    let model = nextProps.model[key];
    if (model !== undefined && !this._valueExistsInOptions(to, model)) {
      //if the value doesn't exists in options update the model with undefined
      this.onChange(undefined);
    }
  },
  render: function () {
    let key = this.props.config.key;
    let to = this.props.config.templateOptions || {};
    let model = this.props.model[key];
    let viewValue = this.props.viewValues[key];



    return (
      <View style={defaultComponentStyle.Container}>
        <View style={defaultComponentStyle.RadioContainer}>
          <RadioGroup
            selectedItem={viewValue}
            formHorizontal={to.inline}
            labelHorizontal={to.labelHorizontal}
            disabled={to.disabled}
            onSelectionChange={this.onChange}>
            {this._renderItemsFromTemplateOptions(to)}
          </RadioGroup>
        </View>
      </View>
    );
  },
  _renderItemsFromTemplateOptions(to = {}) {
    let items = [];
    //check if the options is of type array
    if (Array.isArray(to.options)) {
      to.options.forEach(function (option, index) {
        let { label, value } = this._extractLabelAndValueFromOption(to, option);
        items.push(<RadioButton id={value} label={label} />);
      }, this);
    }

    return items;
  },
  _extractLabelAndValueFromOption(to = {}, option) {
    let extractedLabelAndValue = { label: "", value: undefined };
    //helper function that makes sure that label is string 
    let perpareLabelAndValue = function (l, v) {
      let label = _.isString(l) ? l : JSON.stringify(l);
      let value = v;
      return { label, value }
    }
    /*the options could be in one of the following formats:
      -literal value
      -object with a label and value (the default value of the label and value is "name" and "value" respectively)
     */
    //if the option is a literal value  make it the label and the value
    if (_.isString(option) || _.isNumber(option)) {
      extractedLabelAndValue = perpareLabelAndValue(option, option);
    }
    //if the option is a object take the value of the labelprop to the label and the value of valueprop to value
    else if (_.isPlainObject(option)) {
      let labelProp = to.labelProp || 'name';
      let valueProp = to.valueProp || 'value';
      extractedLabelAndValue = perpareLabelAndValue(option[labelProp], option[valueProp]);
    }
    else {
      extractedLabelAndValue = perpareLabelAndValue(option, option);
    }

    return extractedLabelAndValue;
  },
  _valueExistsInOptions(to = {}, model) {

    let valueExistInOptions = false;
    if (Array.isArray(to.options))
      //check if the value from recieved exists inside the available options 
      to.options.forEach(function (option, index) {
        let { value } = this._extractLabelAndValueFromOption(to, option);
        if (value == model)
          valueExistInOptions = true;
      }, this);

    return valueExistInOptions;

  }

});

var defaultComponentStyle = {
  RadioContainer: {
    margin: 1
  },
  Container: {
  }
}

module.exports = FormlyRadio;
