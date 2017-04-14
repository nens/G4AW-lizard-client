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
Doel van de app is *omgevingsinformatie* bieden aan de eindgebruiker, de zgn. 'Farmer friends' van [LT Group](http://loctroi.vn/en/). Verder in dit document *gebruiker* genoemd.

Aannames bij deze eindgebruiker:

- Vaak laag opgeleid
- Beperkte Internettoegang (niet altijd aanwezig/snel)
- Beperkte mobiele telefoons, onvoorspelbare browsers


Scenarios
---------
Een scenario is een beschrijving van de mogelijke ‘flow’ van de eindgebruiker door de applicatie. Met behulp van scenario's krijgt de lezer een duidelijker beeld van de eindgebruiker en diens behoefte. (Aka user-stories)

1) **Zoeken naar een asset**

De gebruiker:
- opent de G4AW Lizard Client
- tapt de search bar
- typt een trefwoord in

De app:
- vraagt resultaten op
- toont de resultaten als [cards](https://material.io/guidelines/components/cards.html) in het zoekresultatenoverzicht (modal overlay)
- de resultaten worden gegroepeerd getoond en gesorteerd op relevantie (dichterbij is belangrijker dus hoger in de lijst)

De gebruiker:
- tapt op een *individuele asset card*

De app:
- toont een detail pagina (modal overlay, scrollable) met daarop gegroepeerd de beschikbare informatie voor dit asset


2) **Zoeken naar een asset**

De gebruiker:
- opent de G4AW Lizard Client
- tapt de search bar
- typt een trefwoord in

De app:
- vraagt resultaten op
- toont de resultaten als [cards](https://material.io/guidelines/components/cards.html) in het zoekresultatenoverzicht (modal overlay)
- de resultaten worden gegroepeerd getoond en gesorteerd op relevantie (dichterbij is belangrijker dus hoger in de lijst)

De gebruiker:
- tapt op *explore on map*

De app:
- toont de resultaten op de kaart en zoomt naar de bounding box van deze selectie

De gebruiker:
- tapt op één resultaat waarin hij/zij interesse heeft

De app:
- opent de omnibox voor 50% met daarin de belangrijkste informatie van dit asset
- toont een button *View details*

De gebruiker:
- tapt op deze *View details* button

De app:
- toont de omnibox in volledige hoogte met alle details in een scrollable view








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

TODO






Testfase en oplevering
======================

TODO
