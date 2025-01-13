const numberFormatter = (num: number, digits: number = 1) => {
    const si = [
      { value: 1E18, symbol: 'E' },
      { value: 1E15, symbol: 'P' },
      { value: 1E12, symbol: 'T' },
      { value: 1E9, symbol: 'B' },
      { value: 1E6, symbol: 'M' },
      { value: 1E3, symbol: 'K' }
    ]
    for (let i = 0; i < si.length; i++) {
      if (num >= si[i].value) {
        return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
      }
    }
  
    return num?.toString()
  }
  
  const moneyFormat = (number: number, currency: string = 'VND', locale: string = 'vi-VN') => new Intl.NumberFormat(locale, { style: 'currency', currency }).format(number)
  
  const formatPercent = (number: number, digits: number = 2) =>number.toFixed(digits)
  export { numberFormatter, moneyFormat, formatPercent }
  