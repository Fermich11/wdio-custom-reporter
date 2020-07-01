import WDIOReporter from '@wdio/reporter';
import { DataHandler } from './src/dataHandler';
import { Mailer } from './src/mailer.js';

export default class ReportMailer extends WDIOReporter {
    constructor(options) {
        /*
        * make reporter to write to the output stream by default
        */
        options = Object.assign(options, { stdout: true});
        super(options);

        this.dataHandler = new DataHandler();
        this.mailer = new Mailer(options['mail']);
        this.isWaiting = false;
    }

    get isSynchronised() {
        return !this.isWaiting
    }

    onSuiteEnd(suite) {
        if(suite.type === 'scenario') {
            const state = suite.tests.map(el => el.state);
            if (state.includes('failed')) {
                this.dataHandler.addScenarioStatus(suite.title, 'fail');
            } else if(state.includes('skipped')) {
                this.dataHandler.addScenarioStatus(suite.title, 'skip');
            } else {
                this.dataHandler.addScenarioStatus(suite.title, 'pass');
            }
        } else if(suite.type === 'feature') {
            this.dataHandler.closeFeature(suite.title);
        }
    }

    async onRunnerEnd() {
        this.isWaiting = true;
        try{
            const response = await this.mailer.sendMail();
            console.log('-------> ', JSON.stringify(response))
        } catch(err) {
            this.write(`Sorry, an error was throw: ${err}`)
        }
        this.write(JSON.stringify(this.dataHandler.getFeatures()));
        this.isWaiting = false;
    }
};