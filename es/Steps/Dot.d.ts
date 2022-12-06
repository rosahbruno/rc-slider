import * as React from 'react';
import 'rc-tooltip/assets/bootstrap.css';
export interface DotProps {
    prefixCls: string;
    value: number;
    style?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);
    activeStyle?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);
    hoverContent?: string;
}
export default function Dot(props: DotProps): JSX.Element;
