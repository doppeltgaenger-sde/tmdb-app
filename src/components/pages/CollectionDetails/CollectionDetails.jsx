import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCollectionDetails } from "@thunk";
import { useDocumentTitle } from "@hooks";
import { getGenresById, formatGenresList } from "@utils";
import { DetailsBackdropBanner } from "@features";
import { Loader } from "@shared";
import { 
  CollectionCast, 
  CollectionCrew, 
  CollectionList,
} from "./components";
import "./styles/CollectionDetails.scss";

export const CollectionDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const allGenres = useSelector((state) => state.configuration?.genres || []);

  const detailsState = useSelector(
    (state) => state.collectionDetails.collectionDetails?.[id],
  );

  const isInitialLoading = !detailsState || (detailsState.loading && !detailsState.data);
  const data = detailsState?.data;
  const error = detailsState?.error;

  const currentGenres = useMemo(() => {
    if (!data?.genreIds) return "";
    const genresArray = getGenresById(data.genreIds, allGenres);
  
    return formatGenresList(genresArray);
  }, [data?.genreIds, allGenres]);

  useEffect(() => {
    if (id) {
      dispatch(fetchCollectionDetails({ id }));
    }
  }, [dispatch, id]);

  useDocumentTitle(data?.title || data?.name);

  if (isInitialLoading) return (
    <div className="collection-details">
      <Loader 
        className="collection-details__loader"
        theme="primary"
      />
    </div>
  );

  if (error) return (
    <div className="collection-details collection-details--error">Error...</div>
  );

  return (
    <div className="collection-details">
      <DetailsBackdropBanner 
        variant="collection" 
        genres={currentGenres} 
        {...data} 
      />

      <div className="container">
        <div className="collection-details__body">
          <CollectionCast cast={data?.cast} />
          <CollectionCrew crew={data?.crew} />
          <CollectionList mediaList={data?.mediaList} />
        </div>
      </div>
    </div>
  );
};
