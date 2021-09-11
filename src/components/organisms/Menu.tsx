import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import {
  IonContent,
  IonFooter,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonToggle,
  IonToolbar,
} from '@ionic/react';
import {
  bookmarkOutline,
  heartOutline,
  heartSharp,
  home,
  homeSharp,
  list,
  listSharp,
  moon,
  settings,
  settingsSharp,
  videocam,
  videocamSharp,
} from 'ionicons/icons';
import './Menu.css';

interface AppBasicPage {
  title: string;
  url: string;
  iosIcon?: string;
  mdIcon?: string;
}

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  subPages?: AppBasicPage[]
}

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/page/Home',
    iosIcon: home,
    mdIcon: homeSharp,
  },
  {
    title: 'Movies',
    url: '/page/Movies',
    iosIcon: videocam,
    mdIcon: videocamSharp,
  },
  {
    title: 'Category',
    url: '/page/Category',
    iosIcon: list,
    mdIcon: listSharp,
  },
  {
    title: 'Manage Catalogue',
    url: '/page/Admin',
    iosIcon: settings,
    mdIcon: settingsSharp,
  },
  {
    title: 'Favorites',
    url: '/page/Favorites',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: FC = () => {
  const location = useLocation();
  const pageTitle = location.pathname

  const toggleDarkModeHandler = () => {
    document.body.classList.toggle("dark");
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>MovieToGo</IonListHeader>
          <IonNote>hi@ionicframework.com</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={location.pathname === appPage.url ? 'selected' : ''}
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>

        <IonFooter className="ion-margin-top">
          <IonToolbar>
            <IonIcon
              slot="start"
              icon={moon}
              className="component-icon component-icon-dark ion-margin-end"
            />
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle
              slot="end"
              name="darkMode"
              onIonChange={toggleDarkModeHandler}
            />
          </IonToolbar>
        </IonFooter>
      </IonContent>

    </IonMenu>
  );
};

export default Menu;
