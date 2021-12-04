import React from 'react';
import {
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonGrid
} from '@ionic/react';
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { setFilterGroupId, setShowFilter } from '../reducer/tourReducer';

export const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const { groupList } = useSelector((state: RootState) => state.tourState);
  const {
    filterData: { groupId }
  } = useSelector((state: RootState) => state.tourState);
  return (
    <IonGrid>
      <IonItem>
        <IonLabel>Filter With Group</IonLabel>
        <IonSelect
          value={groupId}
          okText='Okay'
          cancelText='Dismiss'
          onIonChange={e => {
            dispatch(setFilterGroupId(e.detail.value));
            dispatch(setShowFilter(false));
          }}
        >
          <IonSelectOption value='all'>All</IonSelectOption>
          {_.map(groupList, group => (
            <IonSelectOption value={group.id}>{group.name}</IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>
    </IonGrid>
  );
};
