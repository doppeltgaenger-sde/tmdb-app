import { classNames } from "@utils";
import { Icon } from "@shared";
import "./styles/Pagination.scss";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const buttonsToShow = 5;
  const halfWindow = Math.floor(buttonsToShow / 2);
  let start = Math.max(1, currentPage - halfWindow);
  let end = Math.min(totalPages, start + buttonsToShow - 1);

  if (end - start < buttonsToShow - 1) {
    start = Math.max(1, end - buttonsToShow + 1);
  }

  const pages = [];

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (totalPages <= 1) return null;

  return (
    <nav className="pagination">
      <button
        className="pagination__button pagination__button--prev"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >        
        <Icon className="pagination__icon" name="chevron-left" />
      </button>

      {pages.map((page) => {
        const isActive = page === currentPage;

        return (
          <button
            className={classNames([
              "pagination__button",
              "pagination__button--page",
              isActive && "pagination__button--active"
            ])}
            key={page}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        );
      })}

      <button
        className="pagination__button pagination__button--next"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <Icon className="pagination__icon" name="chevron-right" />
      </button>
    </nav>
  );
};
