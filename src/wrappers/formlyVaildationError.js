import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';


var FormlyVaildationError = React.createClass({
  render: function () {
    var fieldValidationResult = this.props.fieldValidation || {};
    var messages = fieldValidationResult.messages;
    return (
      <View style={defaultComponentStyle.Container}>
        {this.props.children}
        {this._getValidationMessage(messages)}
      </View>
    );

  },
  _getValidationMessage(messages) {
    if (messages && Object.keys(messages).length != 0) {
      return <Text style={defaultComponentStyle.VaildationError}>{Object.values(messages)[0]}</Text>;
    }
    return null;
  }
});

const defaultComponentStyle = StyleSheet.create({
  VaildationError: {
    color: 'red',
    fontSize: 12

  },
  Container: {
    flex: 1,
  },
});

module.exports = FormlyVaildationError;