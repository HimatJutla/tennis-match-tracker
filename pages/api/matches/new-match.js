import { MongoClient  } from "mongodb";

const handler = async (req, res) => {
    if (req.method === POST) {
        const matchData = req.body;
        try {
            const client = await MongoClient.connect('mongodb+srv://HimatJutla:testPassword@cluster0.insfs.mongodb.net/TennisMatchesTracker?retryWrites=true&w=majority');
            const db = client.db();
            const matchesCollection = db.collection('matches');
            await matchesCollection.insertOne(matchData);
            client.close();
            res.status(201).json({message: 'Match inserted sucessfully'})
        } catch(error) {
            console.log(error);
        }
    }
}

export default handler;