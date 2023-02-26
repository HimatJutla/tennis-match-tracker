import { PlayerDetailsComponentInterface } from '@/interfaces/props/component-props/player-details-component-props.interface';
import styled from 'styled-components';
import BadDataState from '../ui/badDataState/badDataState';

const PlayerDetailsCardStyling = styled.div`
    margin-bottom: 3%;
    padding: 3%;
    background-color: #FFB400;
    border-radius: 2%;
    .player-img {
        border-radius: 5%;
        border-radius: 5%;
        border: 1px solid black;
    }
    .player-name-block {
        font-size: 1.35rem;
        border-bottom: 2px solid #5A8100;
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
            <div className="mb-5 player-name-block pb-2">
                <div>
                    <span>{player?.country?.flag}</span>  <strong><span>{player?.firstName} {player?.lastName}</span></strong>
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
                    <img className="player-img" width="180" height="180" src={player.image} alt="Image of this player"/>
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
