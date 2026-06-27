import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { fetchProviderDetails } from "@thunk";
import { useDocumentTitle } from "@hooks";
import { Pagination, PageLoader } from "@shared";
import { 
  ProviderBanner, 
  ProviderMeta, 
  ProviderList 
} from "./components";
import "./styles/ProviderDetails.scss";

const MIN_LOADING_TIME = 500;

export const ProviderDetails = ({ mediaType }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const detailsState = useSelector(
    (state) => state.providerDetails.providerDetails?.[mediaType]?.[id]
  );

  const data = detailsState?.data;
  const isInitialLoading = !detailsState || (detailsState.loading && !detailsState.isLoaded);
  const pageLoading = detailsState?.pageLoading || false;
  const error = detailsState?.error;
  const [bufferedMediaList, setBufferedMediaList] = useState([]);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const loadingStartTimeRef = useRef(null);

  useEffect(() => {
    if (pageLoading) {
      setIsFadingOut(true);
      loadingStartTimeRef.current = Date.now();
    }
  }, [pageLoading]);

  useEffect(() => {
    if (!pageLoading && isFadingOut && data?.mediaList) {
      const timePassed = Date.now() - loadingStartTimeRef.current;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - timePassed);

      const timeoutId = setTimeout(() => {
        setBufferedMediaList(data.mediaList);
        
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsFadingOut(false);
          });
        });
      }, remainingTime);

      return () => clearTimeout(timeoutId);
    } 
    
    if (!pageLoading && !isFadingOut && data?.mediaList) {
      setBufferedMediaList(data?.mediaList);
    }
  }, [pageLoading, isFadingOut, data?.mediaList]);

  useEffect(() => {
    if (id && mediaType) {
      dispatch(fetchProviderDetails({ mediaType, id, page: currentPage }));
    }
  }, [dispatch, id, mediaType, currentPage]);

  useEffect(() => {
    if (error) {
      navigate("/404", { replace: true });
    }
  }, [data, error, navigate]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useDocumentTitle(data?.title || data?.name);

  const mediaLabel = mediaType === "company" ? "movies" : "shows";
  const titleContent = `${data?.totalResultsFormatted || 0} ${mediaLabel}`;

  const renderTitle = () => (
    <h2 className="provider-details__title">{titleContent}</h2>
  );
  
  if (isInitialLoading) return (
    <div className="provider-details">
      <PageLoader className="provider-details__loader" />
    </div>
  );

  return (
    <div className="provider-details">
      <ProviderBanner 
        {...data}
        title={renderTitle()}
      >
        <ProviderMeta 
          {...data} 
          title={renderTitle()}
        />
      </ProviderBanner>

      <div className="container">
        <div className="provider-details__body">
          <ProviderList 
            mediaList={bufferedMediaList} 
            pageLoading={isFadingOut || pageLoading} 
          />
          
          <Pagination 
            currentPage={currentPage}
            totalPages={data?.totalPages || 0}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};
