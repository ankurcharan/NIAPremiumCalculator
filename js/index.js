const bundled = document.getElementById('bundled');
const payears = document.getElementById('payears');
const compulsoryPAallow = document.getElementById('compulsoryPA');
const legalPerson = document.getElementById('legalPerson');
const paPerson = document.getElementById('paPerson');
const PACoverAmount = document.getElementById('PACoverAmount');
const engineCCInput = document.getElementById('engineCC');

// rates
const privateCarBasicRate = [
    [2072, 5286],
    [3221, 9534],
    [7890, 24305]
]
// variables
let engineCC = 0;
let compPA = 275;
let legalLiability = 0;
let countPAcoverPeople = 0;
let basicRate = 0;
let paCoverAmount = 0;

function showActOnly() {
    // d-none to hide in bootstrap
    $('#compulsoryPAform').addClass('d-none');
    if($('#compulsoryPA').is(":checked"))
        compPA = 275;
    else
        compPA = 0;
    $('#compulsoryPAamount').html(`&#x20b9; ${compPA}`);
}
function showBundled() {
    $('#compulsoryPAform').removeClass('d-none');

    const years = payears.value;
    compPA = 275 * years;
    $('#compulsoryPAamount').html(`&#x20b9; ${compPA}`);
}

function showBasicRateThirdParty() {
    let x = 0;
    if(engineCC <= 1000) {
        x = 0;
    } else if(engineCC <= 1500) {
        x = 1;
    } else {
        x = 2;
    }

    let y = 0;
    if(bundled.value === 'act_only') {
        y = 0;
    } else {
        y = 1;
    }

    console.log('Basic Rate: ', privateCarBasicRate[x][y]);
    basicRate = privateCarBasicRate[x][y];
    $('#basicRate').html(`Basic Rate: &#x20b9; ${privateCarBasicRate[x][y]}`);
}

function showSumThirdParty() {
    const sum = basicRate + compPA + legalLiability + paCoverAmount;
    $('#sumThirdParty').html(`Sum Third Party: &#x20b9; ${sum}`);
    const gst = 0.18 * sum;
    $('#sumThirdPartyGST').html(`GST: &#x20b9; ${gst}`);

    $('#sumThirdPartyTotal').html(`Total: &#x20b9; ${sum + gst}`);
}

engineCCInput.addEventListener('change', (e) => {
    console.log('engine cc: ', e.target.value);
    engineCC = parseInt(e.target.value);
    showBasicRateThirdParty();
    showSumThirdParty();
})

bundled.addEventListener('change', (event) => {
    
    console.log(typeof(event.target.value), event.target.value);
    if(event.target.value === 'act_only') {
        showActOnly();
    } else if(event.target.value === 'bundled') {
        if($('#compulsoryPA').is(":checked"))
            showBundled();
    }

    showBasicRateThirdParty();
    showSumThirdParty();
})

payears.addEventListener('change', (e) => {
    console.log('PA Years: ', e.target.value);
    const years = parseInt(e.target.value);
    compPA = 275 * years;
    $('#compulsoryPAamount').html(`&#x20b9; ${compPA}`);

    showSumThirdParty();
});

compulsoryPAallow.addEventListener('change', (e) => {
    console.log(e.target.value);
    console.log(typeof(e.target.value));

    if($('#compulsoryPA').is(":checked")) {
        
        if(bundled.value === 'act_only') {
            showActOnly();
        } else if(bundled.value === 'bundled') {
            showBundled();
        }
    } else {
        $('#compulsoryPAform').addClass('d-none');
        compPA = 0;
        $('#compulsoryPAamount').html(`&#x20b9; ${compPA}`);
    }
        
})

legalPerson.addEventListener('change', (e) => {
    console.log(e.target.value);
    legalLiability = parseInt(e.target.value) * 50;
    $('#legalLiabilityAmount').html(`LL Amount: &#x20b9; ${legalLiability}`);

    showSumThirdParty();
})

/////////////////////
// PA Cover
////////////////////
function showPACoverAmount() {
    let amount = (PACoverAmount.value / 100000) * countPAcoverPeople * 50;
    paCoverAmount = amount;
    $('#paCoverAmount').html(`PA Cover Amount: &#x20b9; ${amount}`)

    showSumThirdParty();
}

paPerson.addEventListener('change', (e) => {
    countPAcoverPeople = parseInt(e.target.value);
    console.log('countPAcoverPeople', countPAcoverPeople);
    showPACoverAmount();

    showSumThirdParty();
})

PACoverAmount.addEventListener('change', (e) => {
    showPACoverAmount();

    showSumThirdParty();
})