import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import TourListItem from '../components/TourListItem';
import { fetchTourList, setSearchText } from '../reducer/tourReducer';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { filteredTourList, status, searchText } = useSelector(
    (state: RootState) => state.tourState
  );

  const refresh = (e: CustomEvent) => {
    dispatch(fetchTourList());
    if (status !== 'LOADING') e.detail.complete();
  };

  useIonViewWillEnter(() => {
    dispatch(fetchTourList());
  });

  return (
    <IonPage id='home-page'>
      <IonHeader>
        <IonToolbar>
          <IonSearchbar
            value={searchText}
            onIonChange={e => dispatch(setSearchText(e.detail.value!))}
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
