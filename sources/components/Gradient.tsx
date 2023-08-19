import React, { memo } from 'react';
import Svg, {
  Defs,
  LinearGradient,
  Rect,
  Stop,
  SvgProps,
} from 'react-native-svg';

type GradientProps = SvgProps & {
  startColor?: string;
  startOpacity?: number;
  startOffset?: number;
  endColor?: string;
  endOpacity?: number;
  endOffset?: number;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
};

export const Gradient = memo(
  ({
    startColor = 'tomato',
    startOpacity = 1,
    startOffset = 0,
    endColor = 'green',
    endOpacity = 1,
    endOffset = 1,
    x1 = 0,
    y1 = 0,
    x2 = 0,
    y2 = 1,
    ...props
  }: GradientProps) => {
    return (
      <Svg {...props}>
        <Rect width="100%" height="100%" fill="url(#gradient)" />
        <Defs>
          <LinearGradient id="gradient" x1={x1} y1={y1} x2={x2} y2={y2}>
            <Stop
              offset={startOffset}
              stopColor={startColor}
              stopOpacity={startOpacity}
            />
            <Stop
              offset={endOffset}
              stopColor={endColor}
              stopOpacity={endOpacity}
            />
          </LinearGradient>
        </Defs>
      </Svg>
    );
  },
);
