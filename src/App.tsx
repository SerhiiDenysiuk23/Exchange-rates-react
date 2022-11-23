import React, {useEffect, useState} from 'react';
import {requestAPI} from "./api/core";
import {Currency} from "./types/currency";
import Header from "./components/Header";
import Converter from "./components/Converter";

function App() {
    const [currency, setCurrency] = useState<Currency[]>([])
    const [headerData, setHeaderData] = useState<Currency[]>([])
    const currencyCodes = ["USD", "EUR"]
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        requestAPI().then(
            resp => {
                if (resp) {
                    let arr: Currency[] = [{code: "UAH", rate: 1}]
                    resp.map(item => {
                        arr = [...arr, {code: item.cc, rate: item.rate}]
                    })
                    setCurrency(arr)
                    setHeaderData(arr.filter(item => currencyCodes.includes(item.code)))
                }
            }
        )
    }, [])


    return (
        <div className="App">
            {
                currency.length
                    ? <>
                        <Header currencyArray={headerData}/>
                        <Converter currencyArray={currency}/>
                    </>
                : null
            }
        </div>
    );
}

export default App;
