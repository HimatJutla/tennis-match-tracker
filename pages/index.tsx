import BadDataState from '@/components/badDataState/badDataState';
import HeadMetaData from '@/components/headMetaData/headMetaData';
import TennisMatchTrackerFooter from '@/components/ui/footer/tennis-match-tracker-footer';
import TennisMatchTrackerHeader from '@/components/ui/header/tennis-match-tracker-header';
import Navbar from '@/components/ui/navbar/tennis-match-tracker-navbar';
import { mongoDbCLientConnectionUrl } from '@/consts/mongodb-client-url-connect';
import { Match } from '@/interfaces/match.interface';
import { IndexPagePropsInterface } from '@/interfaces/props/page-props/index-page-props.interface';
import { MongoClient } from 'mongodb';
import styled from 'styled-components';


const IndexPageStyling = styled.div`
  .index-content-container {
    display: flex;
    align-items: center;
    height: 85vh;
    .bad-data-state-container {
      width: 100%;
    }
    .match-list-container {
      width: 60%;
    }
    .player-rankings-container {
      width: 40%;
    }
  }
`;

export default function Home({matches, players}: IndexPagePropsInterface) {

  if (!matches || !players) {
    return (
      <>
        <HeadMetaData />
        <Navbar />
        <div
          className="bad-data-state-container">
          <BadDataState badDataItemsString="matches and players"/>
        </div>
      </>
    )
  }

  return (
    <>
      <HeadMetaData />
      <TennisMatchTrackerHeader />
      <Navbar />
      <IndexPageStyling>
            <div
              className="index-content-container">
              <div
                className="match-list-container">
                MATCH LIST
              </div>
              <div
                className="player-rankings-container">
                PLAYER RANKINGS HERE
              </div>
            </div>
      </IndexPageStyling>
      <TennisMatchTrackerFooter />
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
