import { FilmographyRow } from "@features";
import "./styles/FilmographyTable.scss";

export const FilmographyTable = ({ items }) => {
  return (
    <div className="filmography-table">
      {Object.entries(items).reverse().map(([year, medias]) => (
        <FilmographyRow 
          key={year} 
          year={year} 
          medias={medias} 
        />
      ))}
    </div>
  );
};
