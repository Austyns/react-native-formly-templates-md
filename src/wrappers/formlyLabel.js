import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';


const FormlyLabel = React.createClass({
  render() {
    const to = this.props.config.templateOptions || {};
    const fieldValidationResult = this.props.fieldValidation || {};
    return (
      <View style={[{ marginVertical: 1 }, defaultComponentStyle.Container]}>
        {to.label ? <Text style={[defaultComponentStyle.Label, { color: fieldValidationResult.isValid ? undefined : 'red' }]}>{to.label + (to.required ? ' *' : '')}</Text>
          : null}
        {this.props.children}
      </View>
    );
  },
});

const defaultComponentStyle = StyleSheet.create({
  Label: {
    color: 'rgba(0, 0, 0, .38)',
    fontSize: 12,
    paddingTop: 32,
  },
  Container: {
    flex: 1,

  },
});

module.exports = FormlyLabel;
