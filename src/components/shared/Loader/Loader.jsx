import { classNames } from "@utils";
import "./styles/Loader.scss";

export const Loader = ({ className }) => {
  return (
    <div className={classNames(["loader", className])}>
      <div className="loader__spinner" />
    </div>
  );
};
