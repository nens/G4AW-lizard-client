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

* `$ node server.js` runs a development server with Hot Module Reloading enabled that proxies to a locally running Lizard instance on port 8000, on which one can login normally.

* `$ sso_user=your-sso-username sso_pass=your-sso_password node server.js` instead proxies to the staging Lizard server, and you are already logged in using those credentials.

* See [http://localhost:9000/api/v3](http://localhost:9000/api/v3) for the API root.


## Development

This project uses the [Prettier.js](https://github.com/prettier/prettier) code formatter. The .eslintrc extends from the prettier linting configuration.

A pre-commit hook is configured to run `prettier` every time, so the codebase stays in consistent form, style-wise.

If you work on this project, please submit changes via Pull Requests and follow the [commit guidelines as outlined here](https://github.com/conventional-changelog/standard-version#commit-message-convention-at-a-glance).

See [![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)

These commit messages will be used to auto-generate `CHANGELOG.md`.

Have a look at the [buck-trap README](https://github.com/nens/buck-trap/blob/master/README.md) for more information about the release procedure.


### Internationalisation

This webapp has language support for vietnamese and english.

The language used is determined by the browser locale. This behavior is configurable in `i18n.js`.

The language catalogs are located in `locales/en` and `locales/vi`. To update these catalogs with new translation strings, run:

```bash
$ npm run extract
```
or
```bash
$ yarn run extract
```

Enabling translation in a component can be done by marking them as translation strings using t():

```js
import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";

...

class SomeComponent extends Component {
  render() {
    const { t } = this.props;
    return {
      <div>{t("translate me")}</div>
    };
  }
}

...

export default translate()(SomeComponent);
```

The t() function is provided to the component via translate(), a [HoC](https://www.sitepoint.com/react-higher-order-components/) provided by `i18next-react`.

For more information on the translation mechanism, have a look at [i18next-react](https://github.com/i18next/react-i18next).



### React development

Please follow [the Airbnb React/JSX style guide](https://github.com/airbnb/javascript/tree/master/react) in a pragmatic way.

At least keep an eye on the [ordering section](https://github.com/airbnb/javascript/tree/master/react#ordering) as this helps the team and others read components quicker.


### Browser development extensions

This front-end uses React and Redux. These extensions may help:

- React Devtools for [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

- Redux Devtools for [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) or [Firefox](https://addons.mozilla.org/en-Gb/firefox/addon/remotedev/)


## Building a production bundle

```bash
$ npm run build
```

This will run webpack in production mode. The result will be a `bundle.js` file in the `dist/` directory.



## Sentry

See [https://sentry.io/nens/g4aw-frontend/](https://sentry.io/nens/g4aw-frontend/).
