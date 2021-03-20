import React, { useState, useCallback, useEffect } from "react";
import { Container, Navbar, Form } from "react-bootstrap";
import { listStocks } from "../utils/api";
import { Loader, PaginatedTable } from "../components";

const StockDetails = () => {
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
    <Container className="my-4 table-container">
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home">Stock Details Table </Navbar.Brand>

        <Form inline className="ml-4">
          <Form.Control
            type="text"
            placeholder=" &#x1F50D; Search by company name.."
            htmlSize={50}
            onChange={handleSearch}
          />
        </Form>
      </Navbar>
      {loading ? (
        <Loader />
      ) : (
        <PaginatedTable data={stockData} className="w-100" />
      )}
    </Container>
  );
};

export default StockDetails;
