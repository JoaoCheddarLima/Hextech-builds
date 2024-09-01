import { axiosInstance } from './utils/api';
import Routes from './utils/routes';

async function getBestChampionPerformers(champion: string): Promise<{
    championName: string;
    players: string[];
}> {
    const { data: { data } } = await axiosInstance.get(Routes.championRoute(champion));

    return {
        championName: champion,
        players: data
            .slice(0, 10)
            .map((e: any) => {
                return e.summoner.summoner_id;
            })
    };
}

async function getRecentPlayerGames(summoner_id: string, championName: string): Promise<any[]> {
    const { data: { data } } = await axiosInstance.get(Routes.playerRoute(summoner_id));

    const dataFiltered = data.filter(
        (e: any) => {
            return !e.is_remake &&
                e.myData.stats.result !== "LOSE" &&
                e.myData.stats.champion_temp.key.toLowerCase() == championName.toLowerCase()
        }
    )
        .splice(0, 10)

    return dataFiltered.map(
        (e: any) => {
            return {
                items: e.myData.items,
                spells: e.myData.spells,
                ...e.myData.rune
            }
        }
    )
}

export async function getBestChampionData(championName: string) {
    const bestPerformers = await getBestChampionPerformers(championName);

    const promises = bestPerformers.players.map(playerId => getRecentPlayerGames(playerId, championName));

    return await Promise.all(promises);
}