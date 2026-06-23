import { useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useCurrency = () => {
    const [fromCurrency, setFromCurrency] = useState<string>('USD');
    const [toCurrency, setToCurrency] = useState<string>('IDR');

    const { data: rateData, error: rateError, isLoading: rateIsLoading } = useSWR(`/api/rate?from=${fromCurrency}&to=${toCurrency}`, fetcher);

    const { data: currencyData, error: currencyError, isLoading: currencyIsLoading } = useSWR(`/api/currency`, fetcher);

    const currentRates = rateData?.currency?.rate;

    console.log(JSON.stringify(currencyData));

    return {
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
    };
};