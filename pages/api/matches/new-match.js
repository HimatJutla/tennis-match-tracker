import { MongoClient  } from "mongodb";
import { mongoDbCLientConnectionUrl } from '../../../consts/mongodb-client-url-connect';

const handler = async (req, res) => {
    if (req.method === POST) {
        const matchData = req.body;
        try {
            const client = await MongoClient.connect(mongoDbCLientConnectionUrl);
            const db = client.db();
            const matchesCollection = db.collection('matches');
            await matchesCollection.insertOne(matchData);
            client.close();
            res.status(201).json({message: 'Match inserted sucessfully'})
        } catch(error) {
            console.error(error);
        }
    }
}

export default handler;