import BadDataState from '@/components/ui/badDataState/badDataState';
import HeadMetaData from '@/components/ui/headMetaData/headMetaData';
import MatchesList from '@/components/matches/matchesList';
import PlayerList from '@/components/players/playerList';
import PlayersRanking from '@/components/players/playersRanking';
import TennisMatchTrackerFooter from '@/components/ui/footer/tennis-match-tracker-footer';
import TennisMatchTrackerHeader from '@/components/ui/header/tennis-match-tracker-header';
import Navbar from '@/components/ui/navbar/tennis-match-tracker-navbar';
import { mongoDbCLientConnectionUrl } from '@/consts/mongodb-client-url-connect';
import { Match } from '@/interfaces/match/match.interface';
import { Player } from '@/interfaces/player/player.interface';
import { MongoClient } from 'mongodb';
import { useState } from 'react';
import { HeadToHeadPagePropsInterface } from '@/interfaces/props/page-props/find-match-page-props.interface';
import { devNull } from 'os';

export default function HeadToHead({matches, players}: HeadToHeadPagePropsInterface) {

    const [headToheadPlayerOne, setHeadToHeadPlayerOne] = useState(players?.length > 1 ? players[0] : null);
    const [headToheadPlayerTwo, setHeadToHeadPlayerTwo] = useState(players?.length > 1 ? players[1] : null);
    const [headToHeadMatches, setHeadToHeadMatches] = useState([]);
    const [showHeadToHeadSubcomponent, setShowHeadToHeadSubcomponent] = useState(false);

    // Handlers
    const handlePlayerOneSelected = (player: Player): void => {
        console.log(player);
        setHeadToHeadPlayerOne(player);
    }
    const handlePlayerTwoSelected = (player: Player): void => {
        console.log(player);
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

    // Form Submission
    const handleHeadToHeadFormSubmitted = (event: any): void => {
        event?.preventDefault();

    }

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
            <form onSubmit={handleHeadToHeadFormSubmitted}>
                <div
                    className="mb-4">
                    SELECT TWO PLAYERS TO COMPARE HEAD TO HEAD:
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
                    <button type="submit">
                        COMPARE
                    </button>
                </div>
            </form>
            {showHeadToHeadSubcomponent ?
                <HeadToHeadComparison
                    headToheadPlayerOne={headToheadPlayerOne}
                    headToheadPlayerTwo={headToheadPlayerTwo}
                    headToHeadMatches={headToHeadMatches}
                /> : <div></div>
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
          image: match?.image ? match.image : null
        })).reverse(),
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
