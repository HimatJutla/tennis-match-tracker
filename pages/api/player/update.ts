import { MongoClient  } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { mongoDbCLientConnectionUrl } from '../../../consts/mongodb-client-url-connect';
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
        const playerData = req.body;
        const { id } = req.query;
        try {
            const client = await MongoClient.connect(mongoDbCLientConnectionUrl);
            const db = client.db();
            const matchesCollection = db.collection('players');
            const result = await matchesCollection.updateOne(
                {
                    _id: new ObjectId(id?.toString()),
                },
                {
                    $set: {
                        firstName: playerData?.firstName,
                        lastName:  playerData?.lastName,
                        dateOfBirth: playerData?.dateOfBirth,
                        bio: playerData?.bio,
                        wins: playerData?.wins,
                        losses: playerData?.losses,
                        winningPercentage: playerData?.winningPercentage,
                        country: playerData?.country,
                        city: playerData?.city,
                        email: playerData?.email,
                        image: playerData?.image,
                    }
                }
            );
            client.close();
            res.status(201).json({message: result});
        } catch(error) {
            console.error(error);
        }
}

export default handler;