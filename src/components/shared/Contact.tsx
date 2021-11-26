import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import { RootState } from '../../store';
import {
  setShowContactModal,
  setSelectedHostedBy
} from '../../reducer/tourReducer';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { HostAuthority } from '../../types/tourType';

export const Contact: React.FC = () => {
  const dispatch = useDispatch();

  const { showContactModal, selectedHostedBy } = useSelector(
    (state: RootState) => state.tourState
  );

  return (
    <IonModal isOpen={showContactModal} cssClass='my-custom-class'>
      <IonPage id='contact-modal'>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Contact with {selectedHostedBy?.name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {_.map(
              selectedHostedBy?.authorities,
              (hostAuthority: HostAuthority) => (
                <IonItem>
                  <IonItem detail={false}>
                    <div slot='start' className='dot dot-unread'></div>
                    <IonLabel className='ion-text-wrap'>
                      <h2>{hostAuthority.name}</h2>
                      <IonNote>{hostAuthority.phone}</IonNote>
                    </IonLabel>
                  </IonItem>
                </IonItem>
              )
            )}
          </IonList>
        </IonContent>
        <IonButton
          expand='full'
          onClick={() => {
            dispatch(setShowContactModal(false));
            dispatch(setSelectedHostedBy());
          }}
        >
          Back
        </IonButton>
      </IonPage>
    </IonModal>
  );
};
