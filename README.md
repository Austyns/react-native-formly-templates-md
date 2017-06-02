# React-native-formly: Material Template

## Getting Started
### Prerequisites
This is a material template for [react-native-formly](https://github.com/Assem-Hafez/react-native-formly). So make sure that it is installed first.
### Installing
```
npm install react-native-formly-templates-md --save
```
## Components
* input
`templateOptions` Configuration:
	* `label`: string
	*  `placeholder`: string
	*  `description` : string
	*  `required`: bool
	*  `disabled`: bool
	*  `minlength`: number
	*  `maxlength`: number
	*  `pattern`: string regex
	*  `type`:  string with one of the following values (`number`, `url`, `email`, `password`).


	Example:
	```js
	{
	    key: 'myMaterialInput',
	    type: 'input',
	    templateOptions: {
		label: "Number Input",
		placeholder:"Write a number here",
		required:true,
	        minlength: 3,
	        type:"number"
	    }
	}
	```
Currently we are working on the rest of the components. (next... select &radio).

## Configuring Validation
Available validations are:

* required
* url
* email
* number
* pattern
* minlength
* maxlength

### Customize validation message
You can customize any of the previous validations messages by adding a message to formly's `MessagesConfig`.
```js
import { Formly, FormlyConfig } from 'react-native-formly';
let {MessagesConfig } = FormlyConfig;

MessagesConfig.addType([
  {
    name: 'required',
    message: "'This field is Required!!!'"
  },
  {
    name: 'number',
    message: "viewValue+' is not a number'"
  }
]);
```
### Overriding validations
If you ever wanted to change a validation you can override it using formly's `ValidationsConfig`. 
```js
import { Formly, FormlyConfig } from 'react-native-formly';
let {ValidationsConfig} = FormlyConfig;

ValidationsConfig.addType({
 minlength: {
    expression: function ({ viewValue, modelValue, param }) {
      return viewValue && viewValue.length >= param;
    },
    message:"'Minimum length is '+ param"
  }
});
```
Make sure that you add this validations after requiring the template
