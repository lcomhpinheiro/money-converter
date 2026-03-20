button = document.getElementById('convert-button')
const InitValue = document.getElementById('InitialValue')
const FinalValue = document.getElementById('FinalValue')

InitValue.innerText = "R$ --"
FinalValue.innerText = "US$ --"


function formatCurrency(value, currency){
    return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: currency}).format(value)
}


async function fetchRate(from, to){
    const url = `https://hexarate.paikama.co/api/rates/${from}/${to}/latest`
    const response = await fetch(url)
    const data = await response.json()
    return data.data.mid
}

consertvalues = async () => {
    let first_coin = document.getElementById('moeda1').value
    let second_coin = document.getElementById('moeda2').value
    let input = document.getElementById('valor').value
    let fisrtflag = document.getElementById('firstFlag')
    let secondflag = document.getElementById('secondFlag')

    console.log(input)

    console.log(fetchRate(first_coin, second_coin))

    if (input != ''){
        let rate = await fetchRate(first_coin, second_coin)
        let converted_value = Number(input) * rate

        switch (first_coin){
            case "BRL":
                InitValue.innerText = formatCurrency(Number(input), first_coin)
                fisrtflag.setAttribute("src", "./assets/imgs/brasil.png")
            break
            case "USD":
                InitValue.innerText = formatCurrency(Number(input), first_coin)
                fisrtflag.setAttribute("src", "./assets/imgs/eua.png")
            break
            case "EUR":
                InitValue.innerText = formatCurrency(Number(input), first_coin)
                fisrtflag.setAttribute("src", "./assets/imgs/euro.png")
            break
        }

        switch (second_coin){
            case "BRL":
                FinalValue.innerText = formatCurrency(converted_value, second_coin)
                secondflag.setAttribute("src", "./assets/imgs/brasil.png")
            break
            case "USD":
                FinalValue.innerText = formatCurrency(converted_value, second_coin)
                secondflag.setAttribute("src", "./assets/imgs/eua.png")
            break
            case "EUR":
                FinalValue.innerText = formatCurrency(converted_value, second_coin)
                secondflag.setAttribute("src", "./assets/imgs/euro.png")
            break
        }
    }
}

button.addEventListener('click', consertvalues)
