import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';


var FormlyDescriptionOrError = React.createClass({
  render: function () {
    return (
      <View style={defaultComponentStyle.Container}>
        {this.props.children}
        {this._getText()}
      </View>
    );

  },
  _getText() {
    let key = this.props.config.key;
    var to = this.props.config.templateOptions || {};
    var fieldValidationResult = this.props.fieldValidation || {};
    var messages = fieldValidationResult.messages;

    if (messages && Object.keys(messages).length != 0) {
      return <Text style={defaultComponentStyle.VaildationErrorText}>{Object.values(messages)[0]}</Text>;
    }
    else if (to.description)
      return <Text style={defaultComponentStyle.DescriptionText}>{to.description}</Text>;
    else
      return null;
  }
});

const defaultComponentStyle = StyleSheet.create({
  VaildationErrorText: {
    color: 'red',
    fontSize: 12

  },
  DescriptionText: {
    color: 'rgba(0, 0, 0, .38)',
    fontSize: 12
  },
  Container: {
    flex: 1,
  },
});

module.exports = FormlyDescriptionOrError;