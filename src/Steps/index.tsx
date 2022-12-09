import * as React from 'react';
import type { InternalMarkObj } from '../Marks';
import SliderContext from '../context';
import Dot from './Dot';

export interface StepsProps {
  prefixCls: string;
  marks: InternalMarkObj[];
  dots?: boolean;
  style?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);
  activeStyle?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);
}

export default function Steps(props: StepsProps) {
  const { prefixCls, marks, dots, style, activeStyle } = props;
  const { min, max, step } = React.useContext(SliderContext);

  const stepDots: number[] | InternalMarkObj[] = React.useMemo(() => {
    const hasHoverContent = marks.some((mark) => !!mark.hoverContent);

    if (hasHoverContent) {
      const dotArr = [];

      // Add marks with extras
      marks.forEach((mark) => {
        const { value, hoverContent, label } = mark;
        dotArr.push({
          value,
          hoverContent,
          ...(typeof label === 'string' && {
            hoverLabel: label,
          }),
        });
      });

      // In our case, there will never be a step when there
      // is a hover. So we don't need to address that case
      // like it is addressed in the else-block.
      return dotArr;
    } else {
      const dotSet = new Set<number>();

      // Add marks
      marks.forEach((mark) => {
        dotSet.add(mark.value);
      });

      // Fill dots
      if (dots && step !== null) {
        let current = min;
        while (current <= max) {
          dotSet.add(current);
          current += step;
        }
      }

      return Array.from(dotSet);
    }
  }, [min, max, step, dots, marks]);

  return (
    <div className={`${prefixCls}-step`}>
      {stepDots.map((dotValue: number | InternalMarkObj) => {
        if (typeof dotValue === 'number') {
          return (
            <Dot
              prefixCls={prefixCls}
              key={dotValue}
              value={dotValue}
              style={style}
              activeStyle={activeStyle}
              hoverContent={dotValue.toString()}
            />
          );
        } else {
          return (
            <Dot
              prefixCls={prefixCls}
              key={dotValue.value}
              value={dotValue.value}
              activeStyle={activeStyle}
              // Give the dots pointer actions so it is more obvious you
              // can interact with them.
              style={{
                ...style,
                ...{ pointerEvents: 'auto' },
              }}
              // Pass along the extra data to display in the tooltip.
              hoverContent={dotValue.hoverContent}
              hoverLabel={dotValue.hoverLabel}
            />
          );
        }
      })}
    </div>
  );
}
