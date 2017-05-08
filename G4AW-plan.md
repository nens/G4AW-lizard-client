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
- Styling van de app volgt zo veel mogelijk de Sketch ontwerpen
- Budget: xxxxxxx


Blind spots / risico's
======================

- Authenticatie en authorisatie: hoe gaan we de gebruiker identificeren en authenticeren. Opties zijn onze eigen SSO, social logins, QR of shortcodes uitdelen, etc.
- Data: Er is nog geen data, maar we moeten hierop wel anticiperen - dat is een typische blind spot.
- KoboCollect: Welk formaat etc. - tot er iets is is er niks.
- Direct met de Lizard API praten of via een tussen-server zoals bij GGMN (suggestie van Reinout)
- Offline support. Hoe sterk is de wens/eis? De [ServiceWorker API](https://developers.google.com/web/fundamentals/getting-started/codelabs/offline/) kan dit. KoboCollect gebruikt het ook. Gevalletje would-be-nice?


Functioneel Ontwerp (FO)
========================

Doel van de applicatie
----------------------
Doel van de app is *omgevingsinformatie* bieden aan de eindgebruiker, de zgn. 'Farmer friends' van [LT Group](http://loctroi.vn/en/). Verder in dit document *gebruiker* genoemd.

Aannames bij deze eindgebruiker
-------------------------------

- Vaak laag opgeleid
- Beperkte Internettoegang (niet altijd aanwezig/snel)
- Beperkte mobiele telefoons, onvoorspelbare browsers


Functionele beperkingen
-----------------------

- Eén rasterlaag tegelijk
- Tijdselectie: Dag/uur niveau


Scenarios
=========

Zie [scenarios](https://github.com/nens/G4AW-lizard-client/blob/master/G4AW-scenarios.md).


Storyboards en UI Components
----------------------------

- [UI Components](https://www.figma.com/file/dMfbORPsTEeIljFDtxMxHb6L/lizard-mobile-g4aw-basic-v3-UI-Components)
- [Storyboards](https://www.figma.com/file/Fq6siPQf61534WMcbHfSg8dt/lizard-mobile-g4aw-basic-v3-_Flows)

Verder:

- We houden zoveel mogelijk [Material Design](https://material.io/) aan
- Font: [Roboto](https://fonts.google.com/specimen/Roboto)
- Iconset: [Material Icons](https://material.io/icons/) en custom SVG icons waar nodig


Nog te ontwerpen:

- App Switcher
- Login/logout
- ...?


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


API endpoints
-------------

Ook al wordt de API ontsloten door [lizard-api-client.js](https://github.com/nens/lizard-api-client)


Visual Components
-----------------

- Overzicht alle UI components zoals de searchbar, map, omnibox, settings, legenda, etc.
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
- Libraries: react-router, react-intl/i18next, 
- Redux tests met chai/jest
- UI tests met Jest (snapshot testing)
- CSS Modules / PostCSS
- Build tools: Webpack, babel
- Yarn ipv npm omdat Yarn's lockfile beter werkt voor locken van dependencies
- Semantic releasing via buck-trap

Opmerking over componenten
--------------------------

De componenten die we bouwen ontwerpen we met herbruikbaarheid in andere projecten in het achterhoofd.
Als een component voldoende uitgecristalliseerd is kunnen we het in een module plaatsen en publiceren op npmjs.com.
Daarbij is het wel belangrijk om componenten zo min mogelijk met elkaar te verweven.

Dit zal niet altijd lukken, maar een voorbeeld is bijv. een Timeline component:
```
<Timeline data={data} onChange={this.handleTimelineChange} />
```
Dit heeft verder geen relatie met andere componenten in het project en kan dus op termijn worden losgetrokken.


Inschatting
===========

|Onderdeel|Inschatting (dagen)|  
|---------|----------:|
|Mobiele variant|145|
|Technisch inhoudelijke sessies (3), discussie en vastlegging|15|
|Ontwerpen, leeg en interactief|10|
|Toetsing ontwerpen|15|
|Content bepalen|5|
|Ontwikkeling frontend|60|
|Stelpost ontwikkeling|15|
|Projectleiding en overleg|25|
|Back-end uitbreiding/aanpassing|??|


Testfase en oplevering
======================

TODO
