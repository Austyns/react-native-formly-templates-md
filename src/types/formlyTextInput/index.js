import React from 'react';
import { FieldMixin } from 'react-native-formly';
import {
    View,
    Text,
    TextInput
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import _ from 'lodash';

var FormlyTextInput = React.createClass({
    mixins: [FieldMixin],
    propTypes: {
        templateOptions: React.PropTypes.shape({
            required: React.PropTypes.bool,
            type: React.PropTypes.oneOf(['number', 'url', 'email', 'password']),
            pattern: React.PropTypes.string,
            minlength: React.PropTypes.number,
            maxlength: React.PropTypes.number,
            disabled: React.PropTypes.bool,
            description: React.PropTypes.string,
            label: React.PropTypes.string,
            placeholder: React.PropTypes.string,

        }),
    },
    render: function () {
        let key = this.props.config.key;
        let to = this.props.config.templateOptions || {};
        let model = this.props.model[key];
        let viewValue = this.props.viewValues[key];
        let label = to.label ? (to.label + (to.required ? ' *' : '')) : '';

        //validations        
        var fieldValidationResult = this.props.fieldValidation || {};
        let validationMessages = fieldValidationResult.messages || {};
        let firstMessage = Object.values(validationMessages)[0];
        this._allowTextOnly(viewValue);

        return (
            <View style={{ flex: 1 }}>
                <TextField
                    label={label}
                    placeholder={to.placeholder}
                    disabled={to.disabled}
                    value={viewValue}
                    onChangeText={this.onChange}
                    characterRestriction={to.maxlength}
                    title={to.description}
                    keyboardType={this._setkeyboardType(to.type)}
                    secureTextEntry={to.type === 'password'}
                    autoCapitalize="none"
                    autoCorrect={false}
                    error={!fieldValidationResult.isValid ? (firstMessage || " ") : null} />
                {/* if the field is invalid while there are no messages string with empty space should be given to the error property
                     so it gives the error style to the component */}
            </View>
        );
    },
    _allowTextOnly: function (value) {
        if (value !== null && value !== undefined && !_.isString(value))
            this.onChange(undefined)
    },
    _setkeyboardType: function (keyboardType) {
        switch (keyboardType) {
            case "number":
                return 'numeric';
            case "email":
                return 'email-address';
            case "url":
                return 'url';
            default:
                return 'default';
        }
    }
});

module.exports = FormlyTextInput;