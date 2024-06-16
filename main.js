const bill = document.getElementById('inp-bill');  //bill amount
const serviceTip = document.getElementById('serviceTip'); //service tips
const customInput = document.getElementById('custom'); //custom tip
const peopleInput = document.getElementById('peopleInput'); //number of people
const tipAmountSpan = document.getElementById('tip-amount');
const totalAmountSpan = document.getElementById('total-amount');
const resetButton = document.getElementById('btnreset');

let billVal = '';
let peopleVal = 1;
let selectedTip = 0.15;  //DEFAULT TIP PERCENTAGE (15%)



  const inputChecker = el => {
    let billAmount = 0;
    let peopleAmount = 0;
    let tipAmount = 0;

    el.addEventListener('input', function() {
        const twoDecimalPlaces = /^\d*\.?\d{0,2}$/;
        const onlyNumbers = /^[0-9]*$/

        if (this.id === 'inp-bill' || this.id === 'custom-tip') {
            if (this.value.match(twoDecimalPlaces)) {
                if (this.id === 'inp-bill') {
                    billAmount = Number(this.value)
                } else {
                    tipAmount = Number(this.value)
                }
            } else {
                if (this.id === 'inp-bill') {
                    this.value = billAmount
                } else {
                    this.value = tipAmount
                }
            }
        } else {
            if (this.value.match(onlyNumbers)) {
                peopleAmount = Number(this.value)
            } else {
                this.value = peopleAmount
            }
        }
    });
};

 



//FUNCTION TO CALCULATE TIP AND TOTAL AMOUNT

function calculateTip() {
    
    const billAmount = parseFloat(bill.value);
   // console.log("Bill amount:", billAmount);
    const tipPercentage = selectedTip;
    const customTipValue = parseFloat(customInput.value) || 0;
    const numberOfPeople = Math.max(1, parseInt(peopleInput.value)); //ENSURE AT LEAST 1 PERSON
    

    const tipAmount = (billAmount * tipPercentage) / numberOfPeople;
    const totalAmount = tipAmount + (billAmount / numberOfPeople);
    
   // console.log(tipAmount);

    //UPDATE DISPLAYED VALUES WITH TWO DECIMAL PLACES

    tipAmountSpan.textContent = `$${tipAmount.toFixed(2)}`;
    totalAmountSpan.textContent = `$${totalAmount.toFixed(2)}`;

    //UPDATE PER PERSON AMOUNT IF THERE ARE MULTIPLE PEOPLE


    if (numberOfPeople > 1) {
        tipAmountSpan.textContent += ` `;
        totalAmountSpan.textContent += ` `;
    }else {
        tipAmountSpan.textContent = tipAmountSpan.textContent.replace(' / person', '');
        totalAmountSpan.textContent = totalAmountSpan.textContent.replace(' / person', '');
    }
   
}




serviceTip.querySelectorAll('.service button').forEach(button => {
    button.addEventListener('click', () => {
        selectedTip = parseFloat(button.textContent.replace('%', '')) / 100;

//REMOVE ACTIVE-BTN CLASS FROM ALL OTHER SERVICE ELEMENTS USING SPREAD SYNTAX(...)

 //  serviceTip.querySelectorAll('.service').forEach(service => service.classList.remove('active'));

//TARGET THE PARENT ELEMENT OF THE CLICKED BUTTON AND ADD ACTIVE-BTN CLASS

 //  button.parentElement.classList.add('active');  
         
          calculateTip();  
    });
   
});

//ADD INPUT EVENTLISTENER TO CUSTOM INPUT
//TO ADD REMOVE ACTIVE CLASS

const service = document.getElementById("serviceTip");

const serviceBtn = document.getElementsByClassName("service");

for (let i = 0; i < serviceBtn.length; i++) {
    serviceBtn[i].addEventListener("click", function() {
      let current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  } 



customInput.addEventListener('input', () => {
   //console.log('new input value:', customInput.value);
    const customTip = parseFloat(customInput.value /100) ;//|| 0;
    selectedTip = customTip;
    
   // serviceTip.querySelector('.active button').classList.remove('active');

    calculateTip();
    // console.log(selectedTip);
});

//ADD INPUT EVENT LISTENER TO NUMBER OF PEOPLE INPUT

peopleInput.addEventListener('input', () => {
    const numberOfPeople = Math.max(1, parseInt(peopleInput.value));
    peopleInput.value = numberOfPeople;

  /*  const errorMsg = document.querySelector('.error-msg');
    if (numberOfPeople === 0) {
        errorMsg.style.display = 'block';
    }else {
        errorMsg.style.display = 'none';
        
    }*/

    calculateTip();
});


//ADD CLICK EVENT LISTENER TO RESET BUTTON

resetButton.addEventListener('click', () => {
    bill.value = '';
    selectedTip = 0.15;
    customInput.value = '';
    peopleInput.value = '';
    tipAmountSpan.textContent = '$0.00';
    totalAmountSpan.textContent = '$0.00';
   
    serviceTip.querySelector('.service.active').classList.remove('active');
    serviceTip.querySelector('.service:nth-child(3)').classList.add('active'); //RESET TO 15%

   // console.log();
    //calculateTip();
});
     

