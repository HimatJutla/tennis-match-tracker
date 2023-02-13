export interface Set {
    setNumber: number;
    playerOneScore: number;
    playerTwoScore: number;
}

export interface MatchScore {
    numberOfSets: number;
    sets: Array<Set>;
}