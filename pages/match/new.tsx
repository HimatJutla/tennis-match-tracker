import BadDataState from '@/components/badDataState/badDataState';
import EmptyState from '@/components/emptyState/emptyState';
import HeadMetaData from '@/components/headMetaData/headMetaData';
import MatchesForm from '@/components/matches/matches-form';
import TennisMatchTrackerFooter from '@/components/ui/footer/tennis-match-tracker-footer';
import TennisMatchTrackerHeader from '@/components/ui/header/tennis-match-tracker-header';
import { mongoDbCLientConnectionUrl } from '@/consts/mongodb-client-url-connect';
import { Match } from '@/interfaces/match/match.interface';
import { MatchPagesProps } from '@/interfaces/props/page-props/match-pages-props.interface';
import { MongoClient } from 'mongodb';
import styled from 'styled-components';


const MatchPageStyling = styled.div`
`;

export default function NewMatchPage({players}: MatchPagesProps) {

    const handleOnMatchFormCompleted = (matchData: Match)=> {
        console.log('match', matchData);
    }

  return (
    <>
      <HeadMetaData />
      <TennisMatchTrackerHeader />
      <div>Navbar</div>
      <MatchPageStyling>
        {players?.length > 1 ? <MatchesForm players={players} onMatchFormComplete={handleOnMatchFormCompleted}/> : <EmptyState emptyItem="player" navLink="/" />
        }
      </MatchPageStyling>
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
      const playersCollection = db.collection('players');
      const players = await playersCollection.find().toArray();
      client.close();
      return {
  
        props: {
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
  
