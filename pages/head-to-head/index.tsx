import BadDataState from '@/components/ui/badDataState/badDataState';
import HeadMetaData from '@/components/ui/headMetaData/headMetaData';
import PlayerList from '@/components/players/playerList';
import TennisMatchTrackerFooter from '@/components/ui/footer/tennis-match-tracker-footer';
import TennisMatchTrackerHeader from '@/components/ui/header/tennis-match-tracker-header';
import Navbar from '@/components/ui/navbar/tennis-match-tracker-navbar';
import { mongoDbCLientConnectionUrl } from '@/consts/mongodb-client-url-connect';
import { Match } from '@/interfaces/match/match.interface';
import { Player } from '@/interfaces/player/player.interface';
import { MongoClient } from 'mongodb';
import { useEffect, useState } from 'react';
import { HeadToHeadPagePropsInterface } from '@/interfaces/props/page-props/find-match-page-props.interface';
import HeadToHeadComparison from '@/components/head-to-head/head-to-head-comparison';

export default function HeadToHead({matches, players}: HeadToHeadPagePropsInterface) {

    const [headToheadPlayerOne, setHeadToHeadPlayerOne] = useState(players?.length > 1 ? players[0] : null);
    const [headToheadPlayerTwo, setHeadToHeadPlayerTwo] = useState(players?.length > 1 ? players[1] : null);
    const [headToHeadMatches, setHeadToHeadMatches] = useState([]);
    const [showHeadToHeadSubcomponent, setShowHeadToHeadSubcomponent] = useState(false);

    // Handlers
    const handlePlayerOneSelected = (player: Player): void => {
        setHeadToHeadPlayerOne(player);
    }
    const handlePlayerTwoSelected = (player: Player): void => {
        setHeadToHeadPlayerTwo(player);
    }

    // Utils
    const headToHeadMatchesHandler = () => {
        if (!headToheadPlayerOne || !headToheadPlayerTwo) {
            return;
        }
        setShowHeadToHeadSubcomponent(false);
        let finalFilteredHeadToHeadMatches: any = [];
        const playerOneMatches = matches.filter((match: Match) => {
            return match.playerOne.id === headToheadPlayerOne.id || match.playerTwo.id === headToheadPlayerOne.id;
        });
        if (playerOneMatches.length) {
            finalFilteredHeadToHeadMatches = playerOneMatches.filter((match: Match) => {
                return match.playerOne.id === headToheadPlayerTwo.id || match.playerTwo.id === headToheadPlayerTwo.id;
            });
        }
        setHeadToHeadMatches(finalFilteredHeadToHeadMatches);
        setShowHeadToHeadSubcomponent(true);
    };

    useEffect(() => {
        headToHeadMatchesHandler();
    }, [headToheadPlayerOne, headToheadPlayerTwo])

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
        <div>Navbar</div>
        {players?.length > 1 ?
            <div>
            <div>
                <div
                    className="mb-4 title-container">
                    SELECT TWO PLAYERS:
                </div>
                <div
                    className="flex items-center">
                    <div
                        className="mr-5">
                        <PlayerList
                            labelText='Player One'
                            selectId='playerOne'
                            passedPlayers={players}
                            playerNumber={1}
                            defaultPlayer={headToheadPlayerOne ? headToheadPlayerOne : players[0]}
                            passCurrentPlayerToParent={handlePlayerOneSelected}
                        />
                    </div>
                    <div
                        className="mr-5">
                        <PlayerList
                            labelText='Player Two'
                            selectId='playerTwo'
                            passedPlayers={players}
                            playerNumber={2}
                            defaultPlayer={headToheadPlayerTwo ? headToheadPlayerTwo : players[1]}
                            passCurrentPlayerToParent={handlePlayerTwoSelected}
                        />
                    </div>
                </div>
            </div>
            {showHeadToHeadSubcomponent &&
                <HeadToHeadComparison
                    playerOne={headToheadPlayerOne ? headToheadPlayerOne : players[0]}
                    playerTwo={headToheadPlayerTwo ? headToheadPlayerTwo: players[1]}
                    headToHeadMatches={headToHeadMatches}
                />
            }
            </div>
        : 
            <div>
                There aren't enough players to compare head to head
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
