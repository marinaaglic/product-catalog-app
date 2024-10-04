import "../../styles/_pagination.scss";
import Button from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="pagination-wrapper">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="primary"
      >
        Previous
      </Button>
      <span className="pagination-page-info">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="primary"
      >
        Next
      </Button>
    </div>
  );
}
