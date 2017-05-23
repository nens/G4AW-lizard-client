We keep the state as flat as possible, no or very few nested structures.

However, most objects will be retrieved by an asynchronous API call;
they generally use the following structure:

    things: {
        <thing UUID 1>: {
            isFetching: <Boolean>,
            data: <Object representing data for this thing> or null,
            error: <String error message> or null
        }
        <thing UUID 2>: {
            ...
        }
    }

Always: if isFetching is true, then data and error will be null. If isFetching is false,
then *either* data or error will have a value and the other will be null.

Parcel details are complicated: they come from three sources
(hydra-core asset, hydra-core image timeseries, and Geoserver). This
implementation detail should be resolved as close to the "problem" as
possible, frontend code should not need to know this. So we keep a
merged representation in the state, with two "isFetching" booleans and
two errors for the parcels. Image timeseries are stored in another
structure to prevent it becoming too complicated.

Total state:

    {
        currentPage: <String>,  // 'SearchList', 'SearchMap', 'Parcel', 'Settings', 'Photo'

        latestSearchTerm: <String>,
        isGeoLocationAvailable: <Boolean>,
        geoLocation: {
            isFetching: <Boolean>,
            data: [lat, lon] or null,
            error: <String error message> or null
        },
        searchResults: [
           {
              description: <String>,
              uuid: <String>,
              geoJson: <String> // To highlight on map
           }, ...
        ],
        parcels: {
           <parcel-id>: {
               parcelGeoserverId: <String>,
               isFetchingLizard: <Boolean>,
               isFetchGeoserver: <Boolean>,

               errorsLizard: <String> or null,
               errorsGeoserver: <String> or null,

               // All parcel attributes, some filled in when
               // request to Lizard resolves, some when request to Geoserver resolves.
               // The following are in the current layer:
               'IncomeTota',
               'LocTroi',
               'ProfitTota',
               '3CForce',
               'LaborSelf',
               'WaterSourc',
               'Farmer',
               'IncomeHa',
               'LaborHired',
               'Method',
               'SowingDay',
               'YieldWet',
               'Price',
               'Variety',
               'FarmerAdr',
               'Phone',
               'InputHa',
               'InputTotal',
               'FieldAdr',
               'HarvestDay',
               'ProfitHa',
               'RiceCost',
               'Pesticide',
               'MoistPerc',
               'Fertiliser',
               'Irrigation',
               'FarmID',
               'YieldDry',
               'Hectare',
               'Season'

               // TODO: Make a list.
               ...
               }
           },
       },
       photosForParcel: {
           // Each parcel has its own photo timeseries, storing them separately from
           // the other details for simplicity. Also needs to be loaded for the detail page.
           <parcel-id>: {
               isFetching: <Boolean>,
               data: [
                   {
                       thumbnailUrl: <String>,
                       imageUrl: <string>,
                       timestamp: <DateTime>
                   },
               ]
               error: <String error message> or null
           }
       }
       settings: {
           // To decide. Need to be mirrored to localstorage.
       }
    }
