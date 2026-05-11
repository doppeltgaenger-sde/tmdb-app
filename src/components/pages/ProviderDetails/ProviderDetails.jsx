import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchProviderDetails } from "@thunk";
import { Pagination } from "@shared";
import { 
  ProviderBanner, 
  ProviderMeta, 
  ProviderList 
} from "./components";
import "./styles/ProviderDetails.scss";

export const ProviderDetails = ({ mediaType }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const detailsState = useSelector(
    (state) => state.providerDetails.providerDetails?.[mediaType]?.[id]
  );

  const data = detailsState?.data;
  const isInitialLoading = !detailsState || (detailsState.loading && !detailsState.isLoaded);
  const error = detailsState?.error;

  useEffect(() => {
    if (id && mediaType) {
      dispatch(fetchProviderDetails({ mediaType, id, page: currentPage }));
    }
  }, [dispatch, id, mediaType, currentPage]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const mediaLabel = mediaType === "company" ? "movies" : "shows";
  const titleContent = `${data?.totalResultsFormatted || 0} ${mediaLabel}`;

  const renderTitle = () => (
    <h2 className="provider-details__title">{titleContent}</h2>
  );
  
  if (isInitialLoading) return (
    <div className="provider-details">Loading...</div>
  );

  if (error) return (
    <div className="provider-details">Error...</div>
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
          <ProviderList mediaList={data?.mediaList} />
          
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
