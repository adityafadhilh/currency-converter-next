export const formatCurrency = (val: number, currency: string) => {
    if (!val || isNaN(val)) return "";
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
    }).format(val);
};