import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMediaDetails } from "@thunk";
import { MediaHero } from "./components";

export const MediaDetails = () => {
  const { mediaType, id } = useParams();
  const dispatch = useDispatch();

  const detailsState = useSelector(
    (state) => state.media.mediaDetails?.[mediaType]?.[id],
  );

  const isInitialLoading =
    !detailsState || (detailsState.loading && !detailsState.data);

  const data = detailsState?.data;
  const error = detailsState?.error;

  useEffect(() => {
    if (mediaType && id) {
      dispatch(fetchMediaDetails({ mediaType, id }));
    }
  }, [dispatch, mediaType, id]);

  if (isInitialLoading) {
    return (
      <div className="media-details">Loading...</div>
    ) 
  }

  if (error) {
    return (
      <div className="media-details">Something went wrong</div>
    ) 
  }

  return (
    <div className="media-details">
      {data && 
        <MediaHero {...data} />
      }
    </div>
  )
};
