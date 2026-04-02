import { WrapBanner, SignupBanner } from "@blocks";
import {
  HomeTrending,
  HomeTrailers,
  HomePopular,
  HomeFree,
  HomeLeaderboard,
} from "./components";

export const Home = () => {
  return (
    <div className="home">
      <WrapBanner />
      <HomeTrending />
      <HomeTrailers />
      <HomePopular />
      <HomeFree />
      <SignupBanner />
      <HomeLeaderboard />
    </div>
  );
};
