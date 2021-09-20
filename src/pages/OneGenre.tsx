import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { filter as _filter } from 'lodash';
import Header from '../components/organisms/Header';
import { setPageMeta } from '../containers/pageMetasSlice';
import { fetchMoviesByGenre } from '../containers/moviesSlice';
import { useCustomHistory } from '../hooks/useCustomHistory';
import { useQuery } from '../hooks/useQuery';
import { RootState } from '../store';
import './Genres.css';

const OneGenre: FC = () => {
  const dispatch = useDispatch()
  const { handleMovePage } = useCustomHistory();
  const query = useQuery();
  const { moviesByGenre } = useSelector((state: RootState) => state.movies)
  const { id } = useParams<{ id: string }>();
  const genreId = Number(id);
  const genreName = query.get('genre')

  useEffect(() => {
    const title = 'MoviesByGenre'
    dispatch(
      setPageMeta({
        title: title,
        description: title,
        keyword: title,
      }),
    );

    dispatch(fetchMoviesByGenre(genreId));
  }, []);


  return (
    <IonPage>
      <Header title={genreName ? 'Genres: ' + genreName : "Genres"} />

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Genres</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList className="ion-padding">
          <IonGrid>
            {moviesByGenre && moviesByGenre.map((movie, index) => (
              <IonRow key={index}>
                <IonCol size="4">
                  <IonCard onClick={() => handleMovePage(`/page/Movies/${movie.id}`)}>
                    <IonCardHeader>
                      <IonCardTitle>{movie.title}</IonCardTitle>
                      <IonCardSubtitle></IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>{movie.description}</IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>

        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default OneGenre;
