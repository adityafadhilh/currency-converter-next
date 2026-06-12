"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { TextInput } from "./TextInput";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ConverterBox() {
    const [fromCurrency, setFromCurrency] = useState<string>('USD');
    const [toCurrency, setToCurrency] = useState<string>('IDR');

    const [from, setFrom] = useState<string>('');
    const [to, setTo] = useState<string>('');

    const { data: rateData, error: rateError, isLoading: rateIsLoading } = useSWR(`/api/rate?from=${fromCurrency}&to=${toCurrency}`, fetcher);

    const { data: currencyData, error: currencyError, isLoading: currencyIsLoading } = useSWR(`/api/currency`, fetcher);

    console.log(JSON.stringify(rateData));
    console.log(JSON.stringify(currencyData));

    const currentRates = rateData?.currency?.rate;

    // useEffect(() => {
    //     setTo(currentRates ? (currentRates * Number(from)).toString() : "0.00");
    // }, [from]);

    const handleSwapCurrency = () => {
        let temp = fromCurrency;
        let tempValue = from;
        setFromCurrency(toCurrency);
        setToCurrency(temp);
        setFrom(to);
        setTo(tempValue);
    };

    if (rateError || currencyError) return <div>Error has occured</div>

    if (rateIsLoading || currencyIsLoading) return <div>Loading...</div>

    return (
        <div className="border border-green-500 md:w-1/2 h-fit space-y-4 rounded-4xl flex flex-col p-4">
            <div className="flex flex-col border h-20 border-green-500">
                <p className="text-xl relative left-4">From</p>
                <div className="flex flex-row justify-around items-center">
                    <TextInput
                        onChange={(value) => {
                            setFrom(value)
                            setTo(currentRates && value ? (currentRates * Number(value)).toString() : "");
                        }}
                        value={from}
                    />
                    <div className="px-4">
                        {/* <p className="text-xl">USD</p> */}
                        <select className="max-w-24 md:max-w-64 text-ellipsis p-4" onChange={(e) => setFromCurrency(e.target.value)} value={fromCurrency}>
                            {currencyData && !currencyIsLoading && currencyData.currency.map((item: any) => {
                                return <option key={item.iso_code} value={item.iso_code}>{item.iso_code} - {item.name}</option>
                            })}
                            {/* <option value="USD">USD</option>
                            <option value="IDR">IDR</option>
                            <option value="EUR">EUR</option> */}
                            {/* <option value="audi">Audi</option> */}
                        </select>
                    </div>
                </div>
            </div>
            <button onClick={handleSwapCurrency} className="bg-green-500 w-fit h-fit p-4 hover:opacity-80 rounded-full self-center flex justify-center">
                <Image src={'/swap.svg'} width={20} height={20} alt="swap" />
            </button>
            <div className="flex flex-col border h-20 border-green-500">
                <p className="text-xl relative left-4">To</p>
                <div className="flex flex-row justify-around">
                    <TextInput
                        onChange={(value) => {
                            setTo(value)
                            setFrom(currentRates && value ? (Number(value) / currentRates).toString() : "");
                        }}
                        value={to}
                    />
                    <div className="px-4">
                        <select className="max-w-24 md:max-w-64 text-ellipsis p-4" onChange={(e) => setToCurrency(e.target.value)} value={toCurrency}>
                            {/* <option value="IDR">IDR</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option> */}
                            {currencyData && !currencyIsLoading && currencyData.currency.map((item: any) => {
                                return <option key={item.iso_code} value={item.iso_code}>{item.iso_code} - {item.name}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}