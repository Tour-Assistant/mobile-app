import {
  ActionSheetButton,
  IonActionSheet,
  IonChip,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { RootState } from '../store';
import { HostedBy } from '../types/tourType';
import { call, logoFacebook } from 'ionicons/icons';

export const GroupList: React.FC = () => {
  const { groupList } = useSelector((state: RootState) => state.tourState);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionSheetButtons, setActionSheetButtons] = useState<
    ActionSheetButton[]
  >([]);
  const [actionSheetHeader, setActionSheetHeader] = useState('');

  function openContact(hostedBy: HostedBy) {
    setActionSheetButtons(
      hostedBy.authorities.map(({ name, phone }) => ({
        text: `${name} ( ${phone} )`,
        handler: () => {
          window.open('tel:' + phone);
        },
      }))
    );
    setActionSheetHeader(hostedBy.name);
    setShowActionSheet(true);
  }

  function openFbLink(hostedBy: HostedBy) {
    setActionSheetButtons([
      {
        text: 'Join Group',
        handler: () => {
          window.open(hostedBy.link.group, '_blank');
        },
      },
      {
        text: 'Like the Page',
        handler: () => {
          window.open(hostedBy.link.page, '_blank');
        },
      },
    ]);
    setActionSheetHeader(hostedBy.name);
    setShowActionSheet(true);
  }

  return (
    <>
      <IonList>
        {_.map(groupList, (hostedBy) => (
          <IonItem detail={false}>
            <IonLabel className="ion-text-wrap">
              <h3>{hostedBy.name}</h3>
            </IonLabel>
            <div>
              <IonChip color="facebook" onClick={() => openFbLink(hostedBy)}>
                <IonIcon icon={logoFacebook}></IonIcon>
                <IonLabel>facebook</IonLabel>
              </IonChip>
              <IonChip color="twitter" onClick={() => openContact(hostedBy)}>
                <IonIcon icon={call}></IonIcon>
                <IonLabel>Call</IonLabel>
              </IonChip>
            </div>
          </IonItem>
        ))}
      </IonList>
      <IonActionSheet
        isOpen={showActionSheet}
        header={actionSheetHeader}
        onDidDismiss={() => setShowActionSheet(false)}
        buttons={actionSheetButtons}
      />
    </>
  );
};
