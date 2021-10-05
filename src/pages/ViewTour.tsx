import { useState } from "react";
import { getTour } from "../data/tours";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import TourListItem from "../components/TourListItem";
import {
  setTourList,
  updateTourList,
  setSelectedTour,
  fetchTourList,
} from "../reducer/tourReducer";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { personCircle } from "ionicons/icons";
import { useParams } from "react-router";
import "./ViewTour.css";
import { Tour } from "../types/tourType";

function ViewTour() {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();
  const { selectedTour } = useSelector((state: RootState) => state.tourState);

  useIonViewWillEnter(() => {
    dispatch(setSelectedTour(id));
  });

  return (
    <IonPage id="view-tour-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Inbox" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {selectedTour ? (
          <>
            <IonItem>
              <IonIcon icon={personCircle} color="primary"></IonIcon>
              <IonLabel className="ion-text-wrap">
                <h2>
                  {selectedTour.title}
                  <span className="date">
                    <IonNote>{selectedTour.title}</IonNote>
                  </span>
                </h2>
                <h3>
                  To: <IonNote>Me</IonNote>
                </h3>
              </IonLabel>
            </IonItem>

            <div className="ion-padding">
              <h1>{selectedTour.title}</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </>
        ) : (
          <div>Message not found</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewTour;
