import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const FormlyDescriptionOrError = React.createClass({
  render() {
    return (
      <View style={defaultComponentStyle.Container}>
        {this.props.children}
        {this._getText()}
      </View>
    );
  },
  _getText() {
    const to = this.props.config.templateOptions || {};
    const fieldValidationResult = this.props.fieldValidation || {};
    const messages = fieldValidationResult.messages;

    if (messages && Object.keys(messages).length !== 0) {
      return (
        <Text style={defaultComponentStyle.VaildationErrorText}>
          {Object.values(messages)[0]}
        </Text>
      );
    } else if (to.description) {
      return <Text style={defaultComponentStyle.DescriptionText}>{to.description}</Text>;
    }
    return null;
  },
});

const defaultComponentStyle = StyleSheet.create({
  VaildationErrorText: {
    color: 'red',
    fontSize: 12,
  },
  DescriptionText: {
    color: 'rgba(0, 0, 0, .38)',
    fontSize: 12,
  },
  Container: {
    flex: 1,
  },
});

module.exports = FormlyDescriptionOrError;
