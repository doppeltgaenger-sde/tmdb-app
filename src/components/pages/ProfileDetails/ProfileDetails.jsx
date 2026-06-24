import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProfileDetails } from "@thunk";
import { useViewport, useDocumentTitle } from "@hooks";
import { LazyBlock, PageLoader } from "@shared";
import { 
  ProfilePortrait,
  ProfileBiography,
  ProfileLibrary,
  ProfileSocials,
  ProfileStats, 
  ProfileFilmography,
} from "./components";
import "./styles/ProfileDetails.scss";

export const ProfileDetails = () => {
  const { id } = useParams();
  const { isMobileLg } = useViewport();
  const dispatch = useDispatch();

  const AsideTag = isMobileLg ? "div" : "aside";

  const detailsState = useSelector(
    (state) => state.profileDetails.profileDetails?.[id],
  );

  const isInitialLoading = !detailsState || (detailsState.loading && !detailsState.data);
  const data = detailsState?.data;
  const error = detailsState?.error;

  useEffect(() => {
    if (id) {
      dispatch(fetchProfileDetails({ id }));
    }
  }, [dispatch, id]);

  const hasSocials = data?.socials && Object.values(data.socials).some(Boolean);
  useDocumentTitle(data?.title || data?.name);

  if (isInitialLoading) return (
    <div className="profile-details">
      <PageLoader className="profile-details__loader" />
    </div>
  );

  if (error) return (
    <div className="profile-details">Error...</div>
  );

  return (
    <div className="profile-details">
      <div className="container">
        <div className="profile-details__body">
          <AsideTag className="profile-details__aside">
            <ProfilePortrait  
              profilePath={data?.profilePath}
              name={data?.name}
            />

            {isMobileLg &&  
              <h1 className="profile-details__title">{data?.name}</h1>
            }

            {hasSocials &&           
              <LazyBlock rootMargin="200px">
                <ProfileSocials socials={data?.socials} />
              </LazyBlock>
            }

            <LazyBlock rootMargin="200px">
              <ProfileStats 
                department={data?.department} 
                totalCredits={data?.totalCredits} 
                birthday={data?.birthday} 
                deathday={data?.deathday} 
                birthPlace={data?.birthPlace}
                aliases={data?.aliases}
              />
            </LazyBlock>
          </AsideTag>

          <div className="profile-details__main">
            {!isMobileLg &&
              <h1 className="profile-details__title">{data?.name}</h1>
            }

            <ProfileBiography biography={data?.biography} />
            <ProfileLibrary library={data?.library} />

            <LazyBlock rootMargin="200px">
              <ProfileFilmography filmography={data?.filmography} />
            </LazyBlock>
          </div>
        </div>
      </div>
    </div>
  );
};
