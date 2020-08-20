var features = {};
var currentFeature = [];

export function getFeatures() { return features; };

/**
 * @param {string} scenarioName it will add the scenario name
 * @param {string} status will add the status of the scenario
 */
export function addScenarioStatus(scenarioName, status) {
    currentFeature.push({ name: scenarioName.replace(/\\\//g, ''), status });
};

export function closeFeature(name) {
     Object.assign(features, { [name]: currentFeature });
    currentFeature = [];
};