import { FC } from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
// import Menu from '@/components/Menu';
import Menu from './components/organisms/Menu';
import PageMeta from './components/molecules/PageMeta';
import Movies from './pages/Movies';
import OneMovie from './pages/OneMovie';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Genres from './pages/Genres';
import OneGenre from './pages/OneGenre';

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

const App: FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact>
              <Redirect to="/page/Home" />
            </Route>
            <Route path="/page/Home" exact>
              <Home />
            </Route>
            <Route path="/page/Movies" exact>
              <Movies />
            </Route>
            <Route path="/page/Movies/:id" exact>
              <OneMovie />
            </Route>
            <Route path="/page/Genres" exact>
              <Genres />
            </Route>
            <Route path="/page/Genres/:id" exact>
              <OneGenre />
            </Route>
            <Route path="/page/Admin" exact>
              <Admin />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
      <PageMeta />
    </IonApp>
  );
};

export default App;
