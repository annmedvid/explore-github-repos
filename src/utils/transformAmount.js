function transformAmount(amount) {
	if (amount < 1000) {
		return amount
	}

	return `${Math.round(amount / 100) / 10}k`
}

export default transformAmount
