import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

class FormlyDescriptionOrError extends Component {
  _getText = () => {
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
  }
  render() {
    return (
      <View style={defaultComponentStyle.Container}>
        {this.props.children}
        {this._getText()}
      </View>
    );
  }
}

FormlyDescriptionOrError.propTypes = {
  config: PropTypes.shape({
    key: PropTypes.string.isRequired,
    templateOptions: PropTypes.shape({
      description: PropTypes.string
    })
  }).isRequired,
  fieldValidation: PropTypes.shape({
    messages: PropTypes.object
  }),
  children: PropTypes.element
};

const defaultComponentStyle = StyleSheet.create({
  VaildationErrorText: {
    color: 'rgba(213, 0, 0, 1)',
    fontSize: 12
  },
  DescriptionText: {
    color: 'rgba(0, 0, 0, .38)',
    fontSize: 12
  },
  Container: {
    flex: 1
  }
});

module.exports = FormlyDescriptionOrError;
