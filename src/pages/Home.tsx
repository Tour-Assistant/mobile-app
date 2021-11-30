import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../store';
import TourListItem from '../components/TourListItem';
import { fetchTourList, setSearchText } from '../reducer/tourReducer';
import './Home.css';

import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonToolbar
} from '@ionic/react';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { filteredTourList, status, searchText } = useSelector(
    (state: RootState) => state.tourState
  );

  const refresh = (e: CustomEvent) => {
    dispatch(fetchTourList());
    if (status !== 'LOADING') e.detail.complete();
  };

  return (
    <IonPage id='home-page'>
      <IonHeader>
        <IonToolbar>
          <IonSearchbar
            value={searchText}
            onIonChange={e => dispatch(setSearchText(e.detail.value!))}
            placeholder='Search Upcoming Tours'
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot='fixed' onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {status === 'SUCCEED' ? (
          <IonList>
            {filteredTourList.map(tour => (
              <TourListItem key={tour.id} tour={tour} />
            ))}
          </IonList>
        ) : (
          `Loading... Please Wait (${status}).`
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
