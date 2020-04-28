/**
 * @class This object will construct a json to handler all the related info about the wdio run.
 * @param {string} id This is the identifier that would be used for the wdio run. 
 */
class DataHandler {
    constructor(id) {
        this.id = id;
        this.data = { [id]: {} };
    };


    /**
     * @returns {object} Returns the actual status of the wdio run
     */
    get data () { return this.data; }

    /**
     * @param {string} status This would be the status of the scenario, if pass or fail.
     * @param {string} scenario The name of the scenario that is actually running.
     * @param {string} feature The name of the feature file that is actually running.
     */
    insertResult(status, scenario, feature) {
        this.data[this.id][feature][scenario] = { status }; 
    }

}