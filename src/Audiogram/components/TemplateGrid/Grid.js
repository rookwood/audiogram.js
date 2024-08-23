import React, { useContext } from 'react';

import VxGrid from './VxGrid/Grid';

import SizeContext from '../sizeContext';
import ThemeContext from '../themeContext';

function Grid() {
    const { graphSize, frequencyScale, amplitudeScale, xMax, yMax } = useContext(SizeContext);
    const theme = useContext(ThemeContext);

    return (
        <VxGrid
            xScale={frequencyScale}
            yScale={amplitudeScale}
            numTicksColumns={10}
            columnTickValues={columns}
            width={xMax}
            height={yMax}
            stroke={theme.lightGray}
        />
    );
}

const frequencyTickValues = size => {
    return size >= 200 ? [250, 500, 1000, 2000, 300, 4000, 6000, 8000] : [250, 1000, 4000];
};

export default Grid;

const columns = [250, 500, 750, 1000, 1500, 2000, 3000, 4000, 6000, 8000, 10000];
