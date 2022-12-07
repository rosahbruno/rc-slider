import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import * as React from 'react';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import classNames from 'classnames';
import { getDirectionStyle } from '../util';
import SliderContext from '../context';
export default function Dot(props) {
  var prefixCls = props.prefixCls,
    value = props.value,
    style = props.style,
    activeStyle = props.activeStyle,
    hoverContent = props.hoverContent,
    hoverLabel = props.hoverLabel;
  var _React$useContext = React.useContext(SliderContext),
    min = _React$useContext.min,
    max = _React$useContext.max,
    direction = _React$useContext.direction,
    included = _React$useContext.included,
    includedStart = _React$useContext.includedStart,
    includedEnd = _React$useContext.includedEnd;
  var dotClassName = "".concat(prefixCls, "-dot");
  var active = included && includedStart <= value && value <= includedEnd;
  // ============================ Offset ============================
  var mergedStyle = _objectSpread(_objectSpread({}, getDirectionStyle(direction, value, min, max)), typeof style === 'function' ? style(value) : style);
  if (active) {
    mergedStyle = _objectSpread(_objectSpread({}, mergedStyle), typeof activeStyle === 'function' ? activeStyle(value) : activeStyle);
  }
  if (!!hoverContent) {
    return /*#__PURE__*/React.createElement(Tooltip, {
      placement: "bottom",
      trigger: ['hover'],
      overlay: /*#__PURE__*/React.createElement("span", null, hoverContent, /*#__PURE__*/React.createElement("br", null), hoverLabel)
    }, /*#__PURE__*/React.createElement("span", {
      className: classNames(dotClassName, _defineProperty({}, "".concat(dotClassName, "-active"), active)),
      style: _objectSpread(_objectSpread({}, mergedStyle), {
        // High z-index so that we hit the hover event first. The handle
        // is still able to be grabbed, just on the outsides.
        zIndex: 1000
      })
    }));
  }
  return /*#__PURE__*/React.createElement("span", {
    className: classNames(dotClassName, _defineProperty({}, "".concat(dotClassName, "-active"), active)),
    style: mergedStyle
  });
}