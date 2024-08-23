import React from 'react';

import { Group } from '@vx/group';

import Axes from './Axes';
import Grid from './Grid';

function Graph() {
    return (
        <Group className="template-grid">
            <Grid />
            <Axes />
        </Group>
    );
}

export default Graph;
