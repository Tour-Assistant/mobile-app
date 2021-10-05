import TourListItem from "../components/TourListItem";
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

const Home: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);

  useIonViewWillEnter(() => {
    const msgs = getTours();
    setTours(msgs);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

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
          {tours.map((m) => (
            <TourListItem key={m.id} tour={m} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
