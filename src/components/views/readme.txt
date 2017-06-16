The ../components/pages/ contains only "wrapper-components" corresponding to
the individual "pages"/ux-states the client can have. The current page/ux-state
of the app will be saved in the Redux state.

As of 22-05-17, we can have the following pages/states in the screen:

=============
1) ListPage =
=============

  This contains the search-results, given to the user after (i) using the
  searchbar to search for a certain query or (ii) retrieving all parcels for the
  current spatial extent.

  When the user initially opens the app, he will land on this page; then, he
  can go one of the following possible routes:

  A) Login => lauches login modal =>
  ----------------------------------

    if succcessful:
      Goto SearchMapPage.
    else:
      Do nothing except for showing a flash (=snackbar) message.


  B) Search => launch "SELECT RADIUS" modal/dropdown =>
  -----------------------------------------------------

    if successful:
      Goto ListPage; this will now show the first n search results in
      grid-format that are within the selected radius.
    else:
      Do nothing except for showing a flash (=snackbar) message.


  C) Geolocate =>
  ---------------

    if successful:
      Goto MapPage, centralizing the current position of the user.
    else:
      Do nothing except for showing a flash (=snackbar) message.


  D) Click cross in searchbar =>
  ------------------------------

    Clicking this will bring the user back to an empty ListPage:

    if logged_in:
      Show logout button on otherwise empty ListPage.
    else:
      Do nothing.


  E) Click "EXPLORE MAP" button =>
  --------------------------------

    if logged_in:
      Goto MapPage; show both public and private parcels on map.
    else:
      Goto MapPage; show only public parcels on map.


============
2) MapPage =
============

  This page always shows the map. If the previous action was geolocating, the
  maps extent has been formed based on the users location + a configurable
  radius. Available actions:


  A) Search =>
  ------------

    if successful:
      Goto SearchListPage; this will now show the first n matching search
      results in grid-format.
    else:
      Do nothing except for showing a flash (=snackbar) message.


  B) Clicking a region/parcel =>
  ------------------------------

    Goto Parcelpage.


  C) Geolocate =>
  ---------------

    if successful:
      Zoom to fixed spatial extent, using the users current position for
      centering the extent.
    else:
      Do nothing except for showing a flash (=snackbar) message.


  D) Cross in searchbar =>
  ------------------------

    if logged_in:
      Show logout button on otherwise empty SearchListPage.
    else:
      Show login button on otherwise empty SearchListPage.


  E) Click "EXPLORE LIST" button =>
  --------------------------------

    if logged_in:
      Goto ListPage; show both public and private parcels in grid-format.
    else:
      Goto ListPage; show only public parcels in grid-format.


===============
3) ParcelPage =
===============

  The details for a single parcel. You get here by either (i) clicking on a
  (geometry of a) single parcel while on the SearchMapPage or (ii) selecting a
  single search-result on the SearchListPage.

  Also, this page contains both the photoseries as the rice-height timeseries
  graph (for the parcel current parcel). Available actions:


  A) Back-arrow =>
  ----------------

    Goto previous page, which is either (i) the SearchListPage or (ii) the
    SearchMapPage.


  B) Click a photo-thumbnail =>
  -----------------------------

    Goto PhotoPage.


  C) Click "ALL IMAGES" button =>
  -------------------------------

    All images available for the current parcel will be rendered as thumbnail
    underneath the current data in this page.


==============
4) PhotoPage =
==============

  This shows a fullscreen photo, belonging to the series of photos for a single
  parcel. Available actions:


  A) Back-arrow =>
  ----------------

    Goto ParcelPage


=================
5) SettingsPage =
=================

  On top of the page the user can select one of three possible sub-pages:
  Layers, Account and Help.


  A) Back-arrow =>
  ----------------

    This will take the user to the previous state/page. This is either


  5.1) Layers
  +++++++++++

    Here you can select (i) multiple foregroundlayers and (ii) a single
    backgroundlayer that you want to see on the SearchMapPage.
    Available actions:


    A) Select (single) backgroundlayer =>
    -------------------------------------

      The SearchMapPage will now use this backgroundlayer.


    B) Select (multiple) foregroundlayers =>
    ----------------------------------------

      The SearchMapPage will now use this foregroundlayers.


  5.2) Account ..TODO?
  ++++++++++++++++++++


  5.3) Help ..TODO?
  +++++++++++++++++
