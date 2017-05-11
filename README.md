# G4AW-lizard-client

_A minimal, mobile-first client for the Lizard ecosystem that will be used for
the G4AW project._

This minimal client may be used, in due time, to develop a new "full" Lizard
client, which will have the added benefit of being properly usable on mobile devices.
This would substitute [the current Lizard client](https://github.com/nens/lizard-client).
The current Lizard client does not play nice with mobile devices, has an overly
complicated [AngularJS 1.x](https://medium.com/@mnemon1ck/why-you-should-not-use-angularjs-1df5ddf6fc99)
codebase and a ton of other technical issues. Describing all of these issues is
beyond the scope of this readme.

## Installation

_This assumes you know how to get the Lizard NXT backend up and running.
If this is not the case, fear not and ask a backender near you._

For the time being, you need to `git clone` two seperate Github repositories to
get the new client working. Later on, we will release the
[lizard-api-client](https://github.com/nens/lizard-api-client) as a package to
NPM, thereby streamlining the installion procedure. The two Github repositories
you will need:

* [G4AW-lizard-client](#)
* [lizard-api-client](https://github.com/nens/lizard-api-client)

After having cloned the two repos, the following steps are required to see code
executed in your browsers' development console:

* Go to the root directory of the cloned
[lizard-api-client](https://github.com/nens/lizard-api-client);

* Each of the following `npm` commands can be switched to `yarn` if you use that.

* `$ npm install`

* `$ npm start` will create the files within `.../lizard-api-client/lib/` that
we will need

* `$ npm link` will make those files available in arbitrary places in your
filesystem (via the `/usr/local/lib/node_modules/` folder)

* Go to the root directory of the cloned G4AW-lizard-client repo

* `$ npm install`

* `$ npm link lizard-api-client` wil finish the linking step -- Javascript
files in the actual client application (the G4AW-lizard-client repo) can now
have the line `import { LizardApiClient } from 'lizard-api-client';` to make
the lizard-api-client code available in their local scope

* `$ sso_user=your-sso-username sso_pass=your-sso-password npm start` will launch a development server with Hot Module Reloading enabled and authenticated proxy requests to the Lizard NXT staging server at [http://localhost:3000](http://localhost:3000)

* See [http://localhost:3000/api/v3](http://localhost:3000/api/v3) for the API root.


## Development

This project uses the [Prettier.js](https://github.com/prettier/prettier) code formatter. The .eslintrc extends from the prettier linting configuration.

A pre-commit hook is configured to run `prettier` every time, so the codebase stays in consistent form, style-wise.

If you work on this project, please submit changes via Pull Requests and follow the [commit guidelines as outlined here](https://github.com/conventional-changelog/standard-version#commit-message-convention-at-a-glance).

These commit messages will be used to auto-generate `CHANGELOG.md`.

Have a look at the [buck-trap README](https://github.com/nens/buck-trap/blob/master/README.md) for more information about the release procedure.


### Browser development extensions

This front-end uses React and Redux. These extensions may help:

- React Devtools for [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

- Redux Devtools for [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) or [Firefox](https://addons.mozilla.org/en-Gb/firefox/addon/remotedev/)


## Building a production bundle

```bash
$ npm run build
```

This will run webpack in production mode. The result will be a `bundle.js` file in the `dist/` directory.
