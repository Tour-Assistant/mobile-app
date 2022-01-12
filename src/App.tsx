import { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import ViewTour from './pages/ViewTour';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useDispatch } from 'react-redux';
import { fetchTourList } from './reducer/tourReducer';
import MainTabs from './pages/MainTabs';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTourList());
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <IonRouterOutlet id="main">
            {/*
                We use IonRoute here to keep the tabs state intact,
                which makes transitions between tabs and non tab pages smooth
                */}
            <Route path="/" exact={true}>
              <Redirect to="/tourEvents" />
            </Route>
            <Route path="/tour/:id" render={ViewTour}></Route>
            <Route path="/tourEvents" component={MainTabs} exact />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>

    // <IonApp>
    //   <IonReactRouter>
    //     <IonRouterOutlet>
    //       <Route path='/' exact={true}>
    //         <Redirect to='/home' />
    //       </Route>
    //       <Route path='/home' exact={true}>
    //         <Home />
    //       </Route>
    //       <Route path='/tour/:id'>
    //         <ViewTour />
    //       </Route>
    //     </IonRouterOutlet>
    //   </IonReactRouter>
    // </IonApp>
  );
};

export default App;
