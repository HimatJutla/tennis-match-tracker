import HeadMetaData from '@/components/ui/headMetaData/headMetaData';
import PlayerForm from '@/components/players/playerForm';
import TennisMatchTrackerFooter from '@/components/ui/footer/tennis-match-tracker-footer';
import TennisMatchTrackerHeader from '@/components/ui/header/tennis-match-tracker-header';
import { Player } from '@/interfaces/player/player.interface';
import router from 'next/router';
import Navbar from '@/components/ui/navbar/tennis-match-tracker-navbar';
import styled from 'styled-components';


const PlayerPageStyling = styled.div`
  .footer-container {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  .player-content-container {
    background-color: #5A8100;
    padding: 2% 5% 5% 5%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 85vh;
    .bad-data-state-container {
      width: 100%;
    }
  }
`;


export default function NewPlayerPage() {

    const handleOnPlayerFormCompleted = async(enteredPlayerData: Player): Promise<any> => {
        try {
          const playerAddedResponse = await fetch('../api/player/new', {
            method: 'POST',
            body: JSON.stringify(enteredPlayerData),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await playerAddedResponse.json();
        } catch(error) {
          console.error(error);
        }
        router.push('/');
    }

  return (
    <>
      <HeadMetaData />
      <TennisMatchTrackerHeader />
      <Navbar />
      <PlayerPageStyling>
      <div
        className="player-content-container">
        <PlayerForm onPlayerFormComplete={handleOnPlayerFormCompleted}/>
      </div>
      <div
          className="footer-container">
          <TennisMatchTrackerFooter />
        </div>
      </PlayerPageStyling>
    </>
  )
}
