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

* `$ npm install`;

* `$ npm start` will create the files within `.../lizard-api-client/lib/` that
we will need;

* `$ npm link` will make those files available in arbitrary places in your
filesystem (via the `/usr/local/lib/node_modules/` folder);

* Go to the root directory of the cloned G4AW-lizard-client repo;

* `$ npm install`;

* `$ npm link lizard-api-client` wil finish the linking step -- Javascript
files in the actual client application (the G4AW-lizard-client repo) can now
have the line `import { LizardApiClient } from 'lizard-api-client';` to make
the lizard-api-client code available in their local scope.

* `$ npm start` will launch a webpack-dev-server on [http://localhost:8080](http://localhost:8080)

* Open the development console of your browser and you may interact with the app.










