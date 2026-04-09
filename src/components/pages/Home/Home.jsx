import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { fetchMediaTrack } from "@thunk";
import { 
  WrapBanner, 
  SignupBanner, 
  Leaderboard,
} from "@blocks";
import { LazyBlock } from "@shared";
import {
  HomeTrending,
  HomeTrailers,
  HomePopular,
  HomeFree,
} from "./components";

export const Home = () => {
  const dispatch = useDispatch();

  const onLoadContent = useCallback(
    (track, tab) => {
      dispatch(fetchMediaTrack(track, tab));
    },
    [dispatch],
  );

  return (
    <div className="home">
      <WrapBanner />

      <LazyBlock onLoad={() => onLoadContent("trendingTrack", "today")}>
        <HomeTrending />
      </LazyBlock>

      <LazyBlock onLoad={() => onLoadContent("trailersTrack", "popular")}>
        <HomeTrailers />
      </LazyBlock>

      <LazyBlock onLoad={() => onLoadContent("popularTrack", "streaming")}>
        <HomePopular />
      </LazyBlock>

      <LazyBlock onLoad={() => onLoadContent("freeTrack", "movie")}>
        <HomeFree />
      </LazyBlock>

      <SignupBanner />
      <Leaderboard />
    </div>
  );
};
