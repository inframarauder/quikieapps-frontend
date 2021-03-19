import axios from "axios";

export const getCompanyStockPrice = (symbol) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://www.alphavantage.co/query`, {
        params: {
          function: "GLOBAL_QUOTE",
          apikey: "RORJ6U4XWQWPZSDZ",
          symbol,
        },
      })
      .then((res) => {
        const { data } = res;
        if (data["Note"]) {
          reject("limit reached");
        } else {
          resolve(data["Global Quote"]["05. price"]);
        }
      })
      .catch((err) => reject(err));
  });
};
