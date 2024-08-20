import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink as Link } from "react-router-dom";
import data from "../data/TabData.json";
import "../scss/components/mobilenav.scss";
import "../scss/root.scss";

export default function navmobile() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/checktoken`, {
        withCredentials: true,
      })

      .then((res) => {
        if (res.data.message === "OK") {
          setIsConnected(true);
        }
        setIsConnected(false);
      });
  }, []);

  return (
    <div className="TAB">
      <svg
        viewBox="0 0 1664 135"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0L55.4667 2C110.933 4 221.867 8.00001 332.8 16.2C443.733 24.3 554.667 36.7 665.6 43.3C776.533 50 887.467 51 998.4 44.7C1109.33 38.3 1220.27 24.7 1331.2 23.7C1442.13 22.7 1553.07 34.3 1608.53 40.2L1664 46V138H1608.53C1553.07 138 1442.13 138 1331.2 138C1220.27 138 1109.33 138 998.4 138C887.467 138 776.533 138 665.6 138C554.667 138 443.733 138 332.8 138C221.867 138 110.933 138 55.4667 138H0L0 0Z"
          fill="#19776D"
        />
        <path
          d="M0 0L55.4667 2C110.933 4 221.867 8.00001 332.8 16.2C443.733 24.3 554.667 36.7 665.6 43.3C776.533 50 887.467 51 998.4 44.7C1109.33 38.3 1220.27 24.7 1331.2 23.7C1442.13 22.7 1553.07 34.3 1608.53 40.2L1664 46V138H1608.53C1553.07 138 1442.13 138 1331.2 138C1220.27 138 1109.33 138 998.4 138C887.467 138 776.533 138 665.6 138C554.667 138 443.733 138 332.8 138C221.867 138 110.933 138 55.4667 138H0L0 0Z"
          fill="#19776D"
        />
        <path
          d="M0 106L55.4667 102.2C110.933 98.3 221.867 90.7 332.8 87C443.733 83.3 554.667 83.7 665.6 81.2C776.533 78.7 887.467 73.3 998.4 72.7C1109.33 72 1220.27 76 1331.2 76.2C1442.13 76.3 1553.07 72.7 1608.53 70.8L1664 69V138H1608.53C1553.07 138 1442.13 138 1331.2 138C1220.27 138 1109.33 138 998.4 138C887.467 138 776.533 138 665.6 138C554.667 138 443.733 138 332.8 138C221.867 138 110.933 138 55.4667 138H0L0 106Z"
          fill="#19776D"
        />
      </svg>

      <div className="TAB__container">
        {isConnected === true
          ? data
              .filter(
                (dataIndex) =>
                  dataIndex.connected === undefined ||
                  dataIndex.connected === true
              )
              .map((dataIndex) => (
                <Link key={dataIndex.id} to={dataIndex.linkurl}>
                  <div className="TAB__container__item">
                    <div className="TAB__container__item__icon">
                      <img src={dataIndex.icon} alt={dataIndex.name} />
                    </div>
                    <div className="TAB__container__item__text">
                      <p>{dataIndex.name}</p>
                    </div>
                  </div>
                </Link>
              ))
          : data
              .filter(
                (dataIndex) =>
                  dataIndex.connected === undefined ||
                  dataIndex.connected === false
              )
              .map((dataIndex) => (
                <Link key={dataIndex.id} to={dataIndex.linkurl}>
                  <div className="TAB__container__item">
                    <div className="TAB__container__item__icon">
                      <img src={dataIndex.icon} alt={dataIndex.name} />
                    </div>
                    <div className="TAB__container__item__text">
                      <p>{dataIndex.name}</p>
                    </div>
                  </div>
                </Link>
              ))}
      </div>
    </div>
  );
}
