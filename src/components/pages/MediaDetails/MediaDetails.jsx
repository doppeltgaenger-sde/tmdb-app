import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMediaDetails } from "@thunk";
import { useViewport, useDocumentTitle } from "@hooks";
import { 
  DetailsBackdropBanner, 
  DetailsCollectionBanner, 
  MediaReview, 
} from "@features";
import { LazyBlock, PageLoader } from "@shared";
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

  useDocumentTitle(data?.title || data?.name);

  if (isInitialLoading) return (
    <div className="media-details">
      <PageLoader className="media-details__loader" />
    </div>
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
            <MediaCast cast={data?.cast} />
            <MediaReview id={data?.id} />
            <MediaLibrary library={data?.library} />

            <LazyBlock>
              <DetailsCollectionBanner collection={data?.collection} />
            </LazyBlock>

            <LazyBlock>
              <MediaRecommendations recommendations={data?.recommendations} />
            </LazyBlock>
          </div>

          <AsideTag className="media-details__aside">
            <MediaSocials socials={data?.socials} />
            <MediaStats 
              mediaType={mediaType}
              status={data?.status} 
              type={data?.type} 
              companies={data?.companies} 
              networks={data?.networks} 
              originalLanguage={data?.originalLanguage}
              budget={data?.budget}
              revenue={data?.revenue}
            />

            <LazyBlock rootMargin="200px">
              <MediaKeywords keywords={data?.keywords} />
            </LazyBlock>
            
            <LazyBlock rootMargin="200px">
              <MediaChart chartColor={data?.chartColor} />
            </LazyBlock>
          </AsideTag>
        </div>
      </div>
    </div>
  );
};
