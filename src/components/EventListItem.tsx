import React from 'react';
import { IonItem, IonLabel } from '@ionic/react';
import _ from 'lodash';
import { Tour } from '../types/tourType';

export const EventListItem: React.FC<{ tour: Tour }> = ({ tour }) => {
  return (
    <IonItem routerLink={`/tabs/events/${tour.id}`}>
      <IonLabel>
        <h3>{tour.title}</h3>
        <p>
          By&nbsp;{' '}
          {_.size(tour.hostedBy.curatedName)
            ? tour.hostedBy.curatedName
            : tour.hostedBy.name}
        </p>
      </IonLabel>
    </IonItem>
  );
};
