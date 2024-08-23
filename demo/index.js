import React from 'react';
import { render } from 'react-dom';

import Audiogram from '../src/Audiogram';
import {
    notch2k,
    normal,
    flat40snhl,
    flat40chl,
    mildSensoryPresbycusis,
    moderatelySevereSensoryPresbycusis,
    altNormal,
    risingMiddleEarDysfunction,
    flat60MixedLoss,
    meneires,
    presbycusisPlusOtitis,
    incompleteKid,
} from './sampleAudiograms';

// import './animations.css';

const audiogramsDisplayed = [
    notch2k,
    normal,
    flat40snhl,
    flat40chl,
    mildSensoryPresbycusis,
    moderatelySevereSensoryPresbycusis,
    altNormal,
    risingMiddleEarDysfunction,
    flat60MixedLoss,
    meneires,
    presbycusisPlusOtitis,
    incompleteKid,
];

const App = () => (
    <div className="audiograms" style={{ width: '600px' }}>
        <ul style={{ listStyleType: 'none' }}>
            {audiogramsDisplayed.map((audiogram, index) => {
                return (
                    <li key={index}>
                        <Audiogram responses={audiogram} />
                    </li>
                );
            })}
        </ul>
    </div>
);

render(<App />, document.getElementById('root'));
