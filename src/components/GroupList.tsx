import {
  ActionSheetButton,
  IonActionSheet,
  IonButton,
  IonChip,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { RootState } from '../store';
import { HostedBy } from '../types/tourType';
import { call, informationCircle, logoFacebook } from 'ionicons/icons';
import { fetchGroupList } from '../reducer/tourReducer';

export const GroupList: React.FC<{ segment: string }> = ({
  segment = 'favorites',
}) => {
  const dispatch = useDispatch();
  const { groupList, editorsChoiceGroupList } = useSelector(
    (state: RootState) => state.tourState
  );
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
    const groupEventsLink = hostedBy.link.group.endsWith('/')
      ? `${hostedBy.link.group}events`
      : `${hostedBy.link.group}/events`;
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
      {
        text: 'Events',
        handler: () => {
          window.open(groupEventsLink, '_blank');
        },
      },
    ]);
    setActionSheetHeader(hostedBy.name);
    setShowActionSheet(true);
  }

  return (
    <>
      <IonList>
        {_.map(
          segment === 'all' ? groupList : editorsChoiceGroupList || [],
          (hostedBy) => (
            <IonItem detail={false}>
              <IonLabel className="ion-text-wrap">
                <h3>
                  {_.size(hostedBy.curatedName)
                    ? hostedBy.curatedName
                    : hostedBy.name}
                </h3>
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
          )
        )}
      </IonList>
      {_.size(groupList) === 0 && (
        <>
          <IonIcon icon={informationCircle}></IonIcon> Please check your
          internet connection!
          <IonButton
            color="dark"
            expand="block"
            onClick={() => dispatch(fetchGroupList())}
          >
            Try Again
          </IonButton>
        </>
      )}
      <IonActionSheet
        isOpen={showActionSheet}
        header={actionSheetHeader}
        onDidDismiss={() => setShowActionSheet(false)}
        buttons={actionSheetButtons}
      />
    </>
  );
};
