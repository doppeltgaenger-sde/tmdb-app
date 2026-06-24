import "./styles/UserStats.scss";

export const UserStats = ({ children }) => {
  return (
    <section className="user-stats">
      <h2 className="user-stats__title">Stats</h2>
      
      <div className="user-stats__body">
        {children}
      </div>
    </section>
  );
};
