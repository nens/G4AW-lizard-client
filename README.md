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

* `$ yarn install`

* `$ yarn start` will create the files within `.../lizard-api-client/lib/` that
we will need

* `$ yarn link` will make those files available in arbitrary places in your
filesystem (via the `/usr/local/lib/node_modules/` folder)

* Go to the root directory of the cloned G4AW-lizard-client repo

* `$ yarn install`

* `$ yarn link lizard-api-client` wil finish the linking step -- Javascript
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

This webapp has language support for vietnamese, dutch and english.

The language used is determined by the browser locale. This behavior is configurable in `i18n.js`.

The language catalogs are located in `locales/vi`, `locales/nl` and `locales/en`. To update these catalogs with new translation strings, run:

```bash
$ npm run extract
```
or
```bash
$ yarn run extract
```

Enabling translation in a React component can be done by marking them as translation strings using the t() HOC:

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


Translating in non-react files such as Redux actions can be done as follows:

```js
import i18next from "i18next";
...
console.log(i18next.t('sometext'));
```



For more information on the translation mechanism, have a look at [i18next-react](https://github.com/i18next/react-i18next).



### React development

Please follow [the Airbnb React/JSX style guide](https://github.com/airbnb/javascript/tree/master/react) in a pragmatic way.

At least keep an eye on the [ordering section](https://github.com/airbnb/javascript/tree/master/react#ordering) as this helps the team and others read components quicker.


### Preferred React component structure

```js
// Imports on top, sorted alphabetically:
import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";

// Name the CSS file identically except for the .css extension:
import styles from ../styles/MainExportedComponent.css;

// Exported (main) component first:
class MainExportedComponent extends Component {

  // Constructor first (it's optional, but if needed, place it here)
  constructor() {
    // Dont forget super():
    super();
    
    // State initialisation in the constructor
    this.state = {
      someStateVar: somevalue,
    };
    
    // Explicitly bind functions here:
    this.someHandler = this.someHandler.bind(this);
    ...
  }

  // React lifecycle functions if needed:
  componentDidMount() {}
  componentWillReceiveProps() {}
  
  // Custom functions:
  someHandler(e) {}
  
  // Render as last function:
  render() {
    // Use an id attribute with the component name for easier identification in devtools.
    // The top element style should have the same className as the component is named.
    // Also, close empty JSX elements: <x />.
    return (
      <div 
        className={styles.MainExportedComponent}
        id="MainExportedComponent">
        <SomeButton />
        <SomeSmallDumbUIElementUsedInTheAboveComponent />
      </div>
    );
  }
}

// Define dumb / representational components below the main component.
// Dumb in the sense that they react to props and don't keep any state.
// They may be functions or classes:

// As a function:
function SomeButton() {
  return (
    <div className={styles.SomeButton} id="SomeButton">
      <i className={`${styles.Icon} material-icons`}>settings</i>
    </div>
  );
}

// As a Component class:
class SomeSmallDumbUIElementUsedInTheAboveComponent extends Component {
  render() {
    return (
      <div
        id="SomeSmallDumbUIElementUsedInTheAboveComponent"
        className={styles.SomeSmallDumbUIElementUsedInTheAboveComponent}
      />
    );
  }
}


// Define propTypes, sorted alphabetically:
MainExportedComponent.propTypes = {}

// Define default props, sorted alphabetically:
MainExportedComponent.defaultProps = {}


// In the case of react-redux, define the mapping functions here:
function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}


// Export the main component.
// This is also the place for connecting HoC's such as i18next's translate() or Redux' connect():

// connect() example:
// export connect(mapStateToProps, mapDispatchToProps)(MainExportedComponent);

// translate() example:
// export translate()(MainExportedComponent);

// Vanilla export:
export default MainExportedComponent;
```



### Browser development extensions

This front-end uses React and Redux. These extensions may help:

- React Devtools for [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

- Redux Devtools for [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) or [Firefox](https://addons.mozilla.org/en-Gb/firefox/addon/remotedev/)


## Building a production bundle

```bash
$ npm run build
```

This will run webpack in production mode. The result will be a `bundle.js` file in the `dist/` directory.


## Deployment
For the deployment of frontend repositories we make use of an Ansible script in the lizard-nxt repository.
More information is provided in the readme file of lizard-nxt: https://github.com/nens/lizard-nxt/blob/master/README.rst
Look below the heading "Deployment clients".


## Sentry

See [https://sentry.io/nens/g4aw-frontend/](https://sentry.io/nens/g4aw-frontend/).
