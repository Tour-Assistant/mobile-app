import {
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonListHeader,
  IonAlert,
  AlertButton,
} from '@ionic/react';
import React, { useState, useCallback } from 'react';
import { SessionListItem } from './SessionListItem';

export const SessionList: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertHeader, setAlertHeader] = useState('');
  const [alertButtons, setAlertButtons] = useState<(AlertButton | string)[]>(
    []
  );

  if (false) {
    return (
      <IonList>
        <IonListHeader>No Sessions Found</IonListHeader>
      </IonList>
    );
  }

  return (
    <>
      <IonList>
        {[1, 2, 3, 4, 4, 5].map((val, index: number) => (
          <IonItemGroup key={`group-${index}`}>
            <IonItemDivider sticky>
              <IonLabel>Group Time {val}</IonLabel>
            </IonItemDivider>
            {[1, 2, 3].map((anotherVal, sessionIndex: number) => (
              <SessionListItem />
            ))}
          </IonItemGroup>
        ))}
      </IonList>
      <IonAlert
        isOpen={showAlert}
        header={alertHeader}
        buttons={alertButtons}
        onDidDismiss={() => setShowAlert(false)}
      ></IonAlert>
    </>
  );
};
