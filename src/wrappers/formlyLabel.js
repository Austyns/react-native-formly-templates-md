import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';


const FormlyLabel = (props) => {
  const to = props.config.templateOptions || {};
  const fieldValidationResult = props.fieldValidation || {};
  return (
    <View style={[{ marginVertical: 1 }, defaultComponentStyle.Container]}>
      {to.label ? <Text style={[defaultComponentStyle.Label, { color: fieldValidationResult.isValid ? undefined : 'red' }]}>{to.label + (to.required ? ' *' : '')}</Text>
        : null}
      {props.children}
    </View>
  );
};

FormlyLabel.propTypes = {
  config: PropTypes.shape({
    templateOptions: PropTypes.shape({
      label: PropTypes.string,
      required: PropTypes.bool
    })
  }).isRequired,
  fieldValidation: PropTypes.shape({
    messages: PropTypes.object
  }),
  children: PropTypes.element
};

const defaultComponentStyle = StyleSheet.create({
  Label: {
    color: 'rgba(0, 0, 0, .38)',
    fontSize: 12,
    paddingTop: 32
  },
  Container: {
    flex: 1

  }
});

module.exports = FormlyLabel;
