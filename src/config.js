import { FormlyConfig } from 'react-native-formly';
import _ from 'lodash';

const {
  FieldsConfig,
  WrappersConfig,
  ControllersConfig,
  ValidationsConfig
} = FormlyConfig;
// require formly types
const inputComponent = require('./types/formlyTextInput');
const textareaComponent = require('./types/formlyTextarea');
const radioComponent = require('./types/formlyRadio');
const selectComponent = require('./types/formlySelect');

// require formly wrappers
const labelWrapper = require('./wrappers/formlyLabel');
const descOrErrorWrapper = require('./wrappers/formlyDescriptionOrError');

FieldsConfig.addType([
  {
    name: 'input',
    controller: ['inputTypeValidators', 'templateOptionsValidators'],
    component: inputComponent
  },
  {
    name: 'textarea',
    controller: ['inputTypeValidators', 'templateOptionsValidators'],
    component: textareaComponent
  },
  {
    name: 'radio',
    wrapper: ['label', 'descriptionOrError'],
    controller: ['templateOptionsValidators'],
    component: radioComponent
  },
  {
    name: 'select',
    controller: ['templateOptionsValidators'],
    component: selectComponent
  }
]);


WrappersConfig.setWrapper([
  { name: 'label', component: labelWrapper },
  { name: 'descriptionOrError', component: descOrErrorWrapper }
]);

ControllersConfig.addType([
  {
    name: 'templateOptionsValidators',
    controller: {
      componentWillMount() {
        // for initial component adding validation
        const to = this.props.config.templateOptions || {};
        const fieldValidator = this.state.fieldValidator;
        if (fieldValidator) {
          if (to.required) {
            fieldValidator.subscribeToValidation('required', to.required);
          } else {
            fieldValidator.unsubscribeToValidation('required');
          }
          if (to.pattern) {
            fieldValidator.subscribeToValidation('pattern', to.pattern);
          } else {
            fieldValidator.unsubscribeToValidation('pattern');
          }
          if (to.minlength) {
            fieldValidator.subscribeToValidation('minlength', to.minlength);
          } else {
            fieldValidator.unsubscribeToValidation('minlength');
          }
          if (to.maxlength) {
            fieldValidator.subscribeToValidation('maxlength', to.maxlength);
          } else {
            fieldValidator.unsubscribeToValidation('maxlength');
          }
        }
      },
      componentWillUpdate(nextProps) {
        const to = nextProps.config.templateOptions || {};
        const fieldValidator = this.state.fieldValidator;
        if (fieldValidator) {
          if (to.required) {
            fieldValidator.subscribeToValidation('required', to.required);
          } else {
            fieldValidator.unsubscribeToValidation('required');
          }
          if (to.pattern) {
            fieldValidator.subscribeToValidation('pattern', to.pattern);
          } else {
            fieldValidator.unsubscribeToValidation('pattern');
          }
          if (to.minlength) {
            fieldValidator.subscribeToValidation('minlength', to.minlength);
          } else {
            fieldValidator.unsubscribeToValidation('minlength');
          }
          if (to.maxlength) {
            fieldValidator.subscribeToValidation('maxlength', to.maxlength);
          } else {
            fieldValidator.unsubscribeToValidation('maxlength');
          }
        }
      }
    }
  },
  {
    name: 'inputTypeValidators',
    controller: {
      componentWillMount() {
        // for initial component adding validation
        const to = this.props.config.templateOptions || {};
        const fieldValidator = this.state.fieldValidator;
        if (fieldValidator) {
          fieldValidator.unsubscribeToValidation(['email', 'number', 'url']);
          switch (to.type) {
            case 'number':
            case 'email':
            case 'url':
              fieldValidator.subscribeToValidation(to.type);
              break;
            default:
              break;
          }
        }
      },
      componentWillUpdate(nextProps) {
        const to = nextProps.config.templateOptions || {};
        const fieldValidator = this.state.fieldValidator;
        if (fieldValidator) {
          fieldValidator.unsubscribeToValidation(['email', 'number', 'url']);
          switch (to.type) {
            case 'number':
            case 'email':
            case 'url':
              fieldValidator.subscribeToValidation(to.type);
              break;
            default:
              break;
          }
        }
      }
    }
  }
]);

ValidationsConfig.addType({
  required: {
    expression({ viewValue }) {
      let isValid;
      if (_.isString(viewValue)) {
        isValid = _.trim(viewValue).length !== 0;
      } else if (_.isArray(viewValue) || _.isPlainObject(viewValue)) {
        isValid = !_.isEmpty(viewValue);
      } else {
        isValid = viewValue !== null && viewValue !== undefined;
      }
      return isValid;
    }
  },
  url: {
    expression({ viewValue }) {
      const regex = /^([a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:/?#]+|\[[a-f\d:]+\])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?)?$/i;
      return viewValue === undefined || viewValue === null || regex.test(viewValue);
    }
  },
  email: {
    expression({ viewValue }) {
      // eslint-disable-next-line
      const regex = /^((?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*)?$/;
      return viewValue === undefined || viewValue === null || regex.test(viewValue);
    }
  },
  number: {
    expression({ viewValue }) {
      // eslint-disable-next-line
      const regex = /^(\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*)?$/;
      return viewValue === undefined || viewValue === null || regex.test(viewValue);
    }
  },
  pattern: {
    expression({ viewValue, param }) {
      const stringifiedViewValue = _.isString(viewValue) ? viewValue : '';
      return new RegExp(param).test(stringifiedViewValue);
    }
  },
  minlength: {
    expression({ viewValue, param }) {
      return viewValue && viewValue.length >= param;
    }
  },
  maxlength: {
    expression({ viewValue, param }) {
      return (!viewValue && param >= 0) || (viewValue && !(viewValue.length > param));
    }
  }
});
