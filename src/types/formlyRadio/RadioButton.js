import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Ripple from 'react-native-material-ripple';
import {
  Text,
  View,
  Easing,
  Animated
} from 'react-native';


class RadioButton extends Component {
  state = {
    innerScaleValue: new Animated.Value(this.props.isSelected ? 1 : 0)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isSelected !== nextProps.isSelected) {
      this.selectionChanged(nextProps.isSelected);
    }
  }

  selectionChanged = (isSelected) => {
    if (isSelected) {
      Animated.timing(this.state.innerScaleValue, {
        toValue: 1,
        duration: 400,
        easing: Easing.bounce
      }).start();
    } else {
      Animated.timing(this.state.innerScaleValue, {
        toValue: 0,
        duration: 150,
        easing: Easing.bounce
      }).start();
    }
  }

  _getRadioButtonColor = () => {
    let color;
    if (this.props.disabled) {
      color = this.props.disabledColor;
    } else if (this.props.isSelected) {
      color = this.props.color;
    } else {
      color = this.props.unselectedColor;
    }
    return color;
  }

  render() {
    const { scale, innerToOuterRatio } = this.props;

    const color = this._getRadioButtonColor();
    const outerSize = 24 * scale;
    const outerBorderWidth = 3 * scale;
    const rippleSize = outerSize * 2;
    const maxInnerSize = (outerSize - (outerBorderWidth * 2)) * innerToOuterRatio;
    const currentInnerSize = this.state.innerScaleValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, maxInnerSize]
    });

    return (
      <View style={{ flexDirection: this.props.labelHorizontal ? 'row' : 'column', alignSelf: 'flex-start' }}>
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
              this.props.onButtonPress(this.props.id);
            }
          }
          }
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <View
              style={{
                width: outerSize,
                height: outerSize,
                borderRadius: outerSize / 2,
                borderColor: color,
                borderWidth: outerBorderWidth,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Animated.View style={
                {
                  width: currentInnerSize,
                  height: currentInnerSize,
                  borderRadius: maxInnerSize / 2,
                  backgroundColor: color
                }

              }
              />
            </View>
          </View>
        </Ripple>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>{this.props.label}</Text>
        </View>
      </View>
    );
  }
}

RadioButton.defaultProps = {
  onButtonPress: () => { },
  isSelected: false,
  color: '#2196f3',
  disabledColor: 'rgba(0,0,0,0.26)',
  unselectedColor: 'rgba(0,0,0,0.54)',
  scale: 1,
  innerToOuterRatio: 0.65,
  labelHorizontal: true
};

RadioButton.propTypes = {
  id: PropTypes.any,
  onButtonPress: PropTypes.func,
  isSelected: PropTypes.bool,
  label: PropTypes.string,
  color: PropTypes.string,
  disabledColor: PropTypes.string,
  unselectedColor: PropTypes.string,
  scale: PropTypes.number,
  disabled: PropTypes.bool,
  innerToOuterRatio: PropTypes.number,
  labelHorizontal: PropTypes.bool
};

module.exports = RadioButton;
