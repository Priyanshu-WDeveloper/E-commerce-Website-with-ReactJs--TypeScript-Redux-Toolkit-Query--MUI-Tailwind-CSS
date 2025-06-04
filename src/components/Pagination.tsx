import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React from "react";
import "../styles/Pagination.scss";
import { Product } from "../types/productTypes";

type Props = {
  // module: any;
  module: Product[];
  page: number;
  onPageChange: (newPage: number) => void;
  totalPages: number;
};

const CustomPagination = ({
  module,
  page,
  onPageChange,
  totalPages,
}: Props) => {
  const generatePageNumbers = () => {
    // const pageNumbers: any = [];
    const pageNumbers: number[] = [];
    const showMaxPages = 5; // Maximum number of pages to show around the current page

    if (totalPages <= showMaxPages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPages = [1, 2, 3];
      const endPages = [totalPages - 2, totalPages - 1, totalPages];
      const surroundingsPages = [page - 1, page, page + 1].filter(
        (p) => p > 1 && p < totalPages //remove first page and last page(Avoid page numbers less than 2 (because page 1 is usually handled separately),Avoid page numbers greater than or equal to totalPages (to prevent overshooting the last page).)
      );
      const uniquePages = new Set([
        ...startPages,
        ...surroundingsPages,
        ...endPages,
      ]);
      uniquePages.forEach((p) => pageNumbers.push(p));
      // pageNumbers.sort((a: any, b: any) => a - b);
      pageNumbers.sort((a: number, b: number) => a - b);
    }
    return pageNumbers;
  };
  const pageNumbers = generatePageNumbers();
  return (
    <div className="pagination" style={{ marginTop: "20px" }}>
      <p>
        <span>Showing {module?.length ? `${module?.length}` : 0} items </span>
      </p>
      <div className="pages">
        <button
          className="prevbtn"
          onClick={() => {
            window.scrollTo(0, 0);
            onPageChange(page - 1);
          }}
          disabled={page === 1}
        >
          <ArrowBackIosIcon />
        </button>
        <div className="count">
          {/* {pageNumbers.map((pageNum: any, index: any) => ( */}
          {pageNumbers.map((pageNum: number, index: number) => (
            <React.Fragment key={index}>
              {index > 0 && pageNum - pageNumbers[index - 1] > 1 && (
                <span>...</span>
              )}
              <button
                className={page === pageNum ? "actv" : "inActv"}
                onClick={() => {
                  window.scrollTo(0, 0);
                  onPageChange(pageNum);
                }}
                disabled={page === pageNum}
              >
                {pageNum}
              </button>
            </React.Fragment>
          ))}
        </div>
        <button
          className="prevbtn"
          onClick={() => {
            window.scrollTo(0, 0);
            onPageChange(page + 1);
          }}
          disabled={page === totalPages}
        >
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
};

export default CustomPagination;
