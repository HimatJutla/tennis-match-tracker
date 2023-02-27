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
import { FindPlayerPageProps } from '@/interfaces/props/page-props/find-player-page-props.interface';
import FindPlayerForm from '@/components/find-player/find-player-form';

const FindPlayerPageStyling = styled.div`
  .footer-container {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  .find-player-page-container {
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

export default function FindPlayerPage({players, matches}: FindPlayerPageProps) {

    const [allPlayers, setAllPlayers] = useState(players);
    const [filteredPlayers, setFilteredPlayers] = useState(players);
    const [currentSelectedPlayer, setCurrentSelectedPlayer] = useState('');
  
    const handleFilterFindPlayers = (city: string): void => {
      setCurrentSelectedPlayer(city);
    }

    const formatPlayerName = (playerName: string): string => {
        return playerName.replace(/\s+/g, '').replace('-', '').toLowerCase();
    }

    const filterPlayersByName = (playerName: string, allPlayersList: Array<Player>): Array<Player> => {
        const filteredPlayers = allPlayersList.filter((player: Player) => {
            const formattedInputtedPlayerName = formatPlayerName(playerName);
            const formattedPlayerName = formatPlayerName(`${player?.firstName}${player?.lastName}`);
            if (formattedPlayerName.includes(formattedInputtedPlayerName)) {
                return player;
            }
        });
        return filteredPlayers;
    }
  
    useEffect(() => {
        if (currentSelectedPlayer !== null && currentSelectedPlayer !== '') {
            const filteredPlayers = filterPlayersByName(currentSelectedPlayer, allPlayers);
            setFilteredPlayers(filteredPlayers);
        }
    }, [currentSelectedPlayer]);

  return (
    <>
      <HeadMetaData />
      <TennisMatchTrackerHeader />
      <Navbar />
      <FindPlayerPageStyling>
        <div
          className="find-player-page-container">
           <div
            className="mb-4 white-text large-text">
            ENTER PLAYER NAME
          </div>
      <div>
        <FindPlayerForm onFindPlayerFormComplete={handleFilterFindPlayers}/>
      </div>
      {
        currentSelectedPlayer &&
        <div>
            <div className="mb-3 white-text">
                Showing Results for {currentSelectedPlayer}
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
      </FindPlayerPageStyling>
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
          })).reverse(),
          matches: matches.map((match) => ({
            id: match._id.toString(),
            playerOne: match.playerOne,
            playerTwo: match.playerTwo,
            winner: match.winner,
            date: match.date,
            score: match.score,
            city: match.city,
            location: match?.location ? match?.location : 'No location submitted',
            image: match?.image ? match.image : '/default-tennis-match-picture.png'
          })).reverse(),
        },
        revalidate: 60,
      };
    } catch(error) {
      console.error(error);
    }
  }
