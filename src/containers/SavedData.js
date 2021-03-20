import React, { useState, useCallback, useEffect } from "react";
import { Container, Navbar } from "react-bootstrap";
import { getSavedStocks, deleteStockRecord } from "../utils/api";
import { Loader, PaginatedTable } from "../components";

const SavedData = () => {
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
        <PaginatedTable
          data={stockData}
          savedDataTable={true}
          deleteStockRecord={handleDelete}
        />
      )}
    </Container>
  );
};

export default SavedData;
