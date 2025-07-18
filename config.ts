import ports from './data/ports.json';

export const PORTS_CONFIG = {
  url: 'https://fishing-map.dev.globalfishingwatch.org/map/fishing-activity/default-public/ports-report/{{port}}?dvIn[0][id]=basemap&dvIn[0][cfg][basemap]=satellite&dvIn[1][id]=vms&dvIn[1][cfg][vis]=false&dvIn[2][id]=ais&dvIn[2][cfg][vis]=false&dvIn[3][id]=port-locations&dvIn[3][cfg][vis]=true&dvIn[4][id]=basemap-labels&dvIn[4][cfg][locale]=en&bDV&rC=~0&portsReportName=TENERIFE&portsReportCountry=ESP&tV=~0&start=2024-01-01T00%3A00%3A00.000Z&end=2025-01-01T00%3A00%3A00.000Z&tk[0]=events',
  ids: ports.flatMap((port) => port.properties.area || []),
};
