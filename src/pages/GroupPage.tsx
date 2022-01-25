import React, { useState, useRef, useEffect } from 'react';
import _ from 'lodash';

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
  IonIcon,
  IonButton,
} from '@ionic/react';
// import { options, menu } from 'ionicons/icons';

import './GroupPage.scss';
import { useDispatch } from 'react-redux';
import { fetchGroupList } from '../reducer/tourReducer';
import { GroupList } from '../components/GroupList';

export const GroupPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroupList());
  }, []);

  const [segment, setSegment] = useState<'all' | 'favorites'>('favorites');
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);

  const pageRef = useRef<HTMLElement>(null);

  const doRefresh = () => {
    dispatch(fetchGroupList);
  };

  return (
    <IonPage ref={pageRef} id="schedule-page">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonSegment
            value={segment}
            onIonChange={(e) => setSegment(e.detail.value as any)}
          >
            <IonSegmentButton value="favorites">
              Editors Choice
            </IonSegmentButton>
            <IonSegmentButton value="all">All Groups</IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Group</IonTitle>
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

        <GroupList segment={segment} />
      </IonContent>
    </IonPage>
  );
};
