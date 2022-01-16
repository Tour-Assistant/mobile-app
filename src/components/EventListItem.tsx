import React from 'react';
import {
  IonItemSliding,
  IonItem,
  IonLabel,
  IonItemOptions,
  IonItemOption,
} from '@ionic/react';
import { Tour } from '../types/tourType';

export const EventListItem: React.FC<{ tour: Tour }> = ({ tour }) => {
  return (
    <IonItemSliding>
      <IonItem routerLink={`/tabs/schedule`}>
        <IonLabel>
          <h3>{tour.title}</h3>
          <p>By&nbsp; {tour.hostedBy.name}</p>
        </IonLabel>
      </IonItem>
      <IonItemOptions>
        <IonItemOption color="favorite">Favorite</IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};
