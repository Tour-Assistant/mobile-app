import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import TourListItem from "../components/TourListItem";
import {
  setTourList,
  updateTourList,
  setSelectedTour,
  fetchTourList,
} from "../reducer/tourReducer";
import { useState } from "react";
import { getTours } from "../data/tours";
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Home.css";
import { Tour } from "../types/tourType";
import { useEffect } from "react";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { tourList, status } = useSelector(
    (state: RootState) => state.tourState
  );

  const refresh = (e: CustomEvent) => {
    dispatch(fetchTourList());
    if (status !== "LOADING") e.detail.complete();
  };

  useEffect(() => {
    dispatch(fetchTourList());
  }, []);

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Upcoming</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Upcoming</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {tourList.map((tour) => (
            <TourListItem key={tour.id} tour={tour} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
