import { MatchSet } from '../../interfaces/match/match-score.interface';
import { MatchCardComponentPropsInterface } from '@/interfaces/props/component-props/match-card-component-props.interface';
import styled from 'styled-components';
import BadDataState from '../ui/badDataState/badDataState';

const MatchCardStyling = styled.div`
    margin-bottom: 3%;
    padding: 3%;
    background-color: #FFB400;
    border-radius: 8%;
    .container-block {
        min-height: 50vh;
        max-height: 50vh;
    }
    .players-block {
        border-bottom: 2px solid #5A8100;
    }
    .player-block {
        font-size: 1.35rem;
    }
    .img-container img {
        border-radius: 5%;
        border: 1px solid black;
    }
    .match-card-title {
        font-size: 1.25 rem;
        font-weight: 600;
    }
    .winner-block {
        border-top: 2px solid #5A8100;
        font-size: 1.5rem;
    }
`;

export default function MatchCard({match}: MatchCardComponentPropsInterface) {

  if (!match) {
    return (
        <>
            <BadDataState badDataItemsString='this match'/>
        </>
      )
  }

  return (
      <MatchCardStyling>
        <div
            className="container-block flex flex-col justify-between content-between p-3">
        <div
            className="flex items-center justify-between players-block pb-3">
            <div
                className="player-block">
                <div>
                <span>{match?.playerOne?.country?.flag}</span> <span>{match.playerOne.firstName} {match.playerOne.lastName}</span>
                </div>
            </div>
            <div
                className="player-block">
                <div>
                <span>{match?.playerTwo?.country?.flag}</span> <span>{match.playerTwo.firstName} {match.playerTwo.lastName}</span>
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
                    <div className="mb-1" key={index + 1}>
                        <div>
                            <strong>Set {index + 1}:</strong> {set.playerOneScore} - {set.playerTwoScore}
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
                <div className="img-container">
                    <img width="180" height="180" src={match.image} alt="Image of the match"/>
                </div>
            </div>
        }
        <div
            className="flex justify-center items-center winner-block pt-3">
            <div>
                <span>{match?.winner?.country?.flag}</span> <span>{match?.winner?.firstName} {match?.winner?.lastName}</span> Wins
            </div> 
        </div>
        </div>
      </MatchCardStyling>
  )
}
