import { useSelector, useDispatch } from 'react-redux';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonRow,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import { airplane } from 'ionicons/icons';
import moment from 'moment';
import { useParams } from 'react-router';
import _ from 'lodash';

import { RootState } from '../store';
import {
  setSelectedHostedBy,
  setSelectedTour,
  setShowContactModal,
} from '../reducer/tourReducer';
import './ViewTour.css';
import { Contact } from '../components/shared/Contact';
import { useEffect } from 'react';

function ViewTour() {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();
  const { selectedTour } = useSelector((state: RootState) => state.tourState);

  useEffect(() => {
    dispatch(setSelectedTour(id));
  }, []);

  return (
    <IonPage id="view-tour-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              text="Go To Tour List"
              defaultHref="/tabs/events"
            ></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {selectedTour ? (
          <>
            <IonItem>
              <IonIcon icon={airplane}></IonIcon>
              <IonLabel className="ion-text-wrap">
                <h2>
                  {selectedTour.title}
                  <IonNote className="right-item">
                    {moment(selectedTour.startAt).format('dddd, Do MMMM')}
                  </IonNote>
                </h2>
                <IonNote className="right-item">
                  {selectedTour.budget} Taka
                </IonNote>
                {_.map(selectedTour.places, (place: string) => (
                  <IonChip color="primary">
                    <IonLabel>{place}</IonLabel>
                  </IonChip>
                ))}
              </IonLabel>
            </IonItem>

            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonButton
                    expand="block"
                    onClick={() =>
                      window.open(selectedTour.reference, '_system')
                    }
                  >
                    Original Link
                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonButton
                    expand="block"
                    color="warning"
                    onClick={() => {
                      dispatch(setShowContactModal(true));
                      dispatch(setSelectedHostedBy(selectedTour.hostedBy));
                    }}
                  >
                    Call For Booking
                  </IonButton>
                  <Contact />
                </IonCol>
              </IonRow>
            </IonGrid>

            <div className="ion-padding">
              <h1>{selectedTour.title}</h1>
              {selectedTour.description.split('\n').map((str) => (
                <p>{str}</p>
              ))}
            </div>
          </>
        ) : (
          <div>Tour details not found</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewTour;
