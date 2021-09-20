import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IonContent,
  IonHeader,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import Header from '../components/organisms/Header';
import { setPageMeta } from '../containers/pageMetasSlice';
import { fetchGenres } from '../containers/genresSlice';
import { useCustomHistory } from '../hooks/useCustomHistory';
import { RootState } from '../store';
import './Genres.css';

const Genres: FC = () => {
  const dispatch = useDispatch()
  const { handleMovePage } = useCustomHistory();
  const { genres } = useSelector((state: RootState) => state.genres)

  useEffect(() => {
    const title = 'Movies'
    dispatch(
      setPageMeta({
        title: title,
        description: title,
        keyword: title,
      }),
    );

    dispatch(fetchGenres());
  }, []);


  return (
    <IonPage>
      <Header title="Genres" />

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Genres</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList className="ion-padding">
          {genres && genres.map((genre, index) => (
            <div key={index}>
              <IonItemGroup
              >
                <IonItem
                  detail
                  className="title"
                  onClick={() => handleMovePage(`/page/Genres/${genre.id}?genre=${genre.genre_name}`)}
                >
                  <IonLabel>{genre.genre_name}</IonLabel>
                </IonItem>
              </IonItemGroup>
            </div>
          ))}

        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Genres;
