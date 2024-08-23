class Response {
    constructor(properties) {
        this.amplitude = properties.amplitude;
        this.frequency = properties.frequency;
        this.ear = properties.ear;
        this.stimulus = properties.stimulus || 'tone';
        this.masking = properties.masking || null;
        this.test = properties.test || 'threshold';
        this.modality = properties.modality || 'air';
        this.noResponse = properties.no_response || false;
    }

    isBoneConduction() {
        return this.modality == 'bone';
    }

    type() {
        return [this.ear, this.modality, this.masked() ? 'masked' : 'unmasked']
            .filter(item => item !== false)
            .join('.');
    }

    masked() {
        return this.masking !== null;
    }

    key() {
        return [this.type, this.frequency].join('.');
    }
}

export default Response;
