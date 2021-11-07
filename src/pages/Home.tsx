import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import TourListItem from '../components/TourListItem';
import {
  setTourList,
  updateTourList,
  setSelectedTour,
  fetchTourList
} from '../reducer/tourReducer';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import './Home.css';
import FilterContainer from '../components/filtering/FilterContainer';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { tourList, status } = useSelector(
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
          <IonTitle>Upcoming Tour List 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <FilterContainer />
        <IonRefresher slot='fixed' onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Upcoming Tour List</IonTitle>
          </IonToolbar>
        </IonHeader>

        {status === 'SUCCEED' ? (
          <IonList>
            {tourList.map(tour => (
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
