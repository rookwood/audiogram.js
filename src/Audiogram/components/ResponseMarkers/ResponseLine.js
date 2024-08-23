import React, { useContext } from 'react';
import cx from 'classnames';
import { Line } from '@vx/shape';
import { Point } from '@vx/point';
import AudiometricSymbol from './AudiometricSymbol';

import SizeContext from '../sizeContext';
import ThemeContext from '../themeContext';

import { startPointOffset, endPointOffset } from '../../calculations/pointOffset';

const ResponseLine = props => {
    const { frequencyScale, amplitudeScale, displayScale } = useContext(SizeContext);
    const theme = useContext(ThemeContext);

    const mapEarToColor = color => {
        switch (color) {
            case 'right':
                return theme.red;
            case 'left':
                return theme.blue;
            default:
                return theme.darkGray;
        }
    };

    return props.responses.partition().map((responseCollection, index) => {
        return (
            <g
                key={index}
                className={cx(
                    'response-line',
                    `response-line-${responseCollection.responses[0].modality}`,
                    `response-line-${responseCollection.responses[0].ear}`,
                )}
            >
                {responseCollection.reduce(function(responseLine, response, index) {
                    const location = new Point({
                        x: frequencyScale(x(response)),
                        y: amplitudeScale(y(response)),
                    });

                    const tightenSpacing =
                        response.isBoneConduction() && props.responses.hasAirBoneGap(response.frequency);

                    responseLine.push(
                        <AudiometricSymbol
                            key={response.key()}
                            type={response.type()}
                            plot={location}
                            color={mapEarToColor(response.ear)}
                            glyphScale={displayScale}
                            tightenSpacing={tightenSpacing}
                        />,
                    );

                    if (responseCollection.needsLineToNextMarker(index)) {
                        const start = new Point({
                            x: frequencyScale(x(response)),
                            y: amplitudeScale(y(response)),
                        });

                        const end = new Point({
                            x: frequencyScale(x(responseCollection.next(index))),
                            y: amplitudeScale(y(responseCollection.next(index))),
                        });

                        const from = startPointOffset(start, end, displayScale * 16);
                        const to = endPointOffset(start, end, displayScale * 16);

                        responseLine.push(
                            <Line
                                key={`${response.frequency}.${responseCollection.next(index).frequency}`}
                                from={from}
                                to={to}
                                stroke={mapEarToColor(response.ear)}
                                strokeWidth={1.5}
                                opacity={0.66}
                            />,
                        );
                    }

                    return responseLine;
                }, [])}
            </g>
        );
    });
};

const x = response => response.frequency;
const y = response => response.amplitude;

export default ResponseLine;
