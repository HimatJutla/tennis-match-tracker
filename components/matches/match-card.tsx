import { Match } from '@/interfaces/match/match.interface';
import { MatchCardComponentPropsInterface } from '@/interfaces/props/component-props/match-card-component-props.interface';
import styled from 'styled-components';

const MatchCardStyling = styled.div`
    padding: 2%;
    margin-bottom: 3%;
    border: 1px solid black;
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
    <>
      <MatchCardStyling>
        <div>
            {match.playerOne.bio}
        </div>
      </MatchCardStyling>
    </>
  )
}
