import { Point } from '@vx/point';

/**
 * Finds the offset starting point for audiometric response line connectors to ensure that
 * lines do not overlap our response glyphs.  This improves readability and makes the audiogram
 * look more hand-crafted.
 * @param Point start
 * @param Point end
 * @param int   offset - start with 50 - 60% of your glyph width and tweak to look good
 * @returns Point
 */
export function startPointOffset(start, end, offset) {
    const [xDelta, yDelta] = calculateXYDelta(start, end, offset);
    return new Point({ x: start.x + xDelta, y: start.y + yDelta });
}

/**
 * Same as startPointOffset but for the endpoint
 * @param Point start
 * @param Point end
 * @param int offset
 * @returns Point
 */
export function endPointOffset(start, end, offset) {
    const [xDelta, yDelta] = calculateXYDelta(start, end, offset);
    return new Point({ x: end.x - xDelta, y: end.y - yDelta });
}

/**
 * Calculate the distance between two Points. Thank you, Pythagoras
 * @param Point start
 * @param Point end
 * @returns float
 */
export function distance(start, end) {
    const { x: x1, y: y1 } = start;
    const { x: x2, y: y2 } = end;

    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function calculateXYDelta(start, end, offset) {
    const { x: x1, y: y1 } = start;
    const { x: x2, y: y2 } = end;

    const xLength = x2 - x1;
    const yLength = y2 - y1;

    const hypotenuse = distance(start, end);

    const hypotenusePrime = hypotenuse - offset;

    const xDelta = xLength - (hypotenusePrime * xLength) / hypotenuse;
    const yDelta = yLength - (hypotenusePrime * yLength) / hypotenuse;

    return [xDelta, yDelta];
}
