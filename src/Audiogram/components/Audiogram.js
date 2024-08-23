import React, { useEffect, useState } from 'react';

import { Group } from '@vx/group';
import { withSize } from 'react-sizeme';
import { scaleLog, scaleLinear } from '@vx/scale';

import Graph from './TemplateGrid/Graph';
import ResponseLine from './ResponseMarkers/ResponseLine';

import SizeContext, { margin } from './sizeContext';
import ThemeContext, { defaultTheme } from './themeContext';

import ResponseCollection from '../ResponseCollection';

function Audiogram(props) {
    const graphSize = props.size.width;

    const xMax = graphSize - margin.left - margin.right;
    const yMax = graphSize - margin.top - margin.bottom;

    const displayScale = graphSize / 600;

    const frequencyScale = scaleLog({
        range: [0, xMax],
        domain: [175, 10000],
    });

    const amplitudeScale = scaleLinear({
        range: [0, yMax],
        domain: [-15, 125],
    });

    const sizeAmalgamation = {
        graphSize,
        displayScale,
        frequencyScale,
        amplitudeScale,
        xMax,
        yMax,
        margin,
    };

    return (
        <div className="audiogram">
            <svg width={graphSize} height={graphSize} viewBox={`0 0 ${graphSize} ${graphSize}`}>
                <Group top={margin.top} left={margin.left} className={`audiogram-${props.audiogram_id || 'undefined'}`}>
                    <SizeContext.Provider value={sizeAmalgamation}>
                        <ThemeContext.Provider value={defaultTheme}>
                            <Graph />
                            <ResponseLine responses={ResponseCollection.from(props.responses)} />
                        </ThemeContext.Provider>
                    </SizeContext.Provider>
                </Group>
            </svg>
        </div>
    );
}

export default withSize({ refreshRate: 32 })(Audiogram);
