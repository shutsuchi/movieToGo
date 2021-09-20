import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToast,
  IonToolbar,
  useIonToast,
} from '@ionic/react';
import {
  share,
  logoVimeo,
  logoFacebook,
  logoInstagram,
  logoTwitter,
  caretForward,
  caretForwardSharp,
} from 'ionicons/icons';
import Header from '../components/organisms/Header';
import { fetchMovies } from '../containers/moviesSlice';
import { setPageMeta } from '../containers/pageMetasSlice';
import { useCustomHistory } from '../hooks/useCustomHistory';
import { RootState } from '../store';
import '../pages/Movies.css';


const Movies: FC = () => {
  const dispatch = useDispatch()
  const { handleMovePage } = useCustomHistory();
  const [present, dismiss] = useIonToast();
  const [collapseStatus, setCollapseStatus] = useState<{ [key: string]: boolean}>({});
  const [showToast1, setShowToast1] = useState<boolean>(false);
  const [showToast2, setShowToast2] = useState<boolean>(false);
  const { movies } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    const title = 'Movies'
    dispatch(
      setPageMeta({
        title: title,
        description: title,
        keyword: title,
      }),
    );

    dispatch(fetchMovies());
  }, []);


  return (
    <IonPage>
      <Header title="Movies" />

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Movies</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonListHeader className="ion-padding">
          This is Movies Page
          <IonButton
            expand="block"
            onClick={() =>
              present({
                buttons: [{ text: 'hide', handler: () => dismiss() }],
                position: 'top',
                message: 'toast from hook, clike hide to dismiss',
                onDidDismiss: () => console.log('dismissed'),
                onWillDismiss: () => console.log('will dismiss'),
              })
            }
          >Show Toast</IonButton>
          <IonButton onClick={() => setShowToast1(true)} expand="block">Show Toast 1</IonButton>
          <IonButton onClick={() => setShowToast2(true)} expand="block">Show Toast 2</IonButton>
          <IonToast
            isOpen={showToast1}
            onDidDismiss={() => setShowToast1(false)}
            message="Your settings have been saved."
            duration={200}
          />

          <IonToast
            isOpen={showToast2}
            onDidDismiss={() => setShowToast2(false)}
            message="Click to Close"
            position="top"
            buttons={[
              {
                side: 'start',
                icon: 'star',
                text: 'Favorite',
                handler: () => {
                  console.log('Favorite clicked');
                }
              },
              {
                text: 'Done',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              }
            ]}
          />
        </IonListHeader>
        <IonList className="ion-padding">
          {movies && movies.map((movie, index) => (
            <div key={index}>
              <IonItemGroup
                onClick={() => setCollapseStatus({
                  ...collapseStatus,
                  [`${movie.title}`]: !collapseStatus[`${movie.title}`],
                })}
              >
                <IonItem detail className="title">
                  <IonIcon
                    slot="start"
                    ios={caretForward}
                    md={caretForwardSharp}
                  />
                  <IonLabel>{movie.title}</IonLabel>
                </IonItem>
                {collapseStatus[`${movie.title}`] && (
                  <IonItem>
                    <IonText className="description">description: {movie.description}</IonText>
                    <IonItem>
                      <IonButton
                        className="button-text"
                        children="Detail"
                        color="primary"
                        onClick={() => handleMovePage(`/page/Movies/${movie.id}`)}
                      />
                    </IonItem>
                  </IonItem>
                )}
              </IonItemGroup>
            </div>
          ))}

        </IonList>
        <IonFab vertical="center" horizontal="center" slot="fixed">
          <IonFabButton>
            <IonIcon icon={share} />
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton><IonIcon icon={logoVimeo} /></IonFabButton>
          </IonFabList>
          <IonFabList side="bottom">
            <IonFabButton><IonIcon icon={logoFacebook} /></IonFabButton>
          </IonFabList>
          <IonFabList side="start">
            <IonFabButton><IonIcon icon={logoInstagram} /></IonFabButton>
          </IonFabList>
          <IonFabList side="end">
            <IonFabButton><IonIcon icon={logoTwitter} /></IonFabButton>
          </IonFabList>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Movies;
