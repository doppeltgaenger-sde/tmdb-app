import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMediaDetails } from "@thunk";
import { useViewport } from "@hooks";
import { 
  MediaHero, 
  MediaSocials, 
  MediaStats, 
  MediaKeywords, 
} from "./components";
import "./styles/MediaDetails.scss";

export const MediaDetails = () => {
  const { mediaType, id } = useParams();
  const { isMobileLg } = useViewport();
  const dispatch = useDispatch();

  const AsideTag = isMobileLg ? "div" : "aside";

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
      <div className="media-details">Something went wrong. Please try again later...</div>
    ) 
  }

  return (
    <div className="media-details">
      <MediaHero {...data} />

      <div className="container">
        <div className="media-details__body">
          <div className="media-details__main">

          </div>

          <AsideTag className="media-details__aside">
            <MediaSocials {...data} />
            <MediaStats {...data} />
            <MediaKeywords {...data} />
          </AsideTag>
        </div>
      </div>
    </div>
  )
};
