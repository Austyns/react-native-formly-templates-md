import _ from 'lodash';

export function extractLabelAndValueFromOption(labelProp, valueProp, option) {
    let extractedLabelAndValue = { label: "", value: undefined };
    //helper function that makes sure that label is string 
    let perpareLabelAndValue = function (l, v) {
        let label = _.isString(l) ? l : JSON.stringify(l);
        let value = v;
        return { label, value }
    }
    /*the options could be in one of the following formats:
      -literal value
      -object with a label and value (the default value of the label and value is "name" and "value" respectively)
     */
    //if the option is a literal value  make it the label and the value
    if (_.isString(option) || _.isNumber(option)) {
        extractedLabelAndValue = perpareLabelAndValue(option, option);
    }
    //if the option is a object take the value of the labelprop to the label and the value of valueprop to value
    else if (_.isPlainObject(option)) {
        labelProp = labelProp || 'name';
        valueProp = valueProp || 'value';
        extractedLabelAndValue = perpareLabelAndValue(option[labelProp], option[valueProp]);
    }
    else {
        extractedLabelAndValue = perpareLabelAndValue(option, option);
    }

    return extractedLabelAndValue;
}

export function valueExistsInOptions(labelProp, valueProp, options, model) {

    let valueExistInOptions = false;
    if (Array.isArray(options))
        //check if the value from recieved exists inside the available options 
        options.forEach(function (option, index) {
            let { value } = extractLabelAndValueFromOption(labelProp, valueProp, option);
            if (_.isEqual(value, model))
                valueExistInOptions = true;
        }, this);

    return valueExistInOptions;

}

export function scientificNumberToDecimalString(num) {
    //if the number is in scientific notation remove it
    if (/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
        var zero = '0',
            parts = String(num).toLowerCase().split('e'), //split into coeff and exponent
            e = parts.pop(),//store the exponential part
            l = Math.abs(e), //get the number of zeros
            sign = e / l,
            coeff_array = parts[0].split('.');
        if (sign === -1) {
            num = zero + '.' + new Array(l).join(zero) + coeff_array.join('');
        }
        else {
            var dec = coeff_array[1];
            if (dec) l = l - dec.length;
            num = coeff_array.join('') + new Array(l + 1).join(zero);
        }
    }

    return num;
};