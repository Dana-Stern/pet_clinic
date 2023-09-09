type props = {
  canPreviousPage: boolean;
  canNextPage: boolean;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  nextPage: () => void;
  previousPage: () => void;
  pageNumber: number;
  numberOfPages: number;
};

const Pagination = ({
  canPreviousPage,
  canNextPage,
  goToFirstPage,
  goToLastPage,
  nextPage,
  previousPage,
  pageNumber,
  numberOfPages,
}: props) => {
  return (
    <div className="flex items-center gap-2">
      <button
        className="rounded border p-1"
        onClick={goToFirstPage}
        disabled={!canPreviousPage}
      >
        {"<<"}
      </button>
      <button
        className="rounded border p-1"
        onClick={previousPage}
        disabled={!canPreviousPage}
      >
        {"<"}
      </button>
      <button
        className="rounded border p-1"
        onClick={nextPage}
        disabled={!canNextPage}
      >
        {">"}
      </button>
      <button
        className="rounded border p-1"
        onClick={goToLastPage}
        disabled={!canNextPage}
      >
        {">>"}
      </button>
      <span className="flex items-center gap-1">
        <div>Page</div>
        <strong>
          {pageNumber} of {numberOfPages}
        </strong>
      </span>
    </div>
  );
};

export default Pagination;
