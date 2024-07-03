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

    function formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
    }

    function parseCurrency(value) {
        return parseFloat(value.replace(/\D/g, '')) / 100
    }

    saleAmount.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '')
        value = parseCurrency(value)
        e.target.value = formatCurrency(value)
    });

    function calculateFees() {
        const amount = parseCurrency(saleAmount.value) || 0;
        const simulatedRate = 0.136 // 13.6%
        const calculatedAmountReceived = amount * (1 - simulatedRate)

        amountReceived.textContent = formatCurrency(calculatedAmountReceived)
        chosenSaleType.textContent = saleType.options[saleType.selectedIndex].text
        interestRate.textContent = `${(simulatedRate * 100).toFixed(2)}%`
        chosenPayout.textContent = payout.options[payout.selectedIndex].text

        const calculatedSavings = amount * 0.05 // 5% savings
        savings.textContent = formatCurrency(calculatedSavings)
    }

    [cardNetwork, saleType, payout, saleAmount].forEach(el => {
        el.addEventListener('change', calculateFees)
    });

    saleAmount.addEventListener('input', calculateFees)

    saleAmount.value = formatCurrency(0)

    calculateFees()
});