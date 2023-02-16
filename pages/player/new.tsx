import EmptyState from '@/components/emptyState/emptyState';
import HeadMetaData from '@/components/headMetaData/headMetaData';
import MatchesForm from '@/components/matches/matches-form';
import PlayerForm from '@/components/players/playerForm';
import TennisMatchTrackerFooter from '@/components/ui/footer/tennis-match-tracker-footer';
import TennisMatchTrackerHeader from '@/components/ui/header/tennis-match-tracker-header';
import { mongoDbCLientConnectionUrl } from '@/consts/mongodb-client-url-connect';
import { Match } from '@/interfaces/match/match.interface';
import { Player } from '@/interfaces/player/player.interface';
import { MatchPagesProps } from '@/interfaces/props/page-props/match-pages-props.interface';
import { MongoClient } from 'mongodb';
import router from 'next/router';

export default function NewPlayerPage() {

    const handleOnPlayerFormCompleted = async(enteredPlayerData: Player): Promise<any> => {
        try {
          const playerAddedResponse = await fetch('../api/player/new', {
            method: 'POST',
            body: JSON.stringify(enteredPlayerData),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await playerAddedResponse.json();
          console.log(data);
        } catch(error) {
          console.error(error);
        }
        router.push('/');
    }

  return (
    <>
      <HeadMetaData />
      <TennisMatchTrackerHeader />
      <div>Navbar</div>
      <div>
        <PlayerForm onPlayerFormComplete={handleOnPlayerFormCompleted}/>
      </div>
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
            wins: player?.wins ? player.wins : null,
            losses: player?.losses ? player.losses : null,
            image: player?.image ? player.image: null,
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
  
