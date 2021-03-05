export default function currencyFilter(value, currency = 'RUB') {
    return Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0
    }).format(value)
}