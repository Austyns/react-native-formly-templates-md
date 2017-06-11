'use strict'

import React from 'react'
import Ripple from 'react-native-material-ripple';
import _ from 'lodash';
import {
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    LayoutAnimation,
    StyleSheet,
    Animated,
    Easing
} from 'react-native';


var RadioGroup = React.createClass({
    getDefaultProps: function () {
        return {
            formHorizontal: false,
        }
    },
    getInitialState: function () {
        return {};
    },
    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.state.selectedKey, nextProps.selectedItem))
            this.setState({ selectedKey: nextProps.selectedItem });
    },
    componentWillMount() {
        if (!_.isEqual(this.state.selectedKey, this.props.selectedItem)) {
            if (this.props.onSelectionChange) this.props.onSelectionChange(this.props.selectedItem);
            this.setState({ selectedKey: this.props.selectedItem });
        }
    },
    componentWillUpdate(nextProps, nextState) {
        if (nextProps.onSelectionChange && !_.isEqual(nextState.selectedKey, this.state.selectedKey))
            nextProps.onSelectionChange(nextState.selectedKey);
    },
    _renderValidChildren() {
        let buttonOnPress = this._onButtonPress;
        let selectedKey = this.state.selectedKey;
        let that = this;
        let children = React.Children.toArray(this.props.children);
        let uniqueChildren = _.uniqWith(children, (childOne, childTwo) => _.isEqual(childOne.props.id, childTwo.props.id));
        if (children.length > uniqueChildren.length)
            console.warn('Duplicate RadioButton ids');
        return _.map(uniqueChildren, function (child) {
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
                    labelcolor: child.props.labelcolor || that.props.labelcolor,
                })
            }
            else {
                console.warn('RadioGroup childrens must be of type RadioButton');
                return null
            }
        });

    },
    render: function () {

        return (
            <View {...this.props} style={[{ flexDirection: this.props.formHorizontal ? "row" : "column", flexWrap: 'wrap' }]}>
                {this._renderValidChildren()}
            </View>
        );
    },
    _onButtonPress: function (id) {
        this.setState({ selectedKey: id });
    }

});


let RadioButton = React.createClass({
    propTypes: {
        id: React.PropTypes.any,
        onButtonPress: React.PropTypes.func,
        label: React.PropTypes.string,
        color: React.PropTypes.string,
        disabledColor: React.PropTypes.string,
        unselectedColor: React.PropTypes.string,
        scale: React.PropTypes.number,
        disabled: React.PropTypes.bool,
        innerToOuterRatio: React.PropTypes.number,
        labelHorizontal: React.PropTypes.bool,
        labelFontSize: React.PropTypes.number,
        labelcolor: React.PropTypes.string,

    },
    getDefaultProps: function () {
        return {
            onButtonPress: () => { },
            color: "#2196f3",
            disabledColor: "rgba(0,0,0,0.26)",
            unselectedColor: "rgba(0,0,0,0.54)",
            scale: 1,
            innerToOuterRatio: 0.65,
            labelHorizontal: true,
        }
    },
    getInitialState: function () {
        return {
            innerScaleValue: new Animated.Value(this.props.isSelected ? 1 : 0),
        }
    },
    selectionChanged(isSelected) {
        if (isSelected) {
            Animated.timing(this.state.innerScaleValue, {
                toValue: 1,
                duration: 400,
                easing: Easing.bounce,
            }).start();
        }
        else {
            Animated.timing(this.state.innerScaleValue, {
                toValue: 0,
                duration: 150,
                easing: Easing.bounce,
            }).start();
        }
    },
    componentWillReceiveProps(nextProps) {
        if (this.props.isSelected !== nextProps.isSelected)
            this.selectionChanged(nextProps.isSelected)
    },
    _getRadioButtonColor() {
        let color;
        if (this.props.disabled) {
            color = this.props.disabledColor
        }
        else {
            if (this.props.isSelected)
                color = this.props.color;
            else
                color = this.props.unselectedColor;
        }
        return color;
    },
    render() {
        let { scale, innerToOuterRatio } = this.props;

        let color = this._getRadioButtonColor();
        let outerSize = 24 * scale;
        let outerBorderWidth = 3 * scale;
        let rippleSize = outerSize * 2;
        let maxInnerSize = (outerSize - outerBorderWidth * 2) * innerToOuterRatio;
        let currentInnerSize = this.state.innerScaleValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, maxInnerSize]
        });

        return (
            <View style={{ flexDirection: this.props.labelHorizontal ? "row" : "column", alignSelf: "flex-start" }}>
                <Ripple
                    rippleColor={color}
                    rippleOpacity={1}
                    rippleDuration={400}
                    rippleSize={rippleSize}
                    rippleContainerBorderRadius={rippleSize / 2}
                    rippleCentered={true}
                    style={{ height: rippleSize, width: rippleSize }}
                    onPress={() => { if (this.props.onButtonPress && !this.props.disabled) this.props.onButtonPress(this.props.id) }}>
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
                            }}>
                            <Animated.View style={
                                {
                                    width: currentInnerSize,
                                    height: currentInnerSize,
                                    borderRadius: maxInnerSize / 2,
                                    backgroundColor: color
                                }

                            }></Animated.View>
                        </View>
                    </View>
                </Ripple>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Text>{this.props.label}</Text>
                </View>
            </View>
        )
    }

});

module.exports.RadioGroup = RadioGroup;
module.exports.RadioButton = RadioButton;