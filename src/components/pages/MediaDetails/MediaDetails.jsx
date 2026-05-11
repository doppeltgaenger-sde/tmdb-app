import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMediaDetails } from "@thunk";
import { useViewport } from "@hooks";
import { 
  DetailsBackdropBanner, 
  DetailsCollectionBanner, 
  MediaReview, 
} from "@features";
import { LazyBlock } from "@shared";
import { 
  MediaCast,
  MediaLibrary,
  MediaRecommendations,
  MediaSocials, 
  MediaStats, 
  MediaKeywords, 
  MediaChart,
} from "./components";
import "./styles/MediaDetails.scss";

export const MediaDetails = () => {
  const { mediaType, id } = useParams();
  const { isMobileLg } = useViewport();
  const dispatch = useDispatch();

  const AsideTag = isMobileLg ? "div" : "aside";

  const detailsState = useSelector(
    (state) => state.mediaDetails.mediaDetails?.[mediaType]?.[id],
  );

  const isInitialLoading = !detailsState || (detailsState.loading && !detailsState.data);
  const data = detailsState?.data;
  const error = detailsState?.error;

  useEffect(() => {
    if (mediaType && id) {
      dispatch(fetchMediaDetails({ mediaType, id }));
    }
  }, [dispatch, mediaType, id]);

  if (isInitialLoading) return (
    <div className="media-details">Loading...</div>
  );

  if (error) return (
    <div className="media-details">Error...</div>
  );

  return (
    <div className="media-details">
      <DetailsBackdropBanner variant="media" {...data} />

      <div className="container">
        <div className="media-details__body">
          <div className="media-details__main">
            <MediaCast {...data} />
            <MediaReview {...data} />
            <MediaLibrary {...data} />

            <LazyBlock>
              <DetailsCollectionBanner {...data} />
            </LazyBlock>

            <LazyBlock>
              <MediaRecommendations {...data} />
            </LazyBlock>
          </div>

          <AsideTag className="media-details__aside">
            <MediaSocials {...data} />
            <MediaStats {...data} />

            <LazyBlock rootMargin="200px">
              <MediaKeywords {...data} />
            </LazyBlock>
            
            <LazyBlock rootMargin="200px">
              <MediaChart {...data} />
            </LazyBlock>
          </AsideTag>
        </div>
      </div>
    </div>
  );
};
