import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonItemGroup,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { find as _find } from 'lodash';
import Header from '../components/organisms/Header';
import { fetchMovie, fetchMovies } from '../containers/moviesSlice';
import { setPageMeta } from '../containers/pageMetasSlice';
import { RootState } from '../store';
import '../pages/OneMovie.css';


const OneMovie: FC = () => {
  const dispatch = useDispatch()
  const { movies } = useSelector((state: RootState) => state.movies);
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);
  const movie = _find(movies, { id: movieId });

  useEffect(() => {
    const title = 'Movie'
    dispatch(
      setPageMeta({
        title: title,
        description: title,
        keyword: title,
      }),
    );

    dispatch(fetchMovies());
    dispatch(fetchMovie(movieId));

  }, []);

  return (
    <IonPage>
      <Header title={movie ? movie.title + `(${movie.year})` : 'Movie'} />

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Movie</IonTitle>
          </IonToolbar>
        </IonHeader>
        {movie ? (
          <>
            <IonItemGroup className="">
              <IonItem className="title">
                {movie.genres && movie.genres.map((genre, index) => (
                  <IonText key={index} className="genre">{genre}</IonText>
                ))}
              </IonItem>

              <IonItem>
                <IonText>Rating: {movie.rating}</IonText>
              </IonItem>

              <IonItem>
                <IonGrid className="ion-margin-top">
                  <IonRow className="row">
                    <IonCol size='3'>Title:</IonCol>
                    <IonCol size='9'>{movie.title}</IonCol>
                  </IonRow>
                  <IonRow className="row">
                    <IonCol size='3'>Description:</IonCol>
                    <IonCol size='9'>{movie.description}</IonCol>
                  </IonRow>
                  <IonRow className="row">
                    <IonCol size='3'>Run time:</IonCol>
                    <IonCol size='9'>{`${movie.run_time} minutes`}</IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
            </IonItemGroup>
          </>
        ) : (
          <IonItem>There is no movie</IonItem>
        )}
      </IonContent>
    </IonPage>
  );
};

export default OneMovie;
