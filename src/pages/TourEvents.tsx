import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import TourListItem from '../components/TourListItem';
import {
  fetchTourList,
  setFilterGroupId,
  setSearchText,
  setShowFilter,
} from '../reducer/tourReducer';
import './Home.css';
import { closeCircle, funnel, funnelOutline } from 'ionicons/icons';

import {
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSearchbar,
  IonToolbar,
} from '@ionic/react';
import { Filter } from '../components/Filter';
import _ from 'lodash';

export const TourEvents: React.FC = () => {
  const dispatch = useDispatch();
  const {
    filteredTourList,
    status,
    searchText,
    showFilter,
    filterData: { groupId },
    groupList,
  } = useSelector((state: RootState) => state.tourState);

  const refresh = (e: CustomEvent) => {
    dispatch(fetchTourList());
    if (status !== 'LOADING') e.detail.complete();
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol size="11">
                <IonSearchbar
                  value={searchText}
                  onIonChange={(e) => dispatch(setSearchText(e.detail.value!))}
                  placeholder="Search Upcoming Tours"
                ></IonSearchbar>
              </IonCol>
              <IonCol size="1">
                {showFilter ? (
                  <IonIcon
                    icon={funnel}
                    size="large"
                    color="medium"
                    onClick={() => dispatch(setShowFilter(!showFilter))}
                  />
                ) : (
                  <IonIcon
                    icon={funnelOutline}
                    size="large"
                    onClick={() => dispatch(setShowFilter(!showFilter))}
                  />
                )}
              </IonCol>
            </IonRow>
            {groupId !== 'all' && (
              <IonRow>
                <IonCol>
                  <IonChip onClick={() => dispatch(setFilterGroupId('all'))}>
                    <IonLabel>
                      {_.find(groupList, (group) => group.id === groupId)?.name}
                    </IonLabel>
                    <IonIcon icon={closeCircle} />
                  </IonChip>
                </IonCol>
              </IonRow>
            )}
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {showFilter && <Filter />}
        {status === 'SUCCEED' ? (
          <IonList>
            {filteredTourList.map((tour) => (
              <TourListItem key={tour.id} tour={tour} />
            ))}
          </IonList>
        ) : (
          `Loading... Please Wait (${status}).`
        )}
      </IonContent>
    </IonPage>
  );
};
