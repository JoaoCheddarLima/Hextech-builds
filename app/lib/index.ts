import {
  ExecuteRegion,
  ExecuteRegionPlatform,
  RiotClient,
} from 'lol-sdk';

const cacheLoaders = {
    riotClient: null as RiotClient | null,
}

export function getRiotClient(): RiotClient {
    if (!cacheLoaders.riotClient) {
        cacheLoaders.riotClient = new RiotClient({
            apiKey: process.env.API_KEY!,
            region: ExecuteRegion.AMERICAS,
            regionPlatform: ExecuteRegionPlatform.BR1
        });
        return cacheLoaders.riotClient;
    }

    return cacheLoaders.riotClient;
}

export function fixPuuid(puuid: string) {
    return decodeURI(puuid.replace("-", "#"));
}