import { FC } from 'react';
import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { useParams } from 'react-router';
// import '../../pages/Page.css';

interface HeaderProps {
  title: string
}

const Header: FC<HeaderProps> = (props) => {

  const { title } = props
  const { name } = useParams<{ name: string; }>();

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
