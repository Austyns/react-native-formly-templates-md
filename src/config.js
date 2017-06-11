import { Formly, FormlyConfig } from 'react-native-formly';
import _ from 'lodash'
let { FieldsConfig, WrappersConfig, ControllersConfig, ValidationsConfig, AsyncValidationsConfig, MessagesConfig } = FormlyConfig;

FieldsConfig.addType([
  { name: 'input', controller: ['inputTOValidators'], component: require('./types/formlyTextInput') },
  { name: 'radio', wrapper: ['label', 'validationError'], controller: ['requiredTOValidator'], component: require('./types/formlyRadio') }
]);


WrappersConfig.setWrapper([
  { name: 'label', component: require('./wrappers/formlyLabel') },
  { name: 'validationError', component: require('./wrappers/formlyVaildationError') },
]);

ControllersConfig.addType([
  {
    name: 'inputTOValidators',
    controller: {
      componentWillMount: function () {
        //for initial component adding validation
        var to = this.props.config.templateOptions || {};
        var fieldValidator = this.state.fieldValidator;
        if (fieldValidator) {
          to.required ? fieldValidator.subscribeToValidation("required", to.required) : fieldValidator.unsubscribeToValidation("required");
          fieldValidator.unsubscribeToValidation(['email', 'number', 'url']);
          switch (to.type) {
            case "number":
            case "email":
            case "url":
              fieldValidator.subscribeToValidation(to.type);
          }
          to.pattern ? fieldValidator.subscribeToValidation("pattern", to.pattern) : fieldValidator.unsubscribeToValidation("pattern");
          to.minlength ? fieldValidator.subscribeToValidation("minlength", to.minlength) : fieldValidator.unsubscribeToValidation("minlength");
          to.maxlength ? fieldValidator.subscribeToValidation("maxlength", to.maxlength) : fieldValidator.unsubscribeToValidation("maxlength");
        }

      },
      componentWillUpdate: function (nextProps, nextState) {
        var to = nextProps.config.templateOptions || {};
        var fieldValidator = this.state.fieldValidator;
        if (fieldValidator) {
          to.required ? fieldValidator.subscribeToValidation("required", to.required) : fieldValidator.unsubscribeToValidation("required");
          fieldValidator.unsubscribeToValidation(['email', 'number', 'url']);
          switch (to.type) {
            case "number":
            case "email":
            case "url":
              fieldValidator.subscribeToValidation(to.type);
          }
          to.pattern ? fieldValidator.subscribeToValidation("pattern", to.pattern) : fieldValidator.unsubscribeToValidation("pattern");
          to.minlength ? fieldValidator.subscribeToValidation("minlength", to.minlength) : fieldValidator.unsubscribeToValidation("minlength");
          to.maxlength ? fieldValidator.subscribeToValidation("maxlength", to.maxlength) : fieldValidator.unsubscribeToValidation("maxlength");
        }
      }
    }
  },
  {
    name: 'requiredTOValidator',
    controller: {
      componentWillMount: function () {
        //for initial component adding validation
        var to = this.props.config.templateOptions || {};
        var fieldValidator = this.state.fieldValidator;
        if (fieldValidator) {
          to.required ? fieldValidator.subscribeToValidation("required", to.required) : fieldValidator.unsubscribeToValidation("required");
        }
      },
      componentWillUpdate: function (nextProps, nextState) {
        var to = nextProps.config.templateOptions || {};
        var fieldValidator = this.state.fieldValidator;
        if (fieldValidator) {
          to.required ? fieldValidator.subscribeToValidation("required", to.required) : fieldValidator.unsubscribeToValidation("required");
        }
      }
    }
  }
]);

ValidationsConfig.addType({
  required: {
    expression: function ({ viewValue, model }) {
      let isValid;
      if (_.isString(viewValue))
        isValid = _.trim(viewValue).length !== 0;
      else if (_.isArray(viewValue) || _.isPlainObject(viewValue))
        isValid = !_.isEmpty(viewValue)
      else
        isValid = viewValue !== null && viewValue !== undefined;

      return isValid;
    }
  },
  url: {
    expression: function ({ viewValue, model }) {
      let regex = /^([a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:/?#]+|\[[a-f\d:]+\])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?)?$/i
      return viewValue === undefined || viewValue === null || regex.test(viewValue);
    }
  },
  email: {
    expression: function ({ viewValue, model }) {
      let regex = /^((?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*)?$/
      return viewValue === undefined || viewValue === null || regex.test(viewValue);
    }
  },
  number: {
    expression: function ({ viewValue, model }) {
      let regex = /^(\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*)?$/;
      return viewValue === undefined || viewValue === null || regex.test(viewValue);
    }
  },
  pattern: {
    expression: function ({ viewValue, modelValue, param }) {
      viewValue = _.isString(viewValue) ? viewValue : "";
      return new RegExp(param).test(viewValue);
    }
  },
  minlength: {
    expression: function ({ viewValue, modelValue, param }) {
      return viewValue && viewValue.length >= param;
    }
  },
  maxlength: {
    expression: function ({ viewValue, modelValue, param }) {
      return (!viewValue && param >= 0) || (viewValue && !(viewValue.length > param));
    }
  }
});