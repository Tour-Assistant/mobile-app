import {
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonButton,
  IonIcon,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { informationCircle } from 'ionicons/icons';
import moment from 'moment';
import _ from 'lodash';
import { RootState } from '../store';
import { EventListItem } from './EventListItem';
import { Tour } from '../types/tourType';
import { fetchTourList } from '../reducer/tourReducer';

interface FormattedTourType {
  tourList: Tour[];
  date: string;
}

export const EventList: React.FC = () => {
  const dispatch = useDispatch();
  const { filteredTourList } = useSelector(
    (state: RootState) => state.tourState
  );

  const [formattedEventList, setFormattedEventList] = useState<
    FormattedTourType[]
  >([]);

  useEffect(() => {
    if (_.size(filteredTourList)) {
      let newTourList: FormattedTourType[] = [];
      _.each(_.groupBy(filteredTourList, 'startAt'), (val, key) => {
        newTourList.push({ tourList: val, date: key });
      });
      setFormattedEventList(newTourList);
    }
  }, [filteredTourList]);

  return (
    <IonList>
      {_.map(formattedEventList, ({ tourList, date }) => (
        <IonItemGroup key={`group-${date}`}>
          <IonItemDivider sticky>
            <IonLabel>{moment(date).format('dddd, Do MMMM')}</IonLabel>
          </IonItemDivider>
          {tourList.map((tour) => (
            <EventListItem tour={tour} />
          ))}
        </IonItemGroup>
      ))}
      {_.size(filteredTourList) === 0 && (
        <>
          <IonIcon icon={informationCircle}></IonIcon> Please check your
          internet connection!
          <IonButton
            color="dark"
            expand="block"
            onClick={() => dispatch(fetchTourList())}
          >
            Try Again
          </IonButton>
        </>
      )}
    </IonList>
  );
};
