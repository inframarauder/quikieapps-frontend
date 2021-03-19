import axios from "axios";

export const getCompanyStockPrice = async (symbol) => {
  const { data } = await axios.get(`https://www.alphavantage.co/query`, {
    params: {
      function: "GLOBAL_QUOTE",
      apikey: "RORJ6U4XWQWPZSDZ",
      symbol,
    },
  });

  return data["Global Quote"]["05. price"];
};
