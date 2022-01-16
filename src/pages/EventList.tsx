import React, { useState, useRef, useEffect } from 'react';

import {
  IonToolbar,
  IonContent,
  IonPage,
  // IonButtons,
  IonTitle,
  IonSegment,
  IonSegmentButton,
  // IonButton,
  // IonIcon,
  IonSearchbar,
  IonRefresher,
  IonRefresherContent,
  IonToast,
  IonHeader,
} from '@ionic/react';
// import { options, menu } from 'ionicons/icons';

import './EventList.scss';
import { SessionList } from '../components/SessionList';
import { useDispatch } from 'react-redux';
import { fetchTourList } from '../reducer/tourReducer';

export const EventList: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTourList());
  }, []);

  const [segment, setSegment] = useState<'all' | 'favorites'>('all');
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);

  const pageRef = useRef<HTMLElement>(null);

  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500);
  };

  return (
    <IonPage ref={pageRef} id="schedule-page">
      <IonHeader translucent={true}>
        <IonToolbar>
          {/* <IonButtons slot="start">
            <IonButton>
              <IonIcon slot="icon-only" icon={menu}></IonIcon>
            </IonButton>
          </IonButtons> */}
          <IonSegment
            value={segment}
            onIonChange={(e) => setSegment(e.detail.value as any)}
          >
            <IonSegmentButton value="all">Upcoming Events</IonSegmentButton>
          </IonSegment>
          {/* <IonButtons slot="end">
            <IonButton>
              <IonIcon icon={options} slot="icon-only" />
            </IonButton>
          </IonButtons> */}
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar placeholder="Search"></IonSearchbar>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Schedule</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar placeholder="Search"></IonSearchbar>
          </IonToolbar>
        </IonHeader>

        <IonRefresher
          slot="fixed"
          ref={ionRefresherRef}
          onIonRefresh={doRefresh}
        >
          <IonRefresherContent />
        </IonRefresher>

        <IonToast
          isOpen={showCompleteToast}
          message="Refresh complete"
          duration={2000}
          onDidDismiss={() => setShowCompleteToast(false)}
        />

        <SessionList />
        <SessionList />
      </IonContent>
    </IonPage>
  );
};
