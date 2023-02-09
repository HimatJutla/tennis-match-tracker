export interface Match {
    _id: string;
    playerOne: any;
    playerTwo: any;
    winner: any;
    date: string;
    playerOneScore: string;
    playerTwoScore: string;
    location?: string;
    image?: any; // NTS, change this when you know what data type exactly mongo uses with image
}
