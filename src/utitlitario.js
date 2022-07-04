const dateFormat = (date) => {
    if(date){
        const splitDate = date.substr(0, 10).split('-');
        const [year, month, day] = splitDate;
        return `${day}/${month}/${year}`;
    }
   
}


const handlePrint = () => {
    window.print()
}

const formatToSoles = (monto) => {
    const moneda = new Intl.NumberFormat("es-PE", { style: 'currency', currency: 'PEN' }).format(monto)
    return moneda.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const formatToDolares = (monto) => {
    const moneda = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(monto)
    return moneda.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const currencyFormat = (amount) => {
    return amount.replace(/PEN/gi, 'S/')
}

const capitalized = (word) => {

        if(word !== undefined){
        const [first, ...rest] = word.toLowerCase()
        const upperCase = first.toUpperCase()
        return upperCase + rest.join('')
        }
   
}

 


export { dateFormat, currencyFormat, formatToSoles, formatToDolares, handlePrint, capitalized}