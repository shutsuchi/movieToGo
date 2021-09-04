import { FC } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import Header from '../components/organisms/Header';
import './Category.css';

const Category: FC = () => {
  return (
    <IonPage>
      <Header title="Category" />

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Category</IonTitle>
          </IonToolbar>
        </IonHeader>
        This is Category Page
      </IonContent>
    </IonPage>
  );
};

export default Category;
