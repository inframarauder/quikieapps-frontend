import React, { useState } from "react";
import { saveStock } from "../utils/api";
import Loader from "./Loader";
import { Button } from "react-bootstrap";

const StockData = ({ stock, savedDataTable, deleteStockRecord }) => {
  const [loading, setLoading] = useState(false);
  const [stockData, setStockData] = useState(stock);

  const handleSave = async (stock) => {
    setLoading(true);
    try {
      const newStock = await saveStock(stock);
      setStockData({ ...stockData, ...newStock });
    } catch (error) {
      console.error(error);
      alert("Error in saving data!");
    }
    setLoading(false);
  };

  const getButton = (stock) => {
    return savedDataTable ? (
      <Button
        variant="danger"
        className="table-btn"
        onClick={() => deleteStockRecord(stock._id)}
      >
        Delete
      </Button>
    ) : stock.saved ? (
      <Button
        style={{ backgroundColor: "#663399" }}
        className="table-btn"
        onClick={() => (window.location.href = "/view")}
      >
        <strong>View</strong>
      </Button>
    ) : (
      <Button
        variant="primary"
        className="table-btn"
        onClick={() => handleSave(stock)}
      >
        Save
      </Button>
    );
  };

  return (
    <>
      <td>{stockData.company_name}</td>
      <td>{stockData.symbol}</td>
      <td>{stockData.market_cap}</td>
      <td>{loading ? <Loader /> : getButton(stockData)}</td>
      <td>{stockData.price}</td>
    </>
  );
};

export default StockData;
