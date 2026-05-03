import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCollectionDetails } from "@thunk";
import { getGenresById, formatGenresList } from "@utils";
import { MediaHero } from "@blocks";
import { 
  CollectionCast, 
  CollectionCrew, 
  CollectionList,
} from "./components";
import "./styles/CollectionDetails.scss";

export const CollectionDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const allGenres = useSelector((state) => state.configuration.genres);
  const detailsState = useSelector(
    (state) => state.collectionDetails.collectionDetails?.[id],
  );

  const isInitialLoading = !detailsState || (detailsState.loading && !detailsState.data);
  const data = detailsState?.data;
  const error = detailsState?.error;

  const currentGenres = useMemo(() => {
    const genresArray = getGenresById(data?.genreIds, allGenres);
  
    return formatGenresList(genresArray);
  }, [data?.genreIds, allGenres]);

  useEffect(() => {
    if (id) {
      dispatch(fetchCollectionDetails({ id }));
    }
  }, [dispatch, id]);

  if (isInitialLoading) return (
    <div className="collection-details">Loading...</div>
  );

  if (error) return (
    <div className="collection-details">Error...</div>
  );

  return (
    <div className="collection-details">
      <MediaHero 
        variant="collection" 
        genres={currentGenres} 
        {...data} 
      />

      <div className="container">
        <div className="collection-details__body">
          <CollectionCast {...data} />
          <CollectionCrew {...data} />
          <CollectionList {...data} />
        </div>
      </div>
    </div>
  );
};
