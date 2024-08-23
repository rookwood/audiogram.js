import {
    distance,
    startPointOffset,
    endPointOffset
} from '../../src/Audiogram/calculations/pointOffset';

describe('calculate coordinates for response lines', () => {
    const startA = { x: 0, y: 0 };
    const endA = { x: 10, y: 0 };

    const startB = { x: 0, y: 5 };
    const endB = { x: 12, y: 0 };

    test('calculate the distance between two points', () => {
        expect(distance(startA, endA)).toEqual(10);
        expect(distance(startB, endB)).toEqual(13);
    });

    test('calculate a point on a line given an offset', () => {
        expect(startPointOffset(startA, endA, 4)).toEqual({ x: 4, y: 0 });
        expect(startPointOffset(startB, endB, 4).x).toBeCloseTo(3.69, 2);
        expect(startPointOffset(startB, endB, 4).y).toBeCloseTo(3.46, 2);

        expect(endPointOffset(startA, endA, 4)).toEqual({ x: 6, y: 0 });
        expect(endPointOffset(startB, endB, 4).x).toBeCloseTo(8.31, 2);
        expect(endPointOffset(startB, endB, 4).y).toBeCloseTo(1.54, 2);
    });
});
