export interface Set {
    playerOneScore: number;
    playerTwoScore: number;
}

export interface MatchScore {
    numberOfSets: number;
    sets: Array<Set>;
}