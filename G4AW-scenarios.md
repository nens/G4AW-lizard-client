G4AW SCENARIOS
==============

Een scenario is een beschrijving van de mogelijke ‘flow’ van de eindgebruiker door de applicatie. Met behulp van scenario's krijgt de lezer een duidelijker beeld van de eindgebruiker en diens behoefte. (Aka user-stories)

Waarom scenario's? Scenario's zijn goedkoper om te maken dan wireframes of schetsen.
Als de opdrachtgever akkoord gaat met de scenario's kunnen deze worden uitgewerkt tot [storyboards](https://uxplanet.org/storyboarding-in-ux-design-b9d2e18e5fab).

Daarna kan de applicatie worden gebouwd met de storyboards als leidraad.


**1. Zoeken naar een asset - detail card**
---------------------------

De gebruiker:
- opent de webapp
- tapt de search bar
- typt een trefwoord in

De webapp:
- vraagt resultaten op
- toont de resultaten als [cards](https://material.io/guidelines/components/cards.html) in het zoekresultatenoverzicht (modal overlay)
- de resultaten worden gegroepeerd getoond en gesorteerd op relevantie (dichterbij is belangrijker dus hoger in de lijst)

De gebruiker:
- tapt op een *individuele asset card*

De webapp:
- toont een detail pagina (modal overlay, scrollable) met daarop gegroepeerd de beschikbare informatie voor dit asset


**2. Zoeken naar een asset - explore on map**
---------------------------

De gebruiker:
- opent de webapp
- tapt de search bar
- typt een trefwoord in

De webapp:
- vraagt resultaten op
- toont de resultaten als [cards](https://material.io/guidelines/components/cards.html) in het zoekresultatenoverzicht (modal overlay)
- de resultaten worden gegroepeerd getoond en gesorteerd op relevantie (dichterbij is belangrijker dus hoger in de lijst)

De gebruiker:
- tapt op *explore on map*

De webapp:
- toont de resultaten op de kaart en zoomt naar de bounding box van deze selectie

De gebruiker:
- tapt op één resultaat waarin hij/zij interesse heeft

De webapp:
- opent de omnibox voor 50% met daarin de belangrijkste informatie van dit asset
- toont een button *View details*

De gebruiker:
- tapt op deze *View details* button

De webapp:
- toont de omnibox in volledige hoogte met alle details in een scrollable view



**3. Advisories bekijken voor huidige locatie**
----------------------------------------------

De gebruiker:
- opent de webapp
- tapt op de **View advisories** card onderin beeld

De webapp:
- voert geolocatie uit
- als mislukt: toont melding in Snackbar component onder in beeld
- als gelukt: zoomt naar gevonden locatie en highlight dit punt
- laat Advisories modal voor 50% zien

De gebruiker:
- tapt op 50% modal

De webapp:
- toont Advisories modal in full height mode


**4. Van advisory naar kaart**
-----------------------------

De gebruiker:
- ziet al een advisory pagina
- swiped naar de 'Flood mitigation advisory'
- tapt op **View on map** button

De webapp:
- toont de kaart
- toont het raster dat bij 'Flood mitigation advisory' hoort


**5. Rasterbeeld van dag eerder zien**
-------------------------------------

De gebruiker:
- ziet een raster dat hoort bij 'Pest and disease advisory'
- tapt op de kalender button

De webapp:
- opent de date/time controller

De gebruiker:
- tapt op de button die de datum van gisteren op zich heeft afgebeeld

De webapp:
- laat de rasterlaag van gisteren zien


**6. Legenda toggle**
--------------------

De gebruiker:
- heeft een kaart in beeld
- tapt op de legenda button rechtsonder

De webapp:
- haalt de legenda stappen op voor de actieve kaartlaag
- toont de legenda in 1/3 modus onderin beeld

De gebruiker:
- tapt op het kruisje van het legenda component

De webapp:
- laat het legenda component weer verdwijnen
