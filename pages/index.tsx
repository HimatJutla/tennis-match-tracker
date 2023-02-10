import BadDataState from '@/components/badDataState/badDataState';
import HeadMetaData from '@/components/headMetaData/headMetaData';
import TennisMatchTrackerFooter from '@/components/ui/footer/tennis-match-tracker-footer';
import { mongoDbCLientConnectionUrl } from '@/consts/mongodb-client-url-connect';
import { Match } from '@/interfaces/match.interface';
import { IndexPagePropsInterface } from '@/interfaces/props/index-page-props.interface';
import { MongoClient } from 'mongodb';
import styled from 'styled-components';


const IndexPageStyling = styled.div`
  .index-content-container {
    display: flex;
    align-items: center;
    height: 95vh;
    .bad-data-state-container {
      width: 100%;
    }
    .match-list-container {
      width: 60%;
    }
    .player-details-container {
      width: 60%;
    }
  }
`;

export default function Home({matches, players}: IndexPagePropsInterface) {

  console.log(matches, players);

  if (!matches || !players) {
    return (
      <>
        <HeadMetaData />
        <div>NAVBAR</div>
        <BadDataState badDataItemsString="matches and players"/>
      </>
    )
  }

  return (
    <>
      <HeadMetaData />
      <IndexPageStyling>
          <div>Navbar</div>
            <div
              className="index-content-container">
              <div
                className="match-list-container">
                MATCH LIST
              </div>
              <div
                className="player-details-container">
                PLAYER
              </div>
            </div>
          <TennisMatchTrackerFooter />
      </IndexPageStyling>
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
    const playersCollection = db.collection('players');
    const players = await playersCollection.find().toArray();
    client.close();
    return {

      props: {
        matches: matches.map((match) => ({
          id: match._id.toString(),
          playerOne: match.playerOne,
          playerTwo: match.playerTwo,
          winner: match.winner,
          date: match.date,
          score: match.score,
          city: match.city,
          location: match?.location ? match?.location : 'No location was submitted'
        })),
        players: players.map((player) => ({
          id: player._id.toString(),
          firstName: player.firstName,
          lastName: player.lastName,
          bio: player.bio,
          dateOfBirth: player.dateOfBirth,
          wins: player.wins,
          losses: player.losses,
          // image: player.image,
          country: player.country,
          city: player.city,
          email: player.email
        }))
      },
      revalidate: 60,
    };
  } catch(error) {
    console.error(error);
  }
}
