import eezs from '@globalfishingwatch/ocean-areas/src/data/source/eezs.json' with { type: 'json' }
import ports from '@globalfishingwatch/ocean-areas/src/data/source/ports.json' with { type: 'json' }

export type ScreenshotConfig = {
  name: string
  url: string
  ids: (string | number)[]
}

export const PORTS_CONFIG: ScreenshotConfig = {
  name: 'ports',
  url: 'https://fishing-map.dev.globalfishingwatch.org/map/fishing-activity/default-public/ports-report/{{id}}?dvIn[0][id]=basemap&dvIn[0][cfg][basemap]=satellite&dvIn[1][id]=vms&dvIn[1][cfg][vis]=false&dvIn[2][id]=ais&dvIn[2][cfg][vis]=false&dvIn[3][id]=port-locations&dvIn[3][cfg][vis]=true&dvIn[4][id]=basemap-labels&dvIn[4][cfg][locale]=en&bDV&rC=~0&portsReportName=TENERIFE&portsReportCountry=ESP&tV=~0&start=2024-01-01T00%3A00%3A00.000Z&end=2025-01-01T00%3A00%3A00.000Z&tk[0]=events',
  ids: ports.flatMap((port) => port.properties.area || []).slice(0, 1),
}

export const EEZ_AREAS_CONFIG: ScreenshotConfig = {
  name: 'eezs',
  url: 'https://fishing-map.globalfishingwatch.org/map/fishing-activity/default-public/report/public-eez-areas/{{id}}?dvIn[0][id]=context-layer-graticules&dvIn[0][cfg][vis]=false&dvIn[1][id]=basemap&dvIn[1][cfg][basemap]=satellite&dvIn[2][id]=context-layer-eez&dvIn[2][cfg][vis]=true&longitude=-31.92999904&latitude=-57.20959543&zoom=4.51060777&lTD=&fTD=&vDi=public-global-vessel-identity%3Av3.0&vIs=registryInfo&vAm=type&vS=activity&vA=eez&vR=encounters&includeRelatedIdentities=true',
  ids: eezs.flatMap((eez) => eez.properties.area || []),
}

export const INFRASTRUCTURE_AREAS_CONFIG: ScreenshotConfig = {
  name: 'infrastructure',
  url: 'https://fishing-map.globalfishingwatch.org/map/fishing-activity/default-public/report/public-eez-areas/{{id}}?longitude=-5.74860385&latitude=56.54304775&zoom=4.2079778&dvIn[0][id]=~0&dvIn[0][cfg][vis]=true&dvIn[0][cfg][filters][flag][0]=ALA&dvIn[0][cfg][filters][vessel_type][0]=bunker&dvIn[1][id]=~1&dvIn[1][category]=~2&dvIn[1][dvId]=~3&dvIn[1][cfg][clr]=%23ABFF34&dvIn[1][cfg][colorRamp]=green-yellow&dvIn[1][cfg][filters][label][0]=wind&dvIn[2][id]=~4&dvIn[2][category]=~2&dvIn[2][dvId]=~3&dvIn[2][cfg][clr]=~5&dvIn[2][cfg][colorRamp]=~5&dvIn[2][cfg][filters][label][0]=unknown&dvIn[3][id]=~6&dvIn[3][cfg][vis]=true&dvIn[3][cfg][filters][label][0]=oil&dvIn[3][cfg][clr]=%23FCA26F&dvIn[3][cfg][colorRamp]=atomic-tangerine&dvIn[4][id]=~7&dvIn[4][cfg][basemap]=satellite&dvIn[5][id]=vms&dvIn[5][cfg][vis]=false&dvIn[6][id]=ais&dvIn[6][cfg][vis]=false&dvIn[7][id]=~8&dvIn[7][cfg][vis]=true&dvIn[8][id]=~9&dvIn[8][dT]=true&dvIn[9][id]=~10&dvIn[9][dT]=true&dvIn[10][id]=~11&dvIn[10][dT]=true&dvIn[11][id]=~12&dvIn[11][dT]=true&dvIn[12][id]=~13&dvIn[12][dT]=true&dvIn[13][id]=~14&dvIn[13][dT]=true&bDV&dvInOr[0]=~1&dvInOr[1]=~7&dvInOr[2]=ais&dvInOr[3]=vms&dvInOr[4]=~0&dvInOr[5]=sentinel2&dvInOr[6]=viirs&dvInOr[7]=sar&dvInOr[8]=encounters&dvInOr[9]=~9&dvInOr[10]=bathymetry&dvInOr[11]=~10&dvInOr[12]=~11&dvInOr[13]=~12&dvInOr[14]=~13&dvInOr[15]=~6&dvInOr[16]=~4&dvInOr[17]=~8&dvInOr[18]=~14&tk[0]=presence&tk[1]=offshore-fixed-infrastructure__1753113166309&tk[2]=context&tk[3]=fixed-infrastructure&tk[4]=offshore-fixed-infrastructure__1753113159793&tk[5]=%2366CCFF&tk[6]=offshore-fixed-infrastructure&tk[7]=basemap&tk[8]=context-layer-eez&tk[9]=context-layer-graticules&tk[10]=context-layer-mpa&tk[11]=context-layer-fao-areas&tk[12]=context-layer-rfmo&tk[13]=context-layer-high-seas&tk[14]=basemap-labels',
  ids: eezs.flatMap((eez) => eez.properties.area || []),
}
