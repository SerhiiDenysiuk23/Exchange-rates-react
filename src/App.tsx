import React, {useEffect, useState} from 'react';
import {requestAPI} from "./api/core";
import {Currency} from "./types/currency";
import Header from "./components/Header";
import Converter from "./components/Converter";

function App() {
    const [currency, setCurrency] = useState<Currency[]>([])
    const [headerData, setHeaderData] = useState<Currency[]>([])
    const currencyCodes = ["USD", "EUR"]

    useEffect(() => {
        // const testData = [{code: "UAH", rate: 1}, {code: "USD", rate: 37}, {code: "EUR", rate: 36}]
        // setCurrency(testData)
        // setHeaderData(testData.filter(item => currencyCodes.includes(item.code)))
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
                        <div className={"wrapper_converter"}>
                            <Converter currencyArray={currency}/>
                        </div>
                    </>
                : null
            }
        </div>
    );
}

export default App;
