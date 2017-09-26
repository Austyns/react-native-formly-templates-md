import _ from 'lodash';

export function extractLabelAndValueFromOption(labelProp = 'name', valueProp = 'value', option) {
  let extractedLabelAndValue = { label: '', value: undefined };
  // helper function that makes sure that label is string 
  function perpareLabelAndValue(l, v) {
    const label = _.isString(l) ? l : JSON.stringify(l);
    const value = v;
    return { label, value };
  }
  /* the options could be in one of the following formats:
      -literal value
      -object with a label and value 
      (the default value of the label and value is "name" and "value" respectively)
     */
  // if the option is a literal value  make it the label and the value
  if (_.isString(option) || _.isNumber(option)) {
    extractedLabelAndValue = perpareLabelAndValue(option, option);
  } else if (_.isPlainObject(option)) {
    // if the option is a object take the value of the labelprop 
    // to the label and the value of valueprop to value
    extractedLabelAndValue = perpareLabelAndValue(option[labelProp], option[valueProp]);
  } else {
    extractedLabelAndValue = perpareLabelAndValue(option, option);
  }

  return extractedLabelAndValue;
}

export function valueExistsInOptions(labelProp, valueProp, options, model) {
  let valueExistInOptions = false;
  // check if the value from recieved exists inside the available options 
  if (Array.isArray(options)) {
    options.forEach((option) => {
      const { value } = extractLabelAndValueFromOption(labelProp, valueProp, option);
      if (_.isEqual(value, model)) { valueExistInOptions = true; }
    }, this);
  }

  return valueExistInOptions;
}
