import React, {FC, RefObject, useEffect, useRef, useState} from 'react';
import {Currency} from "../types/currency";

interface Props {
    currencyArray: Currency[],
    defaultFrom?: Currency
}

interface BlockProps{
    currencyArray: Currency[],
    selectDefault: string,
    setInputHandler(value:number): void,
    setSelectHandler(value:string): void,
    inputValue: number
    myRef?: RefObject<HTMLInputElement>
}

const InputBlock: FC<BlockProps> = ({myRef , currencyArray, selectDefault, setInputHandler, setSelectHandler, inputValue}) => {
    return (
        <div>
            <input ref={myRef} onChange={e => {
                setInputHandler(Number(e.target.value))
            }} value={inputValue} type="number"/>
            <select defaultValue={selectDefault} onChange={e => setSelectHandler(e.target.value)}>
                {
                    currencyArray.map((item) => {
                        return <option key={item.code} value={item.code}>{item.code}</option>
                    })
                }
            </select>
        </div>
    )
}


const Converter: FC<Props> = ({currencyArray, defaultFrom = {code: "UAH", rate: 1}}) => {
    const currencyMap: Map<string, number> = new Map(currencyArray.map(item => [item.code, item.rate]))

    const [select1, setSelect1] = useState<string>("USD")
    const [select2, setSelect2] = useState<string>(defaultFrom.code)

    const [inp1, setInp1] = useState<number>(defaultFrom.rate)
    const [inp2, setInp2] = useState<number>(currencyMap.get(select1) ?? 0)

    const inp1Ref = useRef<HTMLInputElement>(null)
    const inp2Ref = useRef<HTMLInputElement>(null)

    const [lastFocus, setLastFocus] = useState<RefObject<HTMLInputElement>>(inp1Ref)

    const sum = (value:number, from: string, to: string) => {
        const selectRate1 = currencyMap.get(from)
        const selectRate2 = currencyMap.get(to)
        return selectRate1 && selectRate2 ? Math.ceil((selectRate2 / selectRate1) * 1000) / 1000 * value : 0
    }

    useEffect(() => {
        if (document.activeElement === inp2Ref.current)
            setLastFocus(inp2Ref)
        else if (document.activeElement === inp1Ref.current)
            setLastFocus(inp1Ref)

        if (lastFocus === inp1Ref)
            setInp2(sum(inp1, select1, select2))
        else if (lastFocus === inp2Ref)
            setInp1(sum(inp2, select2, select1))
    }, [inp1, inp2, select1, select2])

    return (
        <div>
            <InputBlock
                myRef={inp1Ref}
                currencyArray={currencyArray}
                selectDefault={select2}
                setInputHandler={(value:number)=>setInp1(value)}
                setSelectHandler={(value:string)=>setSelect2(value)}
                inputValue={inp1}/>

            <InputBlock
                myRef={inp2Ref}
                currencyArray={currencyArray}
                selectDefault={select1}
                setInputHandler={(value:number)=>setInp2(value)}
                setSelectHandler={(value:string)=>setSelect1(value)}
                inputValue={inp2}/>
        </div>
    );
};

export default Converter;