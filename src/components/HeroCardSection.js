import React, { useState, useEffect, useCallback } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { getCompanyStockPrice } from "../utils/api";
import Loader from "./Loader";

const HeroCardSection = () => {
  const [stockPrices, setStockPrices] = useState({ FB: 0, GOOGL: 0, AMZN: 0 });
  const [loading, setLoading] = useState(false);

  const loadStockPrices = useCallback(
    () =>
      (async () => {
        setLoading(true);

        try {
          const fbResp = getCompanyStockPrice("FB");
          const googlResp = getCompanyStockPrice("GOOGL");
          const amznResp = getCompanyStockPrice("AMZN");

          const [fb, googl, amzn] = await Promise.all([
            fbResp,
            googlResp,
            amznResp,
          ]);

          setStockPrices((state) => ({
            ...state,
            FB: fb,
            GOOGL: googl,
            AMZN: amzn,
          }));
        } catch (error) {
          console.error(error);
        }

        setLoading(false);
      })(),
    []
  );

  useEffect(() => {
    loadStockPrices();
  }, [loadStockPrices]);
  return (
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
                <div className="card-text">
                  {loading ? <Loader /> : stockPrices[key]}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HeroCardSection;
