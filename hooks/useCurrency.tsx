import { useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useCurrency = () => {
    const [fromCurrency, setFromCurrency] = useState<string>('USD');
    const [toCurrency, setToCurrency] = useState<string>('IDR');

    const [from, setFrom] = useState<string>('');
    const [to, setTo] = useState<string>('');

    const { data: rateData, error: rateError, isLoading: rateIsLoading } = useSWR(`/api/rate?from=${fromCurrency}&to=${toCurrency}`, fetcher);

    const { data: currencyData, error: currencyError, isLoading: currencyIsLoading } = useSWR(`/api/currency`, fetcher);

    const currentRates = rateData?.currency?.rate;

    return {
        fromCurrency,
        setFromCurrency,

        toCurrency,
        setToCurrency,

        from,
        setFrom,

        to,
        setTo,

        currentRates,
        rateError,
        rateIsLoading,
        currencyData,
        currencyError,
        currencyIsLoading
    };
};