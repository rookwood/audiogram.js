import Response from './Response';

class ResponseCollection {
    static from(responses) {
        return new ResponseCollection(responses.map(response => new Response(response)));
    }

    constructor(responses) {
        this.responses = responses;
    }

    partition() {
        return [
            this.right().air(),
            this.left().air(),
            this.right().bone(),
            this.left().bone(),
            this.soundfield(),
            this.aided(),
            this.implant(),
        ].filter(set => set.length);
    }

    map(fn) {
        return this.responses.map(fn);
    }

    reduce(fn, initialValue) {
        return this.responses.reduce(fn, initialValue);
    }

    next(index) {
        return this.responses[index + 1];
    }

    needsLineToNextMarker(index) {
        const nextResponse = this.next(index);

        return nextResponse !== undefined && nextResponse.modality !== 'bone' && nextResponse.noResponse === false;
    }

    hasAirBoneGap(testFrequency) {
        const air = this.responses
            .filter(response => response.modality == 'air' && response.frequency == testFrequency)
            .map(response => response.amplitude);
        const bone = this.responses
            .filter(response => response.modality == 'bone' && response.frequency == testFrequency)
            .map(response => response.amplitude);

        return Math.max.apply(null, bone) + 5 < Math.min.apply(null, air);
    }

    filterByEar(ear) {
        return new ResponseCollection(this.responses.filter(response => response.ear === ear));
    }

    filterByModality(modality) {
        return new ResponseCollection(this.responses.filter(response => response.modality === modality));
    }

    forEach(fn) {
        this.responses.forEach(fn);
    }

    get length() {
        return this.responses.length;
    }

    get ear() {
        const ear = this.responses.reduce((ears, response) => {
            if (ears.indexOf(response.ear) === -1) {
                ears.push(response.ear);
            }

            return ears;
        }, []);

        if (ear.length !== 1) {
            throw Error(UNPARTITIONED_ERROR);
        }

        return ear[0];
    }

    get modality() {
        const modality = this.responses.reduce((modalities, response) => {
            if (modalities.indexOf(response.modality) === -1) {
                modalities.push(response.modality);
            }

            return modalities;
        }, []);

        if (modality.length !== 1) {
            throw Error(UNPARTITIONED_ERROR);
        }

        return modality[0];
    }

    toArray() {
        return this.responses;
    }

    right() {
        return this.filterByEar('right');
    }

    left() {
        return this.filterByEar('left');
    }

    both() {
        return this.filterByEar('both');
    }

    air() {
        return this.filterByModality('air');
    }

    bone() {
        return this.filterByModality('bone');
    }

    soundfield() {
        return this.filterByModality('soundfield');
    }

    aided() {
        return this.filterByModality('hearing aid');
    }

    implant() {
        return this.filterByModality('cochlear implant');
    }
}

const UNPARTITIONED_ERROR =
    'Collection must be partitioned before determining ear or modality.  See ResponseCollection.partition()';

export default ResponseCollection;
