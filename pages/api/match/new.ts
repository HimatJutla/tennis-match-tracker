import { MongoClient  } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { mongoDbCLientConnectionUrl } from '../../../consts/mongodb-client-url-connect';

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '10mb',
      },
    },
}

const handler = async (req: NextApiRequest,
    res: NextApiResponse<any>) => {
        const matchData = req.body;
        try {
            const client = await MongoClient.connect(mongoDbCLientConnectionUrl);
            const db = client.db();
            const matchesCollection = db.collection('matches');
            const result = await matchesCollection.insertOne(matchData);
            console.log(result);
            client.close();
            res.status(201).json({message: result});
        } catch(error) {
            console.error(error);
        }
}

export default handler;