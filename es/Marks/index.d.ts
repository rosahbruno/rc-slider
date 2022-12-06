import * as React from 'react';
export interface MarkObj {
    style?: React.CSSProperties;
    label?: React.ReactNode;
    hoverContent?: string;
}
export interface InternalMarkObj extends MarkObj {
    value: number;
    hoverContent?: string;
}
export interface MarksProps {
    prefixCls: string;
    marks?: InternalMarkObj[];
    onClick: (value: number) => void;
}
export default function Marks(props: MarksProps): JSX.Element;
