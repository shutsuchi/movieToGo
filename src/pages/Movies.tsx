import { FC } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import Header from '../components/organisms/Header';
import './Movies.css';

const Movies: FC = () => {
  return (
    <IonPage>
      <Header title="Movies" />

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Movies</IonTitle>
          </IonToolbar>
        </IonHeader>
        This is Movies Page
      </IonContent>
    </IonPage>
  );
};

export default Movies;
