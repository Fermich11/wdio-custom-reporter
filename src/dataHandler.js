/**
 * @class This object will construct a json to handler all the related info about the wdio run.
 */
export class DataHandler {
    constructor() {
        this.features = {};
        this.currentFeature = [];
    };

    /**
     * @returns {object} Returns the actual status of the wdio run
     */
    getFeatures() { return this.features; }

    /**
     * @param {string} scenarioName it will add the scenario name
     * @param {string} status will add the status of the scenario
     */
    addScenarioStatus(scenarioName, status) {
        this.currentFeature.push({ name: scenarioName.replace(/\\\//g, ''), status });
    }

    closeFeature(name) {
        this.features = Object.assign(this.features, { [name]: this.currentFeature });
        this.currentFeature = {};
    }


}