import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { fetchMediaTrack } from "@thunk";
import { SignupBanner, Leaderboard } from "@blocks";
import { LazyBlock } from "@shared";
import {
  HomeHero,
  HomeTrending,
  HomeTrailers,
  HomePopular,
  HomeFree,
} from "./components";
import "./styles/Home.scss";

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
      <HomeHero />

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
