import React, { useState } from "react";
import { saveStock } from "../utils/api";
import Loader from "./Loader";
import { Button } from "react-bootstrap";

const StockData = ({ stock }) => {
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
    return stock.saved ? (
      <Button variant="info">View</Button>
    ) : (
      <Button variant="primary" onClick={() => handleSave(stock)}>
        Save
      </Button>
    );
  };

  return (
    <>
      <td>{stockData.company_name}</td>
      <td>{stockData.symbol}</td>
      <td>{stockData.market_cap}</td>
      <td>{stockData.price}</td>
      <td>{loading ? <Loader /> : getButton(stockData)}</td>
    </>
  );
};

export default StockData;
