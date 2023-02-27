import { Match } from '@/interfaces/match/match.interface';
import { MatchListComponentPropsInterface } from '@/interfaces/props/component-props/match-list-component-props.interface';
import styled from 'styled-components';
import EmptyState from '../ui/emptyState/emptyState';
import MatchCard from './match-card';

const MatchListStyling = styled.div`
z-index: 1;
  padding-bottom: 5%;
  .matches-container {
    margin-bottom: 3%;
  }
`;

export default function MatchesList({matches}: MatchListComponentPropsInterface) {

  if (!matches?.length) {
    return (
        <>
            <EmptyState pluralizedEmptyItem="matches" singularEmptyItem="match" navLink="/match/new" />
        </>
      )
  }

  return (
    <>
      <MatchListStyling>
        <div
          className="matches-container grid grid-cols-2 gap-2">
          {matches.map((match: Match) => (
            <MatchCard key={match?.id} match={match}/>
          ))}
        </div>
      </MatchListStyling>
    </>
  )
}
