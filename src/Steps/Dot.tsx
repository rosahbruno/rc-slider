import * as React from 'react';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import classNames from 'classnames';
import { getDirectionStyle } from '../util';
import SliderContext from '../context';

export interface DotProps {
  prefixCls: string;
  value: number;
  style?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);
  activeStyle?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);
  hoverContent?: string;
}

export default function Dot(props: DotProps) {
  const { prefixCls, value, style, activeStyle, hoverContent } = props;
  const { min, max, direction, included, includedStart, includedEnd } =
    React.useContext(SliderContext);

  const dotClassName = `${prefixCls}-dot`;
  const active = included && includedStart <= value && value <= includedEnd;

  // ============================ Offset ============================
  let mergedStyle = {
    ...getDirectionStyle(direction, value, min, max),
    ...(typeof style === 'function' ? style(value) : style),
  };

  if (active) {
    mergedStyle = {
      ...mergedStyle,
      ...(typeof activeStyle === 'function' ? activeStyle(value) : activeStyle),
    };
  }

  if (!!hoverContent) {
    return (
      <Tooltip
        placement="bottom"
        trigger={['hover']}
        overlay={
          <span>
            {hoverContent}
            <br />
            {value}
          </span>
        }
      >
        <span
          className={classNames(dotClassName, {
            [`${dotClassName}-active`]: active,
          })}
          style={{
            ...mergedStyle,
            ...{
              // High z-index so that we hit the hover event first. The handle
              // is still able to be grabbed, just on the outsides.
              zIndex: 1000,
            },
          }}
        />
      </Tooltip>
    );
  }

  return (
    <span
      className={classNames(dotClassName, {
        [`${dotClassName}-active`]: active,
      })}
      style={mergedStyle}
    />
  );
}
