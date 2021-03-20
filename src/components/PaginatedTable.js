import React, { useState, useRef, useCallback, useEffect } from "react";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import StockData from "./StockData";

const PaginatedTable = ({ data, savedDataTable, deleteStockRecord }) => {
  const [state, setState] = useState({
    offset: 0,
    tableData: [],
    completeData: [],
    perPage: 5,
    currentPage: 0,
    pageCount: 0,
  });

  const stateRef = useRef(state);

  const setTableParams = useCallback(() => {
    const { offset, perPage } = stateRef.current;
    const slice = data.slice(offset, offset + perPage);
    setState((state) => ({
      ...state,
      pageCount: Math.ceil(data.length / perPage),
      tableData: slice,
      completeData: data,
    }));
  }, [data]);

  useEffect(() => {
    setTableParams();
  }, [setTableParams]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const { completeData, perPage } = state;

    const newOffset = selectedPage * perPage;
    const slice = completeData.slice(newOffset, newOffset + perPage);
    setState({
      ...state,
      currentPage: selectedPage,
      offset: newOffset,
      pageCount: Math.ceil(completeData.length / perPage),
      tableData: slice,
    });
  };

  return (
    <>
      <Table>
        <thead className="bg-purple">
          <tr>
            <th>COMPANY NAME</th>
            <th>SYMBOL</th>
            <th>MARKET CAP.</th>
            <th></th>
            <th>CURRENT PRICE</th>
          </tr>
        </thead>
        <tbody>
          {state.tableData.map((stock) => {
            return (
              <tr key={stock._id}>
                {savedDataTable ? (
                  <StockData
                    stock={stock}
                    savedDataTable={savedDataTable}
                    deleteStockRecord={deleteStockRecord}
                  />
                ) : (
                  <StockData stock={stock} />
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={state.pageCount}
        marginPagesDisplayed={3}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </>
  );
};

export default PaginatedTable;
