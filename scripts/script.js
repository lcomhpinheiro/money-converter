const button = document.getElementById('convert-button')
const InitValue = document.getElementById('InitialValue')
const FinalValue = document.getElementById('FinalValue')

const elements = {
    moeda1: document.getElementById('moeda1'),
    moeda2: document.getElementById('moeda2'),
    valor: document.getElementById('valor'),
    firstFlag: document.getElementById('firstFlag'),
    secondFlag: document.getElementById('secondFlag')
}

const currencyConfig = {
    BRL: { flag: './assets/imgs/brasil.png' },
    USD: { flag: './assets/imgs/eua.png' },
    EUR: { flag: './assets/imgs/euro.png' },
}

InitValue.innerText = "R$ --"
FinalValue.innerText = "US$ --"


const formatCurrency = (value, currency) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency
    }).format(value)
}

const fetchRate = async (from, to) => {
    const res = await fetch(`https://hexarate.paikama.co/api/rates/${from}/${to}/latest`)
    const data = await res.json()
    return data.data.mid
}



const updateUI = (element, value, currency, flagEl) => {
    element.innerText = formatCurrency(value, currency)
    flagEl.src = currencyConfig[currency].flag
}



const convertValues = async () => {
    const from = elements.moeda1.value
    const to = elements.moeda2.value
    const input = Number(elements.valor.value)

    if (!input) return

    try {
        const rate = await fetchRate(from, to)
        const converted = input * rate

        updateUI(InitValue, input, from, elements.firstFlag)
        updateUI(FinalValue, converted, to, elements.secondFlag)

    } catch (err) {
        console.error("Erro na conversão:", err)
    }
}

button.addEventListener('click', convertValues)