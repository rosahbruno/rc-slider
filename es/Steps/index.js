import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import * as React from 'react';
import SliderContext from '../context';
import Dot from './Dot';
export default function Steps(props) {
  var prefixCls = props.prefixCls,
    marks = props.marks,
    dots = props.dots,
    style = props.style,
    activeStyle = props.activeStyle;
  var _React$useContext = React.useContext(SliderContext),
    min = _React$useContext.min,
    max = _React$useContext.max,
    step = _React$useContext.step;
  var stepDots = React.useMemo(function () {
    var hasHoverContent = marks.some(function (mark) {
      return !!mark.hoverContent;
    });
    if (hasHoverContent) {
      var dotArr = [];
      // Add marks with extras
      marks.forEach(function (mark) {
        var value = mark.value,
          hoverContent = mark.hoverContent;
        dotArr.push({
          value: value,
          hoverContent: hoverContent
        });
      });
      // In our case, there will never be a step when there
      // is a hover. So we don't need to address that case
      // like it is addressed in the else-block.
      return dotArr;
    } else {
      var dotSet = new Set();
      // Add marks
      marks.forEach(function (mark) {
        dotSet.add(mark.value);
      });
      // Fill dots
      if (dots && step !== null) {
        var current = min;
        while (current <= max) {
          dotSet.add(current);
          current += step;
        }
      }
      return Array.from(dotSet);
    }
  }, [min, max, step, dots, marks]);
  return /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-step")
  }, stepDots.map(function (dotValue) {
    if (typeof dotValue === 'number') {
      return /*#__PURE__*/React.createElement(Dot, {
        prefixCls: prefixCls,
        key: dotValue,
        value: dotValue,
        style: style,
        activeStyle: activeStyle,
        hoverContent: dotValue.toString()
      });
    } else {
      return /*#__PURE__*/React.createElement(Dot, {
        prefixCls: prefixCls,
        key: dotValue.value,
        value: dotValue.value,
        activeStyle: activeStyle
        // Give the dots pointer actions so it is more obvious you
        // can interact with them.
        ,
        style: _objectSpread(_objectSpread({}, style), {
          pointerEvents: 'auto'
        })
        // Pass along the extra data to display in the tooltip.
        ,
        hoverContent: dotValue.hoverContent
      });
    }
  }));
}