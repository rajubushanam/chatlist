import React from "react";
import "../style.css";

export default function Header({
  handleSortOrder,
  sortOrder,
  totalMessages,
  currentPage,
  totalPages,
  handleButtonPrev,
  handleButtonNext
}) {
  return (
    <>
      <div className="filter-header">
        <button
          data-testid="test-btn-sort"
          className="btn-sort"
          onClick={handleSortOrder}
        >
          Sort by Date({sortOrder})
        </button>
        <p style={{ fontSize: 14 }}>Total of {totalMessages.length} Messages</p>
      </div>
      <div>
        {currentPage !== 1 && (
          <button style={{ marginRight: 5 }} onClick={handleButtonPrev}>
            &lt; Prev
          </button>
        )}
        {currentPage} / {totalPages}
        {currentPage !== totalPages && (
          <button style={{ marginLeft: 5 }} onClick={handleButtonNext}>
            Next &gt;
          </button>
        )}
      </div>
    </>
  );
}
