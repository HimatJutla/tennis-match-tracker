import { MongoClient  } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { mongoDbCLientConnectionUrl } from '../../../../consts/mongodb-client-url-connect';
import { ObjectId } from "mongodb";

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '10mb',
      },
    },
}

const handler = async (req: NextApiRequest,
    res: NextApiResponse<any>) => {
    const client = await MongoClient.connect(mongoDbCLientConnectionUrl);
    const db = client.db();
    const playersCollection = db.collection('players');
    if (req.method === 'PUT') {
        try {
            const result = await playersCollection.findOneAndUpdate(
                {
                    _id: new ObjectId(req?.body?.id),
                },
                {
                    $set: {
                        firstName: req?.body?.firstName,
                        lastName:  req?.body?.lastName,
                        dateOfBirth: req?.body?.dateOfBirth,
                        bio: req?.body?.bio,
                        wins: req?.body?.wins,
                        losses: req?.body?.losses,
                        winningPercentage: req?.body?.winningPercentage,
                        totalMatches: req?.body?.totalMatches,
                        country: req?.body?.country,
                        city: req?.body?.city,
                        email: req?.body?.email,
                        image: req?.body?.image,
                    }
                },
            );
            res.status(201).json({message: result});
        } catch(error) {
            console.error(error);
        }
        client.close();
    }
}

export default handler;
