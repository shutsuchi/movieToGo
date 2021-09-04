import { FC } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import Header from '../components/organisms/Header';
import './Admin.css';

const Admin: FC = () => {
  return (
    <IonPage>
      <Header title="Manage Catalogue" />

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Admin</IonTitle>
          </IonToolbar>
        </IonHeader>
        This is Admin Page
      </IonContent>
    </IonPage>
  );
};

export default Admin;
