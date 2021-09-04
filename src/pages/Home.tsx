import { FC } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import Header from '../components/organisms/Header';
import './Home.css';

const Home: FC = () => {
  return (
    <IonPage>
      <Header title="Home" />

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        This is Home Page
      </IonContent>
    </IonPage>
  );
};

export default Home;
