import React from 'react';
import { Glyph } from '@vx/glyph';
import markers from '../../icons';

const AudiometricSymbol = props => {
    const [ear, modality, masking] = props.type.split('.');
    const icon = markers[modality][ear][masking];
    const scale = props.glyphScale ? props.glyphScale * icon.defaultScale : icon.defaultScale;

    let top = props.plot.y - (icon.defaultSize.y / 2) * scale + icon.defaultOffset.y * scale;
    let left = props.plot.x - (icon.defaultSize.x / 2) * scale + icon.defaultOffset.x * scale;

    if (props.tightenSpacing) {
        left -= icon.defaultOffset.x * scale * 0.4;
    }

    return (
        <Glyph top={top} left={left}>
            <path
                stroke={props.color}
                strokeWidth={1.25}
                fill={props.color}
                transform={`scale(${scale})`}
                className={`vx-glyph ${props.type}`}
                d={icon.path}
            />
        </Glyph>
    );
};

export default AudiometricSymbol;
