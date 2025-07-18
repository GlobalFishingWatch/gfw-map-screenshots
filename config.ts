import ports from './data/ports.json';
import eezs from './data/eezs-gfw.json';

export const PORTS_CONFIG = {
  url: 'https://fishing-map.dev.globalfishingwatch.org/map/fishing-activity/default-public/ports-report/{{port}}?dvIn[0][id]=basemap&dvIn[0][cfg][basemap]=satellite&dvIn[1][id]=vms&dvIn[1][cfg][vis]=false&dvIn[2][id]=ais&dvIn[2][cfg][vis]=false&dvIn[3][id]=port-locations&dvIn[3][cfg][vis]=true&dvIn[4][id]=basemap-labels&dvIn[4][cfg][locale]=en&bDV&rC=~0&portsReportName=TENERIFE&portsReportCountry=ESP&tV=~0&start=2024-01-01T00%3A00%3A00.000Z&end=2025-01-01T00%3A00%3A00.000Z&tk[0]=events',
  ids: ports.flatMap((port) => port.properties.area || []),
};

export const EEZ_AREAS_CONFIG = {
  url: 'https://fishing-map.dev.globalfishingwatch.org/map/fishing-activity/default-public/report/public-eez-areas/{{id}}?dvIn[0][id]=context-layer-eez&dvIn[0][cfg][vis]=true&dvIn[1][id]=~0&dvIn[1][cfg][basemap]=~1&dvIn[2][id]=~0&dvIn[2][cfg][basemap]=~1&dvIn[3][id]=vms&dvIn[3][cfg][vis]=false&dvIn[4][id]=ais&dvIn[4][cfg][vis]=true&dvIn[5][id]=port-locations&dvIn[5][cfg][vis]=false&dvIn[6][id]=basemap-labels&dvIn[6][cfg][locale]=en&bDV&tV=heatmap&start=2024-01-01T00%3A00%3A00.000Z&end=2025-01-01T00%3A00%3A00.000Z&tk[0]=basemap&tk[1]=satellite&lTD=&fTD=&vDi=public-global-vessel-identity%3Av3.0&vIs=registryInfo&vAm=type&vS=activity&vA=eez&vR=encounters&includeRelatedIdentities=true',
  ids: eezs.flatMap((eez) => eez.id || []),
};
