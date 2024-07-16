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

    const feeRates = {
        'mastercard': {
            'debit': 0.0199, // 1.99%
            'immediate': 0.0499, // 4.99%
            'installment2x': 0.0628, // 6.28%
            'installment3x': 0.0698, // 6.98%
            'installment4x': 0.0769, // 7.69%
            'installment5x': 0.0840, // 8.40%
            'installment6x': 0.0912, // 9.12%
            'installment7x': 0.1004, // 10.04%
            'installment8x': 0.1078, // 10.78%
            'installment9x': 0.1151, // 11.51%
            'installment10x': 0.1226, // 12.26%
            'installment11x': 0.1301, // 13.01%
            'installment12x': 0.1377 // 13.77%            
        }

        , 'visa': {
            'debit': 0.0199, // 1.99 %
            'immediate': 0.0499, // 4,99%
            'installment2x': 0.0594, // 5,94%
            'installment3x': 0.0664, // 6,64%
            'installment4x': 0.0734, // 7,34%
            'installment5x': 0.0805, // 8,05%
            'installment6x': 0.0877, // 8,77%
            'installment7x:': 0.0988, // 9,88%
            'installment8x': 0.1061, // 10,61%
            'installment9x': 0.1131, // 11,34%
            'installment10x': 0.1209, // 12,09%
            'installment11x': 0.1284, // 12,84%
            'installment12x': 0.1360 // 13,60%
        }

        , 'elo': {
            'debit': 0.0199, // 1,99%
            'immediate': 0.0199, // 4,99%
            'installment2x': 0.0588, // 5,88%
            'installment3x': 0.0657, // 6,57%
            'installment4x': 0.0728, // 7,28%
            'installment5x': 0.0798, // 7,98%
            'installment6x': 0.0870, // 8,70%
            'installment7x:': 0.0977, // 9,77%
            'installment8x': 0.1050, // 10,50%
            'installment9x': 0.1123, // 11,23%
            'installment10x': 0.1197, // 11,97%
            'installment11x': 0.1272, // 12,72%
            'installment12x': 0.1347 // 13,47%
        }

        // // TO DO: Add more card networks and rates
    }

    const payoutRates = {
        'sameday': 0.0400, // 4%
        'one-day': 0.0250 // 2,5%
    }

    const handleSaleAmountInput = e => {
        const rawValue = e.target.value.replace(/\D/g, '')
        const value = rawValue === '' ? 0 : parseCurrency(rawValue)
        e.target.value = formatCurrency(value)
        calculateFees()
    }

    const getFeeRate = (network, sale) => {
        return feeRates[network]?.[sale] ?? 0.05 // Default fee if combination not found
    }

    const getPayoutRate = (payout) => {
        return payoutRates[payout] ?? 0.05 // Default payout fee if not found
    }

    const calculateFees = () => {
        const amount = saleAmount.value ? parseCurrency(saleAmount.value) : 0
        const selectedCardNetwork = cardNetwork.value.toLowerCase()
        const selectedSaleType = saleType.value.toLowerCase()
        const selectedPayout = payout.value.toLowerCase()

        const feeRate = getFeeRate(selectedCardNetwork, selectedSaleType)
        const payoutRate = getPayoutRate(selectedPayout)
        const totalRate = feeRate + payoutRate;
        const calculatedAmountReceived = amount * (1 - totalRate)

        amountReceived.textContent = formatCurrency(calculatedAmountReceived)
        chosenSaleType.textContent = saleType.options[saleType.selectedIndex].text
        interestRate.textContent = `${(totalRate * 100).toFixed(2)}%`
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