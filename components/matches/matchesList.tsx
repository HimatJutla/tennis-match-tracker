import { Match } from '@/interfaces/match/match.interface';
import { MatchListComponentPropsInterface } from '@/interfaces/props/component-props/match-list-component-props.interface';
import styled from 'styled-components';
import EmptyState from '../emptyState/emptyState';
import MatchCard from './match-card';

const MatchListStyling = styled.div`
  padding: 2%;
  margin-bottom: 3%;
  .matches-list-title-block {
    margin-bottom: 4%;
  }
  .matches-container {
    margin-bottom: 3%;
  }
`;

export default function MatchesList({matches}: MatchListComponentPropsInterface) {

  if (!matches?.length) {
    return (
        <>
            <EmptyState emptyItem="matche" navLink="/match/new"/>
        </>
      )
  }

  return (
    <>
      <MatchListStyling>
        <div
          className="matches-list-title-block">MOST RECENT MATCHES:</div>
        <div
          className="matches-container">
          {matches.map((match: Match) => (
            <MatchCard key={match?.id} match={match}/>
          ))}
        </div>
      </MatchListStyling>
    </>
  )
}
