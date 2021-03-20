import React, { useState, useCallback, useEffect } from "react";
import { Container, Table, Navbar, Form } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { listStocks } from "../utils/api";
import Loader from "./Loader";
import StockData from "./StockData";

const StockTable = () => {
  const [tableState, setTableState] = useState({
    offset: 0,
    tableData: [],
    completeData: [],
    perPage: 5,
    currentPage: 0,
    pageCount: 0,
  });
  const [loading, setLoading] = useState(false);

  const loadStockData = useCallback(
    () =>
      (async () => {
        setLoading(true);
        try {
          const data = await listStocks();
          const { offset, perPage } = tableState;
          const slice = data.slice(offset, offset + perPage);
          setTableState((state) => ({
            ...state,
            pageCount: Math.ceil(data.length / perPage),
            tableData: slice,
            completeData: data,
          }));
        } catch (error) {
          console.error(error);
        }
        setLoading(false);
      })(),
    []
  );

  useEffect(() => {
    loadStockData();
  }, [loadStockData]);

  const handleSearch = (e) => {
    let { value } = e.target;
    if (value.length === 0) {
      loadStockData();
    } else {
      const re = new RegExp(value, "gi");
      setTableState((state) => ({
        ...state,
        tableData: state.tableData.filter((stock) =>
          stock.company_name.match(re)
        ),
      }));
    }
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const newOffset = selectedPage * tableState.perPage;
    const { completeData, perPage } = tableState;
    const slice = completeData.slice(newOffset, newOffset + perPage);
    setTableState({
      ...tableState,
      currentPage: selectedPage,
      offset: newOffset,
      pageCount: Math.ceil(completeData.length / perPage),
      tableData: slice,
    });
  };

  return (
    <Container className="my-4">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">Stock Details Table </Navbar.Brand>

        <Form inline>
          <Form.Control
            type="text"
            placeholder="Search by company name.."
            className="ml-4"
            htmlSize={50}
            onChange={handleSearch}
          />
        </Form>
      </Navbar>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th>COMPANY NAME</th>
                <th>SYMBOL</th>
                <th>MARKET CAP.</th>
                <th>CURRENT PRICE</th>
              </tr>
            </thead>
            <tbody>
              {tableState.tableData.map((stock) => {
                return (
                  <tr key={stock._id}>
                    <StockData stock={stock} />
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
            pageCount={tableState.pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={1}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </>
      )}
    </Container>
  );
};

export default StockTable;
