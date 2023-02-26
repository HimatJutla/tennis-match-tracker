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
import Navbar from '@/components/ui/navbar/tennis-match-tracker-navbar';
import styled from 'styled-components';

const FindMatchPageStyling = styled.div`
  .footer-container {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  .find-match-page-container {
    background-color: #5A8100;
    padding: 2% 5% 5% 5%;
    min-height: 85vh;
  }
    .match-list-container {
      width: 65%;
      padding-right: 1.5%;
    }
    .player-rankings-container {
      width: 35%;
      padding-left: 1.5%;
    }
  }
`;

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
        return filteredPlayers;
    }
  
    useEffect(() => {
        if (currentSelectedCity !== null && currentSelectedCity !== '') {
            const filteredPlayers = filterPlayersByCity(currentSelectedCity, allPlayers);
            setFilteredPlayers(filteredPlayers);
        }
    }, [currentSelectedCity]);

  return (
    <>
      <HeadMetaData />
      <TennisMatchTrackerHeader />
      <Navbar />
      <FindMatchPageStyling>
        <div
          className="find-match-page-container">
           <div
            className="mb-4 white-text large-text">
            ENTER YOUR CITY AND FIND YOUR MATCH
          </div>
      <div>
        <FindMatchForm onFindMatchFormComplete={handleFilterFindMatches}/>
      </div>
      {
        currentSelectedCity &&
        <div>
            <div className="mb-3 white-text">
                Showing Players in {currentSelectedCity}
            </div>
            {filteredPlayers?.length ?
                <div
                    className="grid grid-cols-3 gap-3">
                    {filteredPlayers.map((player: Player) => (
                        <PlayerDetails key={player.id} player={player}/>
                    ))}
                </div>
            : <EmptyState pluralizedEmptyItem="players" singularEmptyItem="player" navLink="/player/new" />}
        </div>
      }
        </div>
      <div className="footer-container">
        <TennisMatchTrackerFooter />
      </div>
      </FindMatchPageStyling>
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
            wins: player?.wins ? player.wins : 0,
            losses: player?.losses ? player.losses : 0,
            totalMatches: player?.totalMatches ? player.totalMatches : 0,
            winningPercentage: player?.winningPercentage ? player.winningPercentage : 0,
            image: player?.image ? player.image : '/default-profile-picture.png',
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
