import { MongoClient  } from "mongodb";
import { mongoDbCLientConnectionUrl } from '../../../consts/mongodb-client-url-connect';

const handler = async (req, res) => {
    if (req.method === POST) {
        const matchData = req.body;
        const formattedMatchData = {
            playerOne: JSON.parse(matchData.playerOne),
            playerTwo: JSON.parse(matchData.playerTwo),
            winner: JSON.parse(matchData.winner),
            date: matchData.date,
            score: JSON.parse(matchData.score),
            city: matchData.city,
            location: matchData?.location ? matchData.location : null,
            image: matchData?.image ? matchData.image : null
        }
        try {
            const client = await MongoClient.connect(mongoDbCLientConnectionUrl);
            const db = client.db();
            const matchesCollection = db.collection('matches');
            await matchesCollection.insertOne(formattedMatchData);
            client.close();
            res.status(201).json({message: 'Match inserted sucessfully'})
        } catch(error) {
            console.error(error);
        }
    }
}

export default handler;