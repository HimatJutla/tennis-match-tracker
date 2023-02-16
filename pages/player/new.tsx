import HeadMetaData from '@/components/headMetaData/headMetaData';
import PlayerForm from '@/components/players/playerForm';
import TennisMatchTrackerFooter from '@/components/ui/footer/tennis-match-tracker-footer';
import TennisMatchTrackerHeader from '@/components/ui/header/tennis-match-tracker-header';
import { Player } from '@/interfaces/player/player.interface';
import router from 'next/router';

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
          console.log(data);
        } catch(error) {
          console.error(error);
        }
        router.push('/');
    }

  return (
    <>
      <HeadMetaData />
      <TennisMatchTrackerHeader />
      <div>Navbar</div>
      <div>
        <PlayerForm onPlayerFormComplete={handleOnPlayerFormCompleted}/>
      </div>
      <TennisMatchTrackerFooter />
    </>
  )
}
