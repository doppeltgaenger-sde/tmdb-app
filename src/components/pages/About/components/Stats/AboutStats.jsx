import { useViewport } from "@hooks";
import { StatsGroup, Button } from "@shared";
import { statsData } from "./data/statsData";
import "./styles/AboutStats.scss";

export const AboutStats = () => {
  const { 
    isMobileSm, 
    isMobileLg, 
    isTablet,
    isDesktop,
  } = useViewport();

  const getColumns = () => {
    if (isMobileSm) return "3";
    if (isMobileLg) return "2";
    if (isTablet) return "3";
    if (isDesktop) return "4";
    return undefined;
  };

  const displayedStatsData = isDesktop ? statsData : statsData.slice(0, 6);

  return (
    <section className="about-stats">
			<div className="container">
				<div className="about-stats__body">
					<div className="about-stats__content">
						<h2 className="about-stats__title">
              Stats
            </h2>

						<p className="about-stats__subtitle">
							We all love them. Here's a few that we find interesting.
						</p>
							
						<StatsGroup
							className="about-stats__stats-group"
							items={displayedStatsData}
              variant="grid" 
              columns={getColumns()}
              direction="reverse"
						/>

						<Button
							className="about-stats__cta-button"
							variant="solid"
							theme="red"
							size="xl"
              aria-label="Join TMDB community"
						>
							Join Us
						</Button>
					</div>

					<div className="about-stats__backdrop" />
				</div>
			</div>
    </section>
  );
};
