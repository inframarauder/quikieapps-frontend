import React, { useState, useEffect, useCallback } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { getCompanyStockPrice } from "../utils/api";

const HeroCardSection = () => {
  const [stockPrices, setStockPrices] = useState({ FB: 0, GOOGL: 0, AMZN: 0 });
  const [loading, setLoading] = useState(false);

  const loadStockPrices = useCallback(
    () =>
      (() => {
        setLoading(true);
        Object.keys(stockPrices).forEach(async (key) => {
          try {
            const price = await getCompanyStockPrice(key);
            setStockPrices((state) => ({ ...state, [key]: price }));
          } catch (error) {
            console.error(error);
          }
        });

        setLoading(false);
      })(),
    []
  );
  useEffect(() => {
    loadStockPrices();
  }, [loadStockPrices]);
  return loading ? (
    <></>
  ) : (
    <div className="my-4 center-content">
      <Row>
        {Object.keys(stockPrices).map((key, i) => (
          <Col sm="4" className="center-content" key={i}>
            <Card className="hero-card my-4">
              <Card.Body>
                <Card.Title>
                  {key}
                  <Card.Img
                    variant="top"
                    src={
                      key === "AMZN"
                        ? `/images/${key}.svg`
                        : `/images/${key}.png`
                    }
                    className="card-img"
                  />
                </Card.Title>
                <Card.Text className="card-text">
                  {Math.round(stockPrices[key])} USD
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HeroCardSection;
