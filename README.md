# React-native-formly: Material Template

## Getting Started
### Prerequisites
This is a material template for [react-native-formly](https://github.com/Assem-Hafez/react-native-formly). So make sure that it is installed first.
### Installing
```
npm install react-native-formly-templates-md --save
```
## Components
### input

`templateOptions` Configuration:

|  name      | description                            | type   						| default
|------------| ---------------------------------------|-------------------------------------------------|--------------
|label	     | Input Label                            | string 						| -
|placeholder | Input placeholder                      | string 						| -
|description | Input description                      | string 						| -
|required    | Input should have a value              | bool   						| -
|disabled    | Input is disabled                      | bool   						| -
|minlength   | Minimum character length to be entered | number 						| -
|maxlength   | Maximum character length to be entered | number 						| -
|type	     | Input text type 		              | string of (`text`, `number`, `url`, `email`, `password`)| 'text'
|pattern     | The property that contains radio value | string regex					|-


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
	
### radio

	
|  name		| description							| type		| default	|
|---------------|---------------------------------------------------------------|---------------|---------------|
|label		| Radio group Label| string					| -		|		|
|description	| Radio group description| string 				| -		|		|
|required	| Radio group should have a value				| bool		| -		|
|disabled	| Radio group is disabled| bool					| -		|		|
|options	| Array of radio buttons to be rendered				| array		|[]		|
|labelProp	| The property that contains radio label if option is object	| string	| 'name'	|
|valueProp	| The property that contains radio value if option is object	| string	| 'value'	|


	Example:
	```js
	{
	    key: 'myMaterialRadio',
	    type: 'radio',
	    templateOptions: {
		label: "Radio Input",
		required:true,
		description : "Select your type",
		options:[
			"string",
			2,
			{name:"array", value:[1,2,3]},
			{name:"date", value: new Date()},
			{name:"object", value:{prop1:"value1"}}
			]

	    }
	}
	```

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

## Roadmap

* [] checkbox
* [] multicheckbox
* [] customizable themes
* [] select
