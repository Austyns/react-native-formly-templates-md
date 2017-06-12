import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';


var FormlyLabel = React.createClass({
  render: function () {
    var styles = this.props.styles
    let to = this.props.config.templateOptions || {};
    var fieldValidationResult = this.props.fieldValidation || {};
    return (
      <View style={[{ marginVertical: 1 }, defaultComponentStyle.Container]}>
        {to.label ? <Text style={[defaultComponentStyle.Label, { color: fieldValidationResult.isValid ? undefined : "red" }]}>{to.label + (to.required ? ' *' : '')}</Text>
          : null}
        {this.props.children}
      </View>
    );
  }
});

const defaultComponentStyle = StyleSheet.create({
  Label: {
    color: 'rgba(0, 0, 0, .38)',
    fontSize: 12,
    paddingTop: 32
  },
  Container: {
    flex: 1,

  }
});

module.exports = FormlyLabel;