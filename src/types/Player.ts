export type PlayerScoreType = {
    username: string;
    score: number;
    timestamp: Date;
    gamemode: "normal" | "threeShots";
}

export type PlayerLeaderboardType = {
    rank: number;
    username: string;
    score: number;
    timestamp: Date;
    gamemode: "normal" | "threeShots";
}