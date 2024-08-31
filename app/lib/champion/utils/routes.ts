export default class Routes {
    static championRoute(champion: string): string {
        return `/rankings/br/champions/${champion}`;
    };

    static playerRoute(playerId: string): string {
        return `/games/br/summoners/${playerId}?game_type=soloranked`;
    };

    static itemRoute(itemId: string | number): string {
        return `https://opgg-static.akamaized.net/meta/images/lol/latest/item/${itemId}.png`;
    };

    static perkRoute(perkId: string | number): string {
        return `https://opgg-static.akamaized.net/meta/images/lol/latest/perkStyle/${perkId}.png`
    };

    static runeRoute(runeId: string | number): string {
        return `https://opgg-static.akamaized.net/meta/images/lol/latest/perk/${runeId}.png`
    }
}