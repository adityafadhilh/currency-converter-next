"use client"

import Image from "next/image"
import { useState } from "react"
import { TextInput } from "./TextInput";
import { useCurrency } from "@/hooks/useCurrency";
import { formatCurrency } from "@/helpers/formatCurrency";

export default function ConverterBox() {
    const {
        fromCurrency,
        setFromCurrency,
        toCurrency,
        setToCurrency,
        currentRates,
        rateError,
        rateIsLoading,
        currencyData,
        currencyError,
        currencyIsLoading
    } = useCurrency();

    const [from, setFrom] = useState<string>('');
    const [to, setTo] = useState<string>('');

    const [fromFocused, setFromFocused] = useState<boolean>(false);
    const [toFocused, setToFocused] = useState<boolean>(false);

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

    const showBeforeRedesign = false;
    if (showBeforeRedesign) {
        return (
            <div className="border border-green-500 md:w-1/2 h-fit space-y-4 rounded-4xl flex flex-col p-4">
                <div className="flex flex-col border h-20 border-green-500">
                    <p className="text-xl relative left-4">From</p>
                    <div className="flex flex-row justify-around items-center">
                        <TextInput
                            onChange={(rawValue: string) => {
                                const cleanValue = rawValue.replace(/[^0-9.]/g, "");

                                setFrom(cleanValue);

                                if (currentRates && cleanValue) {
                                    const calculated = currentRates * Number(cleanValue);
                                    setTo(calculated.toFixed(2));
                                } else {
                                    setTo("");
                                }
                            }}
                            value={fromFocused ? from : formatCurrency(Number(from), fromCurrency)}
                            onFocus={() => setFromFocused(true)}
                            onBlur={() => setFromFocused(false)}
                        />
                        <div className="px-4">
                            {/* <p className="text-xl">USD</p> */}
                            <select className="max-w-24 md:max-w-64 text-ellipsis p-4" onChange={(e) => setFromCurrency(e.target.value)} value={fromCurrency}>
                                {currencyData && !currencyIsLoading && currencyData.currency.map((item: any) => {
                                    return <option key={item.iso_code} value={item.iso_code}>{item.iso_code} - {item.name}</option>
                                })}
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
                            onChange={(rawValue: string) => {
                                const cleanValue = rawValue.replace(/[^0-9.]/g, "");

                                setTo(cleanValue);

                                if (currentRates && cleanValue) {
                                    const calculated = currentRates * Number(cleanValue);
                                    setFrom(calculated.toFixed(2));
                                } else {
                                    setFrom("");
                                }
                            }}
                            value={toFocused ? to : formatCurrency(Number(to), toCurrency)}
                            onFocus={() => setToFocused(true)}
                            onBlur={() => setToFocused(false)}
                        />
                        <div className="px-4">
                            <select className="max-w-24 md:max-w-64 text-ellipsis p-4" onChange={(e) => setToCurrency(e.target.value)} value={toCurrency}>
                                {currencyData && !currencyIsLoading && currencyData.currency.map((item: any) => {
                                    return <option key={item.iso_code} value={item.iso_code}>{item.iso_code} - {item.name}</option>
                                })}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-center">
                {/* <h1 className="text-gray-500">{ formatCurrency(Number(to), toCurrency)}</h1> */}
                <h1 className="text-4xl md:text-6xl text-gray-700">{to ? formatCurrency(Number(to), toCurrency) : '...'}</h1>
            </div>
            <div className="flex flex-col space-y-4 md:space-y-0 mt-12 md:flex-row md:space-x-4 items-center justify-center">
                <div className="border border-[#E4E3E8] items-center flex flex-row py-3 rounded-xl w-3/4 md:max-w-64">
                    <TextInput
                        onChange={(rawValue: string) => {
                            const cleanValue = rawValue.replace(/[^0-9.]/g, "");

                            setFrom(cleanValue);

                            if (currentRates && cleanValue) {
                                const calculated = currentRates * Number(cleanValue);
                                setTo(calculated.toFixed(2));
                            } else {
                                setTo("");
                            }
                        }}
                        value={fromFocused ? from : formatCurrency(Number(from), fromCurrency)}
                        onFocus={() => setFromFocused(true)}
                        onBlur={() => setFromFocused(false)}
                    />
                </div>
                <div className="flex items-center justify-center">
                    {/* <p className="text-xl">USD</p> */}
                    <select className="border border-[#E4E3E8] rounded-xl max-w-3/4 md:max-w-64 text-ellipsis p-4" onChange={(e) => setFromCurrency(e.target.value)} value={fromCurrency}>
                        {currencyData && !currencyIsLoading && currencyData.currency.map((item: any) => {
                            return <option key={item.iso_code} value={item.iso_code}>{item.iso_code} - {item.name}</option>
                        })}
                    </select>
                </div>
                <button onClick={handleSwapCurrency} className="bg-gray-700 w-fit h-fit p-4 hover:opacity-80 rounded-xl self-center flex justify-center md:hidden">
                    <Image src={'/swap.svg'} width={20} height={20} alt="swap" />
                </button>
                <button onClick={handleSwapCurrency} className="bg-gray-700 w-fit h-fit p-4 hover:opacity-80 rounded-xl self-center justify-center hidden md:flex">
                    <Image src={'/swap-horizontal.svg'} width={20} height={20} alt="swap" />
                </button>
                <div className="flex items-center justify-center">
                    <select className="border border-[#E4E3E8] rounded-xl max-w-3/4 md:max-w-64 text-ellipsis p-4" onChange={(e) => setToCurrency(e.target.value)} value={toCurrency}>
                        {currencyData && !currencyIsLoading && currencyData.currency.map((item: any) => {
                            return <option key={item.iso_code} value={item.iso_code}>{item.iso_code} - {item.name}</option>
                        })}
                    </select>
                </div>
            </div>
        </div>
    )

}