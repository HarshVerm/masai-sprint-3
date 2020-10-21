var curr = ""
window.addEventListener('load' , function(){
    let form = document.querySelector('form')
    form.addEventListener('submit', getData)
    let forex = document.getElementById('forexbtn')
    forex.addEventListener('click', function(){
        if(curr != "")
        {
            chart()            
        }
    })

    let close = document.querySelector('#close-icon')
    close.addEventListener('click', function(){
        document.getElementById('modal').style.display = 'none'
    })
})

// get form data

function getData()
{

    event.preventDefault()
    console.log(event.target)
    
    let form = new FormData(event.target)
    let dollar = Number(form.get('usd'))
    let currency = form.get('currency')
    curr = currency
    console.log(dollar, currency)  

    let display = document.querySelector('h2')
    // print error if doent enter any value in input
    if(dollar == 0 )
    {
        
        document.querySelector('#usd-error').style.display = "block"
        setTimeout(() => {
            document.querySelector('#usd-error').style.display = "none"    
        }, 4000);
    }
    //print error if doent select any option
    else if( currency == "")
    {
        
        document.querySelector('#error').style.display = "block"
        setTimeout(() => {
            document.querySelector('#error').style.display = "none"    
        }, 4000);
    }
    // if form is not empty make api call
    else
    {
        let forex = document.getElementById("forexbtn")
        if(forex.style.display !=  'block')
        {
            forex.style.display =  'block'
        }
        let xhr = new XMLHttpRequest()
        xhr.open('GET', `http://apilayer.net/api/live?access_key=20816841d86113ab8f5088ec9bc41102&currencies=${currency}&source=USD&format=1`)
        xhr.send()
        //onload function for get response
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

            //display currency
            
            document.getElementById('currency').innerHTML = `USD <img src="https://img.icons8.com/material-rounded/18/000000/arrow.png"/> ${currency}`
            
            console.log(result)
            display.textContent= result.toFixed(2)
            
        }
    }

    
}


function chart()
{
    let dis= document.getElementById('modal')
    dis.style.display = 'block'
    dis.style.height = "100%"
    dis.style.width = "100%"
    new TradingView.widget(
                        {
                        "width": 700,
                        "height": 500,
                        "symbol": `USD${curr}`,
                        "interval": "D",
                        "timezone": "Etc/UTC",
                        "theme": "light",
                        "style": "1",
                        "locale": "in",
                        "toolbar_bg": "#f1f3f6",
                        "enable_publishing": false,
                        "allow_symbol_change": true,
                        "container_id": "tradingview_de59d"
                        }  
                        ); 
}

