import axios from "axios";

export const getCompanyStockPrice = (symbol) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://stockapi.glitch.me/${symbol}`)
      .then((res) => {
        const { data } = res;

        resolve(data[0].price);
      })
      .catch((err) => reject(err));
  });
};

export const listStocks = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://stockapi.glitch.me/all`)
      .then((res) => {
        const { data } = res;
        resolve(data);
      })
      .catch((err) => reject(err));
  });
};
