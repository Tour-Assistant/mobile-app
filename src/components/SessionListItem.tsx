import React from 'react';
import {
  IonItemSliding,
  IonItem,
  IonLabel,
  IonItemOptions,
  IonItemOption,
} from '@ionic/react';

export const SessionListItem: React.FC = ({}) => {
  return (
    <IonItemSliding>
      <IonItem routerLink={`/tabs/schedule`}>
        <IonLabel>
          <h3>Sesson Name</h3>
          <p>time start&mdash;&nbsp; time start&mdash;&nbsp; location</p>
        </IonLabel>
      </IonItem>
      <IonItemOptions>
        <IonItemOption color="favorite">Favorite</IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};
