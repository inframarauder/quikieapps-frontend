import React, { useState, useCallback, useEffect } from "react";
import { Container, Table, Navbar } from "react-bootstrap";
import { getSavedStocks, deleteStockRecord } from "../utils/api";
import Loader from "./Loader";
import StockData from "./StockData";

const SavedDataTable = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadStockData = useCallback(
    () =>
      (async () => {
        setLoading(true);
        try {
          const data = await getSavedStocks();
          setStockData(data);
        } catch (error) {
          console.error(error);
        }
        setLoading(false);
      })(),
    []
  );

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        await deleteStockRecord(id);
        loadStockData();
      }
    } catch (error) {
      console.error(error);
      alert("Error in deleting!");
    }
  };

  useEffect(() => {
    loadStockData();
  }, [loadStockData]);

  return (
    <Container className="my-4">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand>Saved Data Table </Navbar.Brand>
      </Navbar>
      {loading ? (
        <Loader />
      ) : (
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
            {stockData.map((stock) => {
              return (
                <tr key={stock._id}>
                  <StockData
                    stock={stock}
                    savedDataTable={true}
                    deleteStockRecord={handleDelete}
                  />
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default SavedDataTable;
