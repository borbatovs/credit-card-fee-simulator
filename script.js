document.addEventListener('DOMContentLoaded', function () {
    const cardNetwork = document.getElementById('card-network')
    const saleType = document.getElementById('sale-type')
    const payout = document.getElementById('payout')
    const saleAmount = document.getElementById('sale-amount')
    const amountReceived = document.getElementById('amount-received')
    const chosenSaleType = document.getElementById('chosen-sale-type')
    const interestRate = document.getElementById('interest-rate')
    const chosenPayout = document.getElementById('chosen-payout')
    const savings = document.getElementById('savings')

    const formatCurrency = value =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

    const parseCurrency = value =>
        parseFloat(value.replace(/\D/g, '')) / 100

    const handleSaleAmountInput = e => {
        const rawValue = e.target.value.replace(/\D/g, '');
        const value = rawValue === '' ? 0 : parseCurrency(rawValue);
        e.target.value = formatCurrency(value);
        calculateFees();
    }

    const calculateFees = () => {
        const amount = saleAmount.value ? parseCurrency(saleAmount.value) : 0;

        // TODO: Implement fee rules here
        // Use cardNetwork.value, saleType.value, and payout.value to determine the correct fee
        // Example:
        // const fee = getFeeRate(cardNetwork.value, saleType.value, payout.value)
        const simulatedRate = 0.136 // 13.6% (replace this with actual fee calculation)

        const calculatedAmountReceived = amount * (1 - simulatedRate)

        amountReceived.textContent = formatCurrency(calculatedAmountReceived)
        chosenSaleType.textContent = saleType.options[saleType.selectedIndex].text
        interestRate.textContent = `${(simulatedRate * 100).toFixed(2)}%`
        chosenPayout.textContent = payout.options[payout.selectedIndex].text

        const calculatedSavings = amount * 0.05 // 5% savings
        savings.textContent = formatCurrency(calculatedSavings)
    }

    [cardNetwork, saleType, payout].forEach(el =>
        el.addEventListener('change', calculateFees)
    )

    saleAmount.addEventListener('input', handleSaleAmountInput)

    // Initialize sale amount with formatted zero
    saleAmount.value = formatCurrency(0)

    // Initial calculation to show zero values
    calculateFees()
})