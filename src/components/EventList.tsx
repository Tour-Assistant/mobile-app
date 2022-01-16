import { IonItemDivider, IonItemGroup, IonLabel, IonList } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { RootState } from '../store';
import { EventListItem } from './EventListItem';
import { Tour } from '../types/tourType';

interface FormattedTourType {
  tourList: Tour[];
  date: string;
}

export const EventList: React.FC = () => {
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
    </IonList>
  );
};
