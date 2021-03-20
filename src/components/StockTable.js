import React, { useState, useCallback, useEffect } from "react";
import { Container, Table, Navbar, Form } from "react-bootstrap";
import { listStocks } from "../utils/api";
import Loader from "./Loader";

const StockTable = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadStockData = useCallback(
    () =>
      (async () => {
        setLoading(true);
        try {
          const data = await listStocks();
          setStockData(data);
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
      setStockData(stockData.filter((stock) => stock.company_name.match(re)));
    }
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
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>COMPANY NAME</th>
              <th>SYMBOL</th>
              <th>MARKET CAP.</th>
              <th>CURRENT PRICE</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((stock) => {
              return (
                <tr key={stock._id}>
                  <td>{stock.company_name}</td>
                  <td>{stock.symbol}</td>
                  <td>{stock.market_cap}</td>
                  <td>{stock.price}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default StockTable;
