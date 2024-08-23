import React, { useContext } from 'react';

import { AxisBottom, AxisLeft, AxisRight, AxisTop } from '@vx/axis';
import { Group } from '@vx/group';

import SizeContext from '../sizeContext';
import ThemeContext from '../themeContext';

function Axes() {
    const { graphSize, frequencyScale, amplitudeScale, xMax, yMax } = useContext(SizeContext);
    const theme = useContext(ThemeContext);

    const frequencyTickValues = graphSize >= 200 ? [250, 500, 1000, 2000, 4000, 8000] : [250, 1000, 4000];

    const frequencyTickFormat = (value, index) => {
        if (graphSize >= 350) {
            return value > 999 ? `${value / 1000} kHz` : `${value} Hz`;
        }

        return value > 999 ? `${value / 1000}k` : value;
    };

    // If the graph is large, show labels in 10 dB increments; use 20 dB if small to avoid cramped text
    const amplitudeTickValues =
        graphSize > 250 ? Array.from(Array(14), (_, n) => (n - 1) * 10) : Array.from(Array(7), (_, n) => n * 20);

    const tickTextProps = (tickValue, index) => ({
        textAnchor: 'middle',
        fontFamily: theme.font,
        fontSize: theme.fontSize,
        fill: theme.mediumGray,
    });

    const labelTextProps = {
        textAnchor: 'middle',
        fontFamily: theme.font,
        fontSize: theme.fontSize,
        fill: theme.darkGray,
    };

    return (
        <Group className="template-grid-axes">
            <AxisTop
                top={0}
                left={-1}
                stroke={theme.darkGray}
                strokeWidth={1}
                scale={frequencyScale}
                hideTicks={true}
                tickFormat={frequencyTickFormat}
                tickValues={frequencyTickValues}
                numTicks={6}
                tickLabelProps={tickTextProps}
                labelProps={labelTextProps}
            />
            <AxisLeft
                top={-1}
                label="dB HL"
                stroke={theme.darkGray}
                scale={amplitudeScale}
                hideTicks={true}
                tickValues={amplitudeTickValues}
                tickLabelProps={tickTextProps}
                labelProps={tickTextProps}
                tickLabelProps={tickTextProps}
                labelProps={labelTextProps}
            />
            <AxisBottom
                stroke={theme.darkGray}
                scale={frequencyScale}
                hideTicks={true}
                tickFormat={frequencyTickFormat}
                tickValues={graphSize > 250 ? [1500, 3000, 6000] : []}
                top={yMax}
                left={-1}
                tickLabelProps={tickTextProps}
                labelProps={labelTextProps}
            />
            <AxisRight stroke={theme.darkGray} left={xMax - 0.5} scale={amplitudeScale} numTicks={0} />
        </Group>
    );
}

export default Axes;
