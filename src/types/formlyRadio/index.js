var React = require('react');
import { FieldMixin } from 'react-native-formly';
import { RadioButton, RadioGroup } from './radio-md';
import * as helpers from './../../helpers';
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
      pattern: React.PropTypes.string,
      minlength: React.PropTypes.number,
      maxlength: React.PropTypes.number,
      disabled: React.PropTypes.bool,
      description: React.PropTypes.string,
      label: React.PropTypes.string,
      placeholder: React.PropTypes.string,
      labelProp: React.PropTypes.string,
      valueProp: React.PropTypes.string,
      options: React.PropTypes.arrayOf(React.PropTypes.any).isRequired
    }),
  },
  componentWillReceiveProps: function (nextProps) {
    let key = nextProps.config.key;
    var to = nextProps.config.templateOptions || {};
    let model = nextProps.model[key];
    if (model !== undefined && !helpers.valueExistsInOptions(to.labelProp, to.valueProp, to.options, model)) {
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
        let { label, value } = helpers.extractLabelAndValueFromOption(to.labelProp, to.valueProp, option);
        items.push(<RadioButton id={value} label={label} />);
      }, this);
    }

    return items;
  }
  
});

var defaultComponentStyle = {
  RadioContainer: {
    margin: 1
  }
}

module.exports = FormlyRadio;
