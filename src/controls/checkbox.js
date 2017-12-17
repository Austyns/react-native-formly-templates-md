import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Ripple from 'react-native-material-ripple';
import {
  Text,
  View,
  Animated
} from 'react-native';


class Checkbox extends Component {
  state = {
    checkboxColor: new Animated.Value(this.props.isSelected ? 1 : 0)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isSelected !== nextProps.isSelected) {
      this.selectionChanged(nextProps.isSelected);
    }
  }

  selectionChanged = (isSelected) => {
    if (isSelected) {
      Animated.timing(this.state.checkboxColor, {
        toValue: 1,
        duration: 400
      }).start();
    } else {
      Animated.timing(this.state.checkboxColor, {
        toValue: 0,
        duration: 150
      }).start();
    }
  }

  _getRadioButtonColor = () => {
    let color;
    if (this.props.disabled) {
      color = this.props.disabledColor;
    } else if (this.props.isSelected) {
      color = this.props.tintColor;
    } else {
      color = this.props.baseColor;
    }
    return color;
  }

  render() {
    const { scale } = this.props;

    const color = this._getRadioButtonColor();
    const size = 24 * scale;
    const borderWidth = 3 * scale;
    const rippleSize = size * 2;
    const currentCheckboxColor = this.state.checkboxColor.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', color]
    });
    // give the label the same padding arround the radio
    const labelPaddingHorizontal = this.props.labelHorizontal ? 0 : size / 2;

    return (
      <View style={{ flexDirection: this.props.labelHorizontal ? 'row' : 'column', alignItems: 'center', alignSelf: 'flex-start' }}>
        <Ripple
          rippleColor={color}
          rippleOpacity={1}
          rippleDuration={400}
          rippleSize={rippleSize}
          rippleContainerBorderRadius={rippleSize / 2}
          rippleCentered
          style={{ height: rippleSize, width: rippleSize }}
          onPress={() => {
            if (this.props.onButtonPress && !this.props.disabled) {
              this.props.onButtonPress(!this.props.isSelected, this.props.id);
            }
          }
          }
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <Animated.View style={
              {
                width: size,
                height: size,
                borderRadius: size / 10,
                borderWidth,
                borderColor: color,
                backgroundColor: currentCheckboxColor
              }

            }
            />
          </View>
        </Ripple>
        <View style={{ paddingHorizontal: labelPaddingHorizontal }}>
          <Text
            style={[this.props.labelStyle, {
              color: this.props.disabled ?
                this.props.disabledColor : this.props.labelColor
            }]}
          >
            {this.props.label}
          </Text>
        </View>
      </View>
    );
  }
}

Checkbox.defaultProps = {
  onButtonPress: () => { },
  isSelected: false,
  tintColor: 'rgb(0, 145, 234)',
  disabledColor: 'rgba(0,0,0,0.26)',
  baseColor: 'rgba(0,0,0,0.54)',
  scale: 1,
  labelHorizontal: true,
  labelColor: 'rgba(0, 0, 0, .87)'
};

Checkbox.propTypes = {
  id: PropTypes.any,
  onButtonPress: PropTypes.func,
  isSelected: PropTypes.bool,
  label: PropTypes.string,
  tintColor: PropTypes.string,
  disabledColor: PropTypes.string,
  baseColor: PropTypes.string,
  scale: PropTypes.number,
  disabled: PropTypes.bool,
  labelHorizontal: PropTypes.bool,
  labelColor: PropTypes.string,
  labelStyle: PropTypes.object
};

module.exports = Checkbox;
