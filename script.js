window.addEventListener('load' , function(){
    let form = document.querySelector('form')
    form.addEventListener('submit', getData)
})

function getData()
{
    event.preventDefault()
    let form = new FormData(event.target)
    let dollar = Number(form.get('usd'))
    let currency = form.get('currency')
    console.log(dollar, currency)  

    let display = document.querySelector('h2')
    if(dollar == 0 )
    {
        // display.style.visibility = 'hidden'
        document.querySelector('#usd-error').style.display = "block"
        setTimeout(() => {
            document.querySelector('#usd-error').style.display = "none"    
        }, 4000);
    }
    else if( currency == "")
    {
        // display.style.visibility = 'hidden'
        document.querySelector('#error').style.display = "block"
        setTimeout(() => {
            document.querySelector('#error').style.display = "none"    
        }, 4000);
    }
    else
    {
        let xhr = new XMLHttpRequest()
        xhr.open('GET', `http://apilayer.net/api/live?access_key=20816841d86113ab8f5088ec9bc41102&currencies=${currency}&source=USD&format=1`)
        xhr.send()
        xhr.onload = function(){
            // console.log(this.response)
            let data = JSON.parse(this.response)
            data = data.quotes
            console.log(data)
            let result = 0
            for(let key in data)
            {
                result = dollar * Number(data[key])
            }
            if(currency == "EUR")
            {
                document.getElementById('currency').innerHTML = `<img src="https://img.icons8.com/dotty/40/000000/euro-pound-exchange.png"/>`

            }
            else if(currency=="GBP")
            {
                document.getElementById('currency').innerHTML = `<img src="https://img.icons8.com/dotty/40/000000/british-pound.png"/>`
            }
            else if(currency=="CAD")
            {
                document.getElementById('currency').innerHTML = `<img src="https://img.icons8.com/ios/40/000000/canadian-dollar.png"/>`
            }
            else if(currency=="PLN")
            {
                document.getElementById('currency').innerHTML = `<img src="https://img.icons8.com/ios/40/000000/zloty.png"/>`
            }
            console.log(result)
            display.textContent= result.toFixed(4)
            display.style.visibility = 'visible'
        }
    }
}


// EUR,GBP,CAD,PLN



{/* <img src="https://img.icons8.com/ios/50/000000/canadian-dollar.png"/> */}
{/* <img src="https://img.icons8.com/dotty/50/000000/euro-pound-exchange.png"/> */}
{/* <img src="https://img.icons8.com/ios/50/000000/zloty.png"/> */}
{/* <img src="https://img.icons8.com/ios/50/000000/us-dollar.png"/> */}
{/* <img src="https://img.icons8.com/dotty/50/000000/british-pound.png"/> */}