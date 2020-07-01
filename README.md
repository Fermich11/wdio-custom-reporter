# How yo setup

1. You should import the project:
`const ReportMailer = require('../wdio-mailer/index.js').default;`

2. Generate a json with the cofiguration you required:
```
    const yourConfig = { 
        rawInfo: {
            dir: './results/mailer',
            format: 'json'
        },
        mail: {
            service: 'gmail',
            auth: {
                user: 'Your Mail',
                pass: 'Your Password',
            }
        },
        slack: {
            auth: {},
        }
    }
```

3. Add the config and the instance of the reporter yo your wdio config on the section of reporters:
```
reporters: [
    [ ReportMailer, yourConfig]
]
```

## Notes
In the example the mail service is generated with no authetication(insecure mode)