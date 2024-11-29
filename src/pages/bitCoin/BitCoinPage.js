import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout';
import '../../styles/bitCoin.scss'
import { getCoinListApi } from '../../api/BitCoinApi';

const BitCoinPage = () => {

    const [coinList, setCoinList] = useState([]);

    useEffect(() => {
        const coinList = async () => {
            try {
                const response = await getCoinListApi();
                console.log(response)
                setCoinList(response)
            } catch (error) {
                console.log(error);
            }
        }
        coinList();
    },[])

  return (
    <MainLayout>
        <div id='BitCoinPage'>
            <table>
                <tr>
                    <td>Bybit FuturesMarket && Not Binance SpotMarket</td>
                </tr>
                {coinList.length > 0 ? (
                    coinList.map((coin, index) => (
                        <tr key={index}>
                            <td>{coin.symbol}</td>
                        </tr>
                        ))
                ) : (
                    <tr>
                        <td>...LOADING...</td>
                    </tr>
                )}
            </table>
        </div>
    </MainLayout>
  )
}

export default BitCoinPage