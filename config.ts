import eezs from '@globalfishingwatch/ocean-areas/src/data/source/eezs.json'
import ports from '@globalfishingwatch/ocean-areas/src/data/source/ports.json'

export const PORTS_CONFIG = {
  name: 'ports',
  url: 'https://fishing-map.globalfishingwatch.org/map/fishing-activity/default-public/ports-report/{{id}}?dvIn[0][id]=basemap&dvIn[0][cfg][basemap]=satellite&dvIn[1][id]=vms&dvIn[1][cfg][vis]=false&dvIn[2][id]=ais&dvIn[2][cfg][vis]=false&dvIn[3][id]=port-locations&dvIn[3][cfg][vis]=true&dvIn[4][id]=basemap-labels&dvIn[4][cfg][locale]=en&bDV&rC=~0&portsReportName=TENERIFE&portsReportCountry=ESP&tV=~0&start=2024-01-01T00%3A00%3A00.000Z&end=2025-01-01T00%3A00%3A00.000Z&tk[0]=events',
  ids: ports.flatMap((port) => port.properties.area || []),
}

export const EEZ_AREAS_CONFIG = {
  name: 'eezs',
  url: 'https://fishing-map.globalfishingwatch.org/map/fishing-activity/default-public/report/public-eez-areas/{{id}}?dvIn[0][id]=basemap&dvIn[0][cfg][basemap]=satellite&dvIn[1][id]=context-layer-eez&dvIn[1][cfg][vis]=true&longitude=-31.92999904&latitude=-57.20959543&zoom=3.81852454',
  ids: eezs.flatMap((eez) => eez.properties.area || []),
}
