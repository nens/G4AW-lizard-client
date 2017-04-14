G4AW Lizard client
==================

Dit document dient als leidraad voor het ontwikkelen van de G4AW Lizard client.

- Project `Q0007.23 G4AW Vietnam jaar 2 wp3` in TRS: https://trs.nelen-schuurmans.nl/projects/5226/
- Trello board: https://trello.com/b/vKbkt2BS/dev?menu=filter&filter=label:G4AW


Projectmatige randvoorwaarden
-----------------------------

- Interne deadline: 1 september 2017
- Scope beperkt tot ontwikkeling front-end
- Na goedkeuring wordt niet meer zonder overleg afgeweken van het FO/TO
- Styling volgt zo veel mogelijk de Sketch ontwerpen
- Budget: xxxxxxx


Functioneel Ontwerp (FO)
========================

Doel van de applicatie
----------------------
Doel van de app is *omgevingsinformatie* bieden aan de eindgebruiker, de zgn. 'Farmer friends' van [LT Group](http://loctroi.vn/en/).

Aannames bij deze eindgebruiker:

- Vaak laag opgeleid
- Beperkte Internettoegang (niet altijd aanwezig/snel)
- Beperkte mobiele telefoons, onvoorspelbare browsers


Scenarios
---------





Storyboard
----------

- Zie voorlopig op [Figma.com](https://www.figma.com/file/HAjXQTy3KYKSVGRfo1kgKJ2p/lizard-mobile-g4aw-basic-v3---UI-Components).




Technisch Ontwerp (TO)
======================

Actions
-------

- Welke [Redux actions](https://github.com/nens/G4AW-lizard-client/tree/master/src/actions) zijn er?
- Wat doen ze? Zijn ze sync/async?
- Wat zijn de arguments van eventuele Action Creators en/of de actions zelf?
- Waar resulteren ze in?


State shape (datamodel)
-----------------------

- Hoe ziet de Redux store eruit? Wat is de [minimale state shape](http://redux.js.org/docs/basics/Reducers.html#designing-the-state-shape)?


Visual Components
-----------------

- Overzicht alle UI components zoals de searchbar, omnibox, legenda, etc.
- Doel / functie van elk component beschrijven.
- Per component de propTypes beschrijven.
- Eventuele component state beschrijven. (zo min mogelijk)


Technische stack
----------------

- Aparte API client library: [lizard-api-client.js](https://github.com/nens/lizard-api-client) voor communicatie met Lizard REST API.
- Clientside State management: Redux (met immutable.js objecten vanuit lizard-api-client)
- React als UI library
- React components geschreven met JSX
- Javascript variant: ES2015
- Linter: ESLint met gedeelde .eslintrc voor consistente codestyle
- Bestaande components/libraries: react-leaflet
- Redux tests met chai
- UI tests met Jest (snapshot testing)
- CSS Modules / PostCSS
- Build tool: Webpack
- Yarn ipv npm omdat Yarn's lockfile beter werkt voor locken van dependencies



Inschatting
===========

TODO






Testfase en oplevering
======================
