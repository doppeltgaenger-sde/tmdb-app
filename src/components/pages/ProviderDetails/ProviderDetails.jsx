import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProviderDetails } from "@thunk";
import { 
  ProviderBanner, 
  ProviderMeta, 
  ProviderList 
} from "./components";
import "./styles/ProviderDetails.scss";

export const ProviderDetails = ({ mediaType }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const detailsState = useSelector(
    (state) => state.providerDetails.providerDetails?.[mediaType]?.[id]
  );

  const isInitialLoading = !detailsState || (detailsState.loading && !detailsState.data);
  const data = detailsState?.data;
  const error = detailsState?.error;
  const titleContent = mediaType === "company" ? "movies" : "shows";

  useEffect(() => {
    if (id && mediaType) {
      dispatch(fetchProviderDetails({ mediaType, id }));
    }
  }, [dispatch, id, mediaType]);

  const renderTitle = () => {
    return (
      <h2 className="provider-details__title">
        {data?.totalResults} {titleContent}
      </h2>
    );
  };
  
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
          <ProviderList {...data} />
        </div>
      </div>
    </div>
  );
};
