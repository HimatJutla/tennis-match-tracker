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
import { IndexPagePropsInterface } from '@/interfaces/props/page-props/index-page-props.interface';
import { MongoClient } from 'mongodb';
import { useState } from 'react';
import styled from 'styled-components';


const IndexPageStyling = styled.div`
  .footer-container {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  .index-content-container {
    background-color: #5A8100;
    padding: 2% 5% 0 5%;
    display: flex;
    align-items: start;
    min-height: 85vh;
    .bad-data-state-container {
      width: 100%;
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

export default function Home({matches, players}: IndexPagePropsInterface) {

  const [allMatches, setAllMatches] = useState(matches);
  const [filteredMatches, setFilteredMatches] = useState(matches);

  const handleFilterMatchesByPlayerPassed = (passedPlayer: Player): void => {
    const filteredMatches = allMatches.filter((match: Match) => {
      return match.playerOne.id === passedPlayer.id || match.playerTwo.id === passedPlayer.id;
    });
    setFilteredMatches(filteredMatches);
  }

  const resetMatchFilters = (): void => {
    setFilteredMatches(allMatches);
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
      <Navbar />
      <IndexPageStyling>
            <div
              className="index-content-container">
              <div
                className="match-list-container">
                <div
                  className="mb-4 white-text large-text">
                    MOST RECENT MATCHES:
                  </div>
                  <div
                    className="flex items-end mb-4">
                    <PlayerList
                      passedPlayers={players}
                      playerNumber={1}
                      labelText='Find Match by Player:'
                      selectId="filterByPlayer" 
                      passCurrentPlayerToParent={handleFilterMatchesByPlayerPassed}
                    />
                    {matches?.length && players?.length ?
                      <button
                        className="ml-5 py-1 px-2"
                        disabled={filteredMatches == allMatches}
                        onClick={resetMatchFilters}>
                        SHOW ALL MATCHES
                      </button>
                    :
                      <div></div>
                    }
                  </div>
                  {matches?.length && players?.length ?
                    <div className=" mb-3 white-text">
                      {filteredMatches == allMatches ? 'Showing results for all players' : 'Showing results for selected player'}
                    </div>
                  :
                    <div></div>
                  }
                  <MatchesList matches={filteredMatches}/>
              </div>
              <div
                className="player-rankings-container">
                <div
                  className="mb-4 white-text large-text">
                  PLAYER RANKINGS:
                </div>
                <PlayersRanking players={players} matches={matches}/>
              </div>
            </div>
            <div
              className="footer-container">
              <TennisMatchTrackerFooter />
            </div>
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
      revalidate: 10,
    };
  } catch(error) {
    console.error(error);
  }
}
