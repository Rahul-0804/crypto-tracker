import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Sparklines, SparklinesLine } from "react-sparklines";
import {FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin, FaTelegram, FaReddit, FaGithub} from 'react-icons/fa'
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";

const CoinPage = () => {
  const [coinInfo, setCoinInfo] = useState({});
  const params = useParams();

  const url =
    `https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=false&sparkline=true`;

  useEffect(() => {
    axios.get(url).then((res) => {
      setCoinInfo(res.data);
    });
  }, [url]);

  return (
    <div className="rounded-div my-12 py-8">
      <div className="flex py-8 ">
        <img className="w-20 mr-8" src={coinInfo.image?.large} alt="/" />
        <div>
          <p className="text-3xl font-bold">{coinInfo.name} price</p>
          <p>({coinInfo.symbol?.toUpperCase()} / USD)</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between">
            {coinInfo.market_data?.current_price ? (
              <p className="text-3xl font-bold">${coinInfo.market_data.current_price.usd.toLocaleString()}</p>
            ) : null}
            <p>7 Day</p>
          </div>
          <div>
            <Sparklines data={coinInfo.market_data?.sparkline_7d.price}>
              <SparklinesLine color="green" />
            </Sparklines>
          </div>
          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">Market Cap</p>
              {coinInfo.market_data?.market_cap ? (
                <p>${coinInfo.market_data.market_cap.usd.toLocaleString()}</p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Volume (24h)</p>
              {coinInfo.market_data?.total_volume ? (
                <p>${coinInfo.market_data.total_volume.usd.toLocaleString()}</p>
              ) : null}
            </div>
          </div>

          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">24H High</p>
              {coinInfo.market_data?.high_24h ? (
                <p>${coinInfo.market_data.high_24h.usd.toLocaleString()}</p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">24H Low</p>
              {coinInfo.market_data?.low_24h ? (
                <p>${coinInfo.market_data.low_24h.usd.toLocaleString()}</p>
              ) : null}
            </div>
          </div>
        </div>
      
      <div>
        <p className="text-xl font-bold">Market Stats</p>
        <div className="flex justify-between py-4">
          <div>
            <p className="text-gray-500 text-sm">Market Rank</p>
            {coinInfo.market_cap_rank ? (
              <p>{coinInfo.market_cap_rank}</p>
            ) : null}
          </div>
          <div>
            <p className="text-gray-500 text-sm">Hashing Algorithm</p>
            {coinInfo.hashing_algorithm ? (
              <p>{coinInfo.hashing_algorithm}</p>
            ) : null}
          </div>
          <div>
            <p className="text-gray-500 text-sm">Trust Score</p>
            {coinInfo.tickers ? <p>{coinInfo.liquidity_score.toFixed(2)}</p> : null}
          </div>
        </div>

        <div className="flex justify-between py-4">
          <div>
            <p className="text-gray-500 text-sm">Price Change (24h)</p>
            {coinInfo.market_data?.price_change_percentage_24h ? (
              <p>{coinInfo.market_data.price_change_percentage_24h.toFixed(2)}%</p>
            ) : null}
          </div>
          <div>
            <p className="text-gray-500 text-sm">Price Change (7d)</p>
            {coinInfo.market_data?.price_change_percentage_7d ? (
              <p>{coinInfo.market_data.price_change_percentage_7d.toFixed(2)}%</p>
            ) : null}
          </div>
          <div>
            <p className="text-gray-500 text-sm">Price Change (14d)</p>
            {coinInfo.market_data?.price_change_percentage_14d ? (
              <p>{coinInfo.market_data.price_change_percentage_14d.toFixed(2)}%</p>
            ) : null}
          </div>
        </div>

        <div className="flex justify-between py-4">
          <div>
            <p className="text-gray-500 text-sm">Price Change (30d)</p>
            {coinInfo.market_data?.price_change_percentage_30d ? (
              <p>{coinInfo.market_data.price_change_percentage_30d.toFixed(2)}%</p>
            ) : null}
          </div>
          <div>
            <p className="text-gray-500 text-sm">Price Change (60d)</p>
            {coinInfo.market_data?.price_change_percentage_60d ? (
              <p>{coinInfo.market_data.price_change_percentage_60d.toFixed(2)}%</p>
            ) : null}
          </div>
          <div>
            <p className="text-gray-500 text-sm">Price Change (1y)</p>
              {coinInfo.market_data?.price_change_percentage_1y ? (
                <p>{coinInfo.market_data.price_change_percentage_1y.toFixed(2)}%</p>
                ) : null}
          </div>
        </div>
     
         <div className="flex justify-around p-8 text-accent">
          <FaTwitter/>
          <FaFacebook/>
          <FaReddit/>
          <FaGithub/>
         </div>

      </div>
      </div>

      {/* Description */}
      <div className="py-4">
        <p className="text-xl font-bold">About {coinInfo.name}</p>
        <p
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(coinInfo.description?coinInfo.description.en:''),
          }}>
        </p>
      </div>
    </div>
  );
};

export default CoinPage;
