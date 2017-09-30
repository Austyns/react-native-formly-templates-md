import * as helpers from './../../src/helpers';

describe('Helpers', () => {
  describe('extracting label and value from option', () => {
    it('label should always be a string', () => {
      const numberOption = 2;
      const stringOption = 'string';
      const arrayOption = [1, '2'];
      const dateOption = new Date();
      const patternOption = /matchpattern/g;
      const objectOption = { name: { firstname: 'assem', lastname: 'hafez' } };

      const extractedNumberOption = helpers.extractLabelAndValueFromOption(
        undefined,
        undefined,
        numberOption);
      expect(typeof extractedNumberOption.label).toBe('string');

      const extractedStringOption = helpers.extractLabelAndValueFromOption(
        undefined,
        undefined,
        stringOption);
      expect(typeof extractedStringOption.label).toBe('string');

      const extractedArrayOption = helpers.extractLabelAndValueFromOption(
        undefined,
        undefined,
        arrayOption);
      expect(typeof extractedArrayOption.label).toBe('string');

      const extractedDateOption = helpers.extractLabelAndValueFromOption(
        undefined,
        undefined,
        dateOption);
      expect(typeof extractedDateOption.label).toBe('string');

      const extractedPatternOption = helpers.extractLabelAndValueFromOption(
        undefined,
        undefined,
        patternOption);
      expect(typeof extractedPatternOption.label).toBe('string');

      const extractedObjectOption = helpers.extractLabelAndValueFromOption(
        undefined,
        undefined,
        objectOption);
      expect(typeof extractedObjectOption.label).toBe('string');
    });

    describe('extracting from string option', () => {
      beforeEach(() => {
        this.option = 'stringOption';
        this.labelProp = undefined;
        this.valueProp = undefined;
      });
      it('should extract label and value with the same value of the string option', () => {
        const { label, value } = helpers.extractLabelAndValueFromOption(
          this.labelProp,
          this.valueProp,
          this.option);
        expect(label).toBe(this.option);
        expect(value).toBe(this.option);
      });
    });

    describe('extracting from numeric option', () => {
      beforeEach(() => {
        this.option = 2;
        this.strigifiedOption = '2';
        this.labelProp = undefined;
        this.valueProp = undefined;
      });
      it('should extract label as a stringified value of the numeric option', () => {
        const { label } = helpers.extractLabelAndValueFromOption(
          this.labelProp,
          this.valueProp,
          this.option);
        expect(label).toBe(this.strigifiedOption);
      });

      it('should extract value with the same value of the numeric option', () => {
        const { value } = helpers.extractLabelAndValueFromOption(
          this.labelProp,
          this.valueProp,
          this.option);
        expect(value).toBe(this.option);
      });
    });

    describe('extracting from array option', () => {
      beforeEach(() => {
        this.option = [1, '2'];
        this.strigifiedOption = '[1,"2"]';
        this.labelProp = undefined;
        this.valueProp = undefined;
      });
      it('should extract label as a stringified value of the array option', () => {
        const { label } = helpers.extractLabelAndValueFromOption(
          this.labelProp,
          this.valueProp,
          this.option);
        expect(label).toBe(this.strigifiedOption);
      });

      it('should extract value with the same value of the numeric option', () => {
        const { value } = helpers.extractLabelAndValueFromOption(
          this.labelProp,
          this.valueProp,
          this.option);
        expect(value).toBe(this.option);
      });
    });

    describe('extracting from object option', () => {
      it('should extract label as a stringified value of the option\'s labelProp value', () => {
        const option = { myLabelProp: 2, myValueProp: [1, '2'] };
        const labelProp = 'myLabelProp';
        const valueProp = 'myValueProp';
        const stringifiedLabelPropValue = '2';
        const { label } = helpers.extractLabelAndValueFromOption(
          labelProp,
          valueProp,
          option);
        expect(label).toBe(stringifiedLabelPropValue);
      });

      it('should extract value with the same value of the option\'s valueProp value', () => {
        const option = { myLabelProp: 2, myValueProp: [1, '2'] };
        const labelProp = 'myLabelProp';
        const valueProp = 'myValueProp';
        const { value } = helpers.extractLabelAndValueFromOption(
          labelProp,
          valueProp,
          option);
        expect(value).toBe(option[valueProp]);
      });

      it('should extract label as a stringified value of the option\'s "name" value if labelProp is undefined', () => {
        const option = { name: 'mylabel', myValueProp: [1, '2'] };
        const labelProp = undefined;
        const valueProp = 'myValueProp';
        const { label } = helpers.extractLabelAndValueFromOption(
          labelProp,
          valueProp,
          option);
        expect(label).toBe(option.name);
      });

      it('should extract value with the same value of the option\'s "value" value if valueProp is undefined', () => {
        const option = { myLabelProp: 2, value: [1, '2'] };
        const labelProp = 'myLabelProp';
        const valueProp = undefined;
        const { value } = helpers.extractLabelAndValueFromOption(
          labelProp,
          valueProp,
          option);
        expect(value).toBe(option.value);
      });
    });
  });
});
