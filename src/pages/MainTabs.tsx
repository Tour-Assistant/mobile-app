import React from 'react';
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { calendar, people } from 'ionicons/icons';
import { EventPage } from './EventPage';
import ViewTour from './ViewTour';

interface MainTabsProps {}

const MainTabs: React.FC<MainTabsProps> = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/events" />
        <Route path="/tabs/events" render={() => <EventPage />} exact={true} />
        <Route
          path="/tabs/groups"
          render={() => <div>Group Page</div>}
          exact={true}
        />
        <Route path="/tabs/events/:id" component={ViewTour} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="schedule" href="/tabs/events">
          <IonIcon icon={calendar} />
          <IonLabel>Tours</IonLabel>
        </IonTabButton>
        <IonTabButton tab="speakers" href="/tabs/groups">
          <IonIcon icon={people} />
          <IonLabel>Groups</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
