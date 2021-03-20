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
  return new Promise(async (resolve, reject) => {
    try {
      const allStocksRes = await axios.get(`https://stockapi.glitch.me/all`);
      const savedStocksRes = await axios.get(
        "https://quickieapps.herokuapp.com/api"
      );
      let savedSymbols = savedStocksRes.data.map((stock) => stock.symbol);
      let unsavedStocks = allStocksRes.data.filter(
        (stock) => savedSymbols.indexOf(stock.symbol) === -1
      );

      resolve([...savedStocksRes.data, ...unsavedStocks]);
    } catch (error) {
      reject(error);
    }
  });
};

export const saveStock = (stock) => {
  return new Promise((resolve, reject) => {
    axios
      .post("https://quickieapps.herokuapp.com/api", stock)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const getSavedStocks = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://quickieapps.herokuapp.com/api`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const deleteStockRecord = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`https://quickieapps.herokuapp.com/api/${id}`)
      .then(() => resolve())
      .catch((err) => reject(err));
  });
};
