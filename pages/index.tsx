import { mongoDbCLientConnectionUrl } from '@/consts/mongodb-client-url-connect';
import { Match } from '@/interfaces/match';
import { MongoClient } from 'mongodb';
import Head from 'next/head'

export default function Home(props: any) {

  console.log(props.matches);

  return (
    <>
      <Head>
        <title>Tennis Match Tracker</title>
        <meta name="description" content="Track your tennis matches" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

export async function getStaticProps() {

  try {
    const client = await MongoClient.connect(
      mongoDbCLientConnectionUrl
    );
    const db = client.db();
    const matchesCollection = db.collection('matches');
    const matches = await matchesCollection.find().toArray();
    client.close();
    return {

      props: {
        matches: matches.map((match) => ({
          id: match._id.toString(),
          playerOne: match.playerOne,
          playerTwo: match.playerTwo,
          winner: match.winner,
          date: match.date,
          playerOneScore: match.playerOneScore,
          playerTwoScore: match.playerTwoScore,
          location: match?.location ? match?.location : 'No location was submitted'
        }))},
      revalidate: 60,
    };
  } catch(error) {
    console.error(error);
  }
}

