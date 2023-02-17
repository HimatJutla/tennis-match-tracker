import { PlayerDetailsComponentInterface } from '@/interfaces/props/component-props/player-details-component-props.interface';
import styled from 'styled-components';
import BadDataState from '../ui/badDataState/badDataState';

const PlayerDetailsCardStyling = styled.div`
    margin-bottom: 3%;
    padding: 3%;
    border: 1px solid black;
    .container-block {
        min-height: 30vh;
        max-height: 30vh;
    }
    .player-card-title {
        font-size: 1.25 rem;
        font-weight: 600;
    }
`;

export default function PlayerDetailsCard({player}: PlayerDetailsComponentInterface) {
  if (!player) {
    return (
        <>
            <BadDataState badDataItemsString='this player'/>
        </>
      )
  }

  return (
      <PlayerDetailsCardStyling>
        <div
            className="container-block flex items-center justify-between">
        <div>
            <div className="mb-2">
                <div
                    className="player-card-title">
                    Name:
                </div>
                <div>
                    <span>{player?.country?.flag}</span>  <span>{player?.firstName} {player?.lastName}</span>
                </div>
            </div>
            <div className="mb-2">
                <div
                    className="player-card-title">
                    Bio:
                </div>
                <div>
                    {player?.bio}
                </div>
            </div>
            <div className="mb-2">
                <div
                    className="player-card-title">
                    Date Of Birth:
                </div>
                <div>
                    {player?.dateOfBirth}
                </div>
            </div>
        </div>
        <div>
            <div className="mb-2">
            <div
                className="player-card-title">
                Location:
            </div>
            <div>
                {player?.city}, {player?.country?.flag}  {player?.country?.name}
            </div>
            </div>
            {player?.image &&
                <div className="mb-2">
                    <img width="100" height="100" src={player.image} alt="Image of this player"/>
                </div>
            }
            <div className="mb-2">
                <div
                    className="player-card-title">
                    Contact:
                </div>
                <div>
                    {player?.email}
                </div>
            </div>
        </div>
        </div>
      </PlayerDetailsCardStyling>
  )
}
