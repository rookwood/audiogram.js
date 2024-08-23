import ResponseCollection from '../src/Audiogram/ResponseCollection';

describe('ResponseCollection', () => {
    test('Construct from array of Responses', () => {
        const rawResponses = [
            {
                amplitude: 20,
                ear: 'right',
                frequency: 500,
            },
            {
                amplitude: 20,
                ear: 'right',
                frequency: 1000,
            },
            {
                amplitude: 20,
                ear: 'right',
                frequency: 2000,
            },
        ];

        const collection = ResponseCollection.from(rawResponses);

        expect(collection.responses.length).toBe(rawResponses.length);
    });

    test('Get the next response', () => {
        const rawResponses = [
            {
                amplitude: 20,
                ear: 'right',
                frequency: 500,
            },
            {
                amplitude: 20,
                ear: 'right',
                frequency: 1000,
            },
            {
                amplitude: 20,
                ear: 'right',
                frequency: 2000,
            },
        ];

        const collection = ResponseCollection.from(rawResponses);

        expect(collection.next(1).frequency).toBe(2000);
    });

    test('Determines if a <Line /> is required to the next Response', () => {
        const rawResponses = [
            {
                amplitude: 20,
                ear: 'right',
                frequency: 500,
            },
            {
                amplitude: 20,
                ear: 'right',
                frequency: 1000,
            },
            {
                amplitude: 110,
                ear: 'right',
                frequency: 2000,
                no_response: true,
            },
        ];

        const collection = ResponseCollection.from(rawResponses);

        expect(collection.needsLineToNextMarker(0)).toBe(true);
        expect(collection.needsLineToNextMarker(1)).toBe(false);
    });

    test('Filter responses by ear', () => {
        const rawResponses = [
            {
                amplitude: 20,
                ear: 'right',
                frequency: 500,
            },
            {
                amplitude: 20,
                ear: 'right',
                frequency: 1000,
            },
            {
                amplitude: 110,
                ear: 'left',
                frequency: 2000,
                no_response: true,
            },
        ];

        const collection = ResponseCollection.from(rawResponses);
        const filteredCollection = collection.filterByEar('right');

        expect(filteredCollection.length).toBe(2);
        filteredCollection.forEach(response => {
            expect(response.ear).toBe('right');
        });
    });

    test('Filter responses by modality', () => {
        const rawResponses = [
            {
                amplitude: 20,
                ear: 'right',
                frequency: 500,
                modality: 'bone',
            },
            {
                amplitude: 20,
                ear: 'right',
                frequency: 1000,
            },
            {
                amplitude: 110,
                ear: 'left',
                frequency: 2000,
                no_response: true,
            },
        ];

        const collection = ResponseCollection.from(rawResponses);
        const filteredCollection = collection.filterByModality('air');

        expect(filteredCollection.length).toBe(2);
        filteredCollection.forEach(response => {
            expect(response.modality).toBe('air');
        });
    });

    test('Get the ear represented by a collection', () => {
        const rawResponses = [
            {
                amplitude: 20,
                ear: 'right',
                frequency: 500,
            },
            {
                amplitude: 20,
                ear: 'right',
                frequency: 1000,
            },
            {
                amplitude: 20,
                ear: 'right',
                frequency: 2000,
            },
        ];

        const collection = ResponseCollection.from(rawResponses);

        expect(collection.ear).toBe('right');
    });

    test('Get the modality represented by a collection', () => {
        const rawResponses = [
            {
                amplitude: 20,
                ear: 'right',
                frequency: 500,
            },
            {
                amplitude: 20,
                ear: 'left',
                frequency: 1000,
            },
            {
                amplitude: 20,
                ear: 'right',
                frequency: 2000,
            },
        ];

        const collection = ResponseCollection.from(rawResponses);

        expect(collection.modality).toBe('air');
    });

    test('Throw an error when attempting to get an ear or modality from an unpartitioned collection', () => {
        const rawResponses = [
            {
                amplitude: 20,
                ear: 'right',
                frequency: 500,
                modality: 'bone',
            },
            {
                amplitude: 20,
                ear: 'left',
                frequency: 1000,
            },
            {
                amplitude: 20,
                ear: 'right',
                frequency: 2000,
            },
        ];

        const collection = ResponseCollection.from(rawResponses);

        expect(() => collection.ear).toThrowError();
        expect(() => collection.modality).toThrowError();
    });

    test('Get new collection of responses filtered by ear or modality', () => {
        const ears = ['right', 'left', 'both'];
        const modalities = ['air', 'bone', 'hearing aid', 'cochlear implant', 'soundfield'];

        const rawResponses = ears.reduce((responses, ear) => {
            return [
                ...responses,
                ...modalities.map(modality => ({
                    amplitude: 20,
                    ear,
                    frequency: 1000,
                    modality,
                })),
            ];
        }, []);

        const collection = ResponseCollection.from(rawResponses);

        expect(collection.length).toBe(15);

        expect(collection.right().length).toBe(5);
        collection.right().forEach(response => {
            expect(response.ear).toBe('right');
        });

        expect(collection.left().length).toBe(5);
        collection.left().forEach(response => {
            expect(response.ear).toBe('left');
        });

        expect(collection.both().length).toBe(5);
        collection.both().forEach(response => {
            expect(response.ear).toBe('both');
        });

        expect(collection.air().length).toBe(3);
        collection.air().forEach(response => {
            expect(response.modality).toBe('air');
        });

        expect(collection.bone().length).toBe(3);
        collection.bone().forEach(response => {
            expect(response.modality).toBe('bone');
        });

        expect(collection.soundfield().length).toBe(3);
        collection.soundfield().forEach(response => {
            expect(response.modality).toBe('soundfield');
        });

        expect(collection.aided().length).toBe(3);
        collection.aided().forEach(response => {
            expect(response.modality).toBe('hearing aid');
        });

        expect(collection.implant().length).toBe(3);
        collection.implant().forEach(response => {
            expect(response.modality).toBe('cochlear implant');
        });
    });

    test('Partition responses by ear and modality', () => {
        const ears = ['right', 'left', 'both'];
        const modalities = ['air', 'bone', 'hearing aid', 'cochlear implant', 'soundfield'];

        const rawResponses = ears.reduce((responses, ear) => {
            return [
                ...responses,
                ...modalities.map(modality => ({
                    amplitude: 20,
                    ear,
                    frequency: 1000,
                    modality,
                })),
            ];
        }, []);

        const collection = ResponseCollection.from(rawResponses);

        expect(collection.partition().length).toBe(7);
    });

    test('Filter empty collections after partitioning', () => {
        const rawResponses = [
            {
                amplitude: 20,
                ear: 'right',
                frequency: 500,
            },
            {
                amplitude: 20,
                ear: 'left',
                frequency: 1000,
            },
            {
                amplitude: 20,
                ear: 'right',
                frequency: 2000,
            },
        ];

        const collection = ResponseCollection.from(rawResponses);

        expect(collection.partition().length).toBe(2);
    });
});
