const bundled = document.getElementById('bundled');
const payears = document.getElementById('payears');
const compulsoryPAallow = document.getElementById('compulsoryPA');
const legalPerson = document.getElementById('legalPerson');
const paPerson = document.getElementById('paPerson');
const PACoverAmount = document.getElementById('PACoverAmount');
const engineCCInput = document.getElementById('engineCC');
// Package 
const packageAge = document.getElementById('age');
const zone = document.getElementById('zone');
const IDVvalue = document.getElementById('IDVvalue');
const discountPackage = document.getElementById('discountPackage');
const ncb = document.getElementById('ncb');
const towingCover = document.getElementById('towingCover');
// Package Ends

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
let sumThirdParty = 0;

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
    $('#basicRate').html(`&#x20b9; ${privateCarBasicRate[x][y]}`);
}

function showSumThirdParty() {
    sumThirdParty = basicRate + compPA + legalLiability + paCoverAmount;
    $('#sumThirdParty').html(`&#x20b9; ${sumThirdParty}`);
    const gst = 0.18 * sumThirdParty;
    $('#sumThirdPartyGST').html(`&#x20b9; ${gst}`);

    $('#sumThirdPartyTotal').html(`&#x20b9; ${sumThirdParty + gst}`);
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
    showLegalLiability();
    showPACoverAmount();
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

function showLegalLiability() {
    legalLiability = parseInt(legalPerson.value) * 50;
    if(bundled.value === 'bundled') {
        legalLiability = legalLiability * 3;
    }
    $('#legalLiabilityAmount').html(`&#x20b9; ${legalLiability}`);
    showSumThirdParty();
}
legalPerson.addEventListener('change', () => {
    showLegalLiability();
})

/////////////////////
// PA Cover
////////////////////
function showPACoverAmount() {
    let amount = (PACoverAmount.value / 100000) * countPAcoverPeople * 50;
    paCoverAmount = amount;
    if(bundled.value === 'bundled') {
        paCoverAmount = paCoverAmount * 3;
    }
    $('#paCoverAmount').html(`&#x20b9; ${paCoverAmount}`)

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










//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
////////////// PACKAGE ///////////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

let basicPremium = 0;
let discount = 0;
let discPrem = 0;
let towingCharges = 0;
let sumPack = 0;
let ncbPremium = 0;

function getPackageRate() {
    // (zone, cc, age)
    const ownDamagePremiumRate = [
        [
            [3.127, 3.283, 3.362],
            [3.283, 3.447, 3.529],
            [3.440, 3.612, 3.698]
        ],
        [
            [3.039, 3.191, 3.267],
            [3.191, 3.351, 3.430],
            [3.343, 3.510, 3.594]
        ]
    ];

    let x = 0;
    if(engineCC <= 1000) {
        x = 0;
    } else if(engineCC <= 1500) {
        x = 1;
    } else {
        x = 2;
    }

    let y = age.value;

    return ownDamagePremiumRate[zone.value][x][y];
}

function showPackageRate() {
    const x = getPackageRate();
    $('#packageRate').html(`${x}%`);

    showBasicPremium();
}

packageAge.addEventListener('change', (e) => {
    console.log('Age: ', e.target.value);
    showPackageRate();
});

zone.addEventListener('change', () => {
    showPackageRate();
});

engineCCInput.addEventListener('change', () => {
    showPackageRate();
});

function showBasicPremium() {
    const rate = getPackageRate() / 100;
    const idv = parseInt(IDVvalue.value);

    basicPremium = rate * idv;
    $('#basicPrem').html(`&#x20b9; ${basicPremium}`);  
    
    showDiscountPremium();
}

IDVvalue.addEventListener('change', () => {
    showPackageRate();
    showBasicPremium();
})
function showDiscountPremium() {
    // discount = parseFloat(discountPackage.value);
    discPrem = (100 - discount) / 100 * basicPremium;
    $('#discountPremium').html(`&#x20b9; ${discPrem}`)
    showNCBPremium();
}
discountPackage.addEventListener('change', (e) => {
    discount = parseFloat(e.target.value);
    showDiscountPremium();
});
function showNCBPremium() {
    const ncbVal = parseFloat(ncb.value);
    let ncbDisc = discPrem * ncbVal / 100;
    ncbPremium = discPrem * (100 - ncbVal) / 100;
    $('#ncbDiscount').html(`&#x20b9; ${ncbDisc}`)
    $('#ncbPremium').html(`&#x20b9; ${ncbPremium}`);

    showPackageSum();
}
ncb.addEventListener('change', (e) => {
    showNCBPremium();
})

towingCover.addEventListener('change', (e) => {
    towingCharges = parseInt(e.target.value);
    $('#towingCharges').html(`&#x20b9; ${towingCharges}`);
    showPackageSum();
})

function showPackageSum() {
    sumPack = ncbPremium + towingCharges;
    $('#sumPackage').html(`&#x20b9; ${sumPack}`);
    let summ = sumPack + sumThirdParty
    $('#sumThirdPackage').html(`&#x20b9; ${summ}`);
    let gstSum = 0.18 * summ;
    $('#packageGST').html(`&#x20b9; ${gstSum}`);
    let sumTotal = summ + gstSum;
    $('#packageTotal').html(`&#x20b9; ${sumTotal}`);
}
