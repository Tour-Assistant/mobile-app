import {
  IonItem,
  IonLabel,
  IonNote,
  IonText,
  IonChip,
  IonIcon
} from '@ionic/react';
import moment from 'moment';
import _ from 'lodash';

import { Tour } from '../types/tourType';
import './TourListItem.css';

interface TourListItemProps {
  tour: Tour;
}

const TourListItem: React.FC<TourListItemProps> = ({ tour }) => {
  return (
    <IonItem routerLink={`/tour/${tour.id}`} detail={false}>
      <div slot='start' className='dot dot-unread'></div>
      <IonLabel className='ion-text-wrap'>
        <h2>
          {tour.title}
          <IonNote className='right-item'>
            {moment(tour.startAt).format('dddd, Do MMMM')}
          </IonNote>
        </h2>
        <IonNote className='right-item'>{tour.budget} Taka</IonNote>
      </IonLabel>
    </IonItem>
  );
};

export default TourListItem;
