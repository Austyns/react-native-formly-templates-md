import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  View
} from 'react-native';


class RadioGroup extends Component {
  state = {}

  componentWillMount() {
    if (!_.isEqual(this.state.selectedKey, this.props.selectedItem)) {
      if (this.props.onSelectionChange) this.props.onSelectionChange(this.props.selectedItem);
      this.setState({ selectedKey: this.props.selectedItem });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.state.selectedKey, nextProps.selectedItem)) {
      this.setState({ selectedKey: nextProps.selectedItem });
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.onSelectionChange &&
      !_.isEqual(nextState.selectedKey, this.state.selectedKey)) {
      nextProps.onSelectionChange(nextState.selectedKey);
    }
  }
  _renderValidChildren = () => {
    const buttonOnPress = this._onButtonPress;
    const selectedKey = this.state.selectedKey;
    const that = this;
    const children = React.Children.toArray(this.props.children);
    const uniqueChildren = _.uniqWith(children, (childOne, childTwo) =>
      _.isEqual(childOne.props.id, childTwo.props.id));

    if (children.length > uniqueChildren.length) { console.warn('Duplicate RadioButton ids'); }
    return _.map(uniqueChildren, (child) => {
      if (child.type.displayName === 'RadioButton') {
        return React.cloneElement(child, {
          isSelected: _.isEqual(selectedKey, child.props.id),
          onButtonPress: buttonOnPress,
          color: child.props.color || that.props.color,
          disabledColor: child.props.disabledColor || that.props.disabledColor,
          unselectedColor: child.props.unselectedColor || that.props.unselectedColor,
          scale: child.props.scale || that.props.scale,
          disabled: child.props.disabled || that.props.disabled,
          innerToOuterRatio: child.props.innerToOuterRatio || that.props.innerToOuterRatio,
          labelHorizontal: child.props.labelHorizontal || that.props.labelHorizontal,
          labelFontSize: child.props.labelFontSize || that.props.labelFontSize,
          labelcolor: child.props.labelcolor || that.props.labelcolor
        });
      }

      console.warn('RadioGroup childrens must be of type RadioButton');
      return null;
    });
  }

  _onButtonPress = (id) => {
    this.setState({ selectedKey: id });
  }

  render() {
    return (
      <View {...this.props} style={[{ flexDirection: this.props.formHorizontal ? 'row' : 'column', flexWrap: 'wrap' }]}>
        {this._renderValidChildren()}
      </View>
    );
  }
}

RadioGroup.defaultProps = {
  formHorizontal: false
};

RadioGroup.propTypes = {
  onSelectionChange: PropTypes.func.isRequired,
  selectedItem: PropTypes.any,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired,
  formHorizontal: PropTypes.bool
};


module.exports = RadioGroup;
