import FindMatchForm from '@/components/find-match/find-match-form';
import HeadMetaData from '@/components/ui/headMetaData/headMetaData';
import TennisMatchTrackerFooter from '@/components/ui/footer/tennis-match-tracker-footer';
import TennisMatchTrackerHeader from '@/components/ui/header/tennis-match-tracker-header';
import { mongoDbCLientConnectionUrl } from '@/consts/mongodb-client-url-connect';
import { Player } from '@/interfaces/player/player.interface';
import { MongoClient } from 'mongodb';
import { FindMatchPageProps } from '@/interfaces/props/page-props/find-match-page-props.interface';
import { useEffect, useState } from 'react';
import EmptyState from '@/components/ui/emptyState/emptyState';
import PlayerDetails from '@/components/players/playerDetailsCard';

export default function FindMatchPage({players}: FindMatchPageProps) {

    const [allPlayers, setAllPlayers] = useState(players);
    const [filteredPlayers, setFilteredPlayers] = useState(players);
    const [currentSelectedCity, setCurrentSelectedCity] = useState('');
  
    const handleFilterFindMatches = (city: string): void => {
      setCurrentSelectedCity(city);
    }

    const formatCity = (city: string): string => {
        return city.replace(/\s+/g, '').replace('-', '').toLowerCase();
    }

    const filterPlayersByCity = (city: string, allPlayersList: Array<Player>): Array<Player> => {
        const filteredPlayers = allPlayersList.filter((player: Player) => {
            const formattedInputtedCity = formatCity(city);
            const formattedPlayerCity = formatCity(player?.city);
            if (formattedInputtedCity === formattedPlayerCity) {
                return player;
            }
        });
        console.log(filteredPlayers);
        return filteredPlayers;
    }
  
    useEffect(() => {
        if (currentSelectedCity !== null && currentSelectedCity !== '') {
            const filteredPlayers = filterPlayersByCity(currentSelectedCity, allPlayers);
            console.log(players);
            setFilteredPlayers(filteredPlayers);
        }
    }, [currentSelectedCity]);

  return (
    <>
      <HeadMetaData />
      <TennisMatchTrackerHeader />
      <div>Navbar</div>
      <div
        className="mb-4">
        ENTER YOUR CITY TO FIND PLAYERS AND CONTACT THEM TO SET UP A MATCH!
      </div>
      <div>
        <FindMatchForm onFindMatchFormComplete={handleFilterFindMatches}/>
      </div>
      {
        currentSelectedCity &&
        <div>
            <div>
                Showing Players in {currentSelectedCity}
            </div>
            {filteredPlayers?.length ?
                <div
                    className="grid grid-cols-3 gap-3">
                    {filteredPlayers.map((player: Player) => (
                        <PlayerDetails key={player.id} player={player}/>
                    ))}
                </div>
            : <EmptyState emptyItem='player' navLink='player/new'/>}
        </div>
      }
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
          players: players.map((player) => ({
            id: player._id.toString(),
            firstName: player.firstName,
            lastName: player.lastName,
            bio: player.bio,
            dateOfBirth: player.dateOfBirth,
            wins: player?.wins ? player.wins : null,
            losses: player?.losses ? player.losses : null,
            image: player?.image ? player.image : null,
            country: player.country,
            city: player.city,
            email: player.email
          })).reverse()
        },
        revalidate: 60,
      };
    } catch(error) {
      console.error(error);
    }
  }
  