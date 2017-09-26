import * as helpers from './../../src/helpers';

describe('Helpers', () => {
  describe('extracting label and value from option', () => {
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
      it('should not be affected by labelProp and valueProp', () => {
        this.labelProp = 'myLabelProp';
        this.valueProp = 'myValueProp';
        const { label, value } = helpers.extractLabelAndValueFromOption(
          this.labelProp,
          this.valueProp,
          this.option);
        expect(label).toBe(this.option);
        expect(value).toBe(this.option);
      });
    });
  });
});
