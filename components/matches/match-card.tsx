import { MatchSet } from '../../interfaces/match/match-score.interface';
import { MatchCardComponentPropsInterface } from '@/interfaces/props/component-props/match-card-component-props.interface';
import styled from 'styled-components';

const MatchCardStyling = styled.div`
    margin-bottom: 3%;
    padding: 3%;
    border: 1px solid black;
    .container-block {
        min-height: 45vh;
        max-height: 45vh;
    }
    .match-card-title {
        font-size: 1.25 rem;
        font-weight: 600;
    }
    .winner-block {
        border: 1px solid black;
        border-radius: 5%;
        padding: 3%;
    }
`;

export default function MatchCard({match}: MatchCardComponentPropsInterface) {

  if (!match) {
    return (
        <>
            Sorry, something went wrong with this match's data
        </>
      )
  }

  return (
      <MatchCardStyling>
        <div
            className="container-block flex flex-col justify-between content-between">
        <div
            className="flex items-center justify-between">
            <div
                className="player-block">
                <div>
                    <span>C</span> <span>{match.playerOne.firstName} {match.playerOne.lastName}</span>
                </div>
            </div>
            <div
                className="player-block">
                <div>
                    <span>C</span> <span>{match.playerTwo.firstName} {match.playerTwo.lastName}</span>
                </div>
            </div>
        </div>
        <div
            className="flex items-center justify-between">
            <div
                className="score-block">
                <div
                    className="match-card-title mb-2">
                    Sets Played: {match?.score?.numberOfSets}
                </div>
                {match?.score?.sets.map((set: MatchSet, index: number) => (
                    <div className="mb-1">
                    <div>
                        Set # {index + 1}: {set.playerOneScore} - {set.playerTwoScore}
                    </div>
                    </div>
                ))}
            </div>
            <div
                className="flex flex-col items-end">
                <div
                    className="mb-2">
                    Date: {match?.date}
                </div>
                <div
                    className="mb-2">
                    City: {match?.city}
                </div>
                {match?.location &&
                    <div
                        className="mb-2">
                        Location: {match?.location}
                    </div>
                }
            </div>
        </div>
        {match?.image &&
            <div
                className="flex justify-center items-center">
                <div>
                    <img width="100" height="100" src={match.image} alt="Image of the match"/>
                </div>
            </div>
        }
        <div
            className="flex justify-center items-center winner-block">
            <div>
                Winner: <span>C</span> <span>{match.playerTwo.firstName} {match.playerTwo.lastName}</span>
            </div> 
        </div>
        </div>
      </MatchCardStyling>
  )
}
