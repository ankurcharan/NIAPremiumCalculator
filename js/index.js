const bundled = document.getElementById('bundled');
const payears = document.getElementById('payears');
const compulsoryPAallow = document.getElementById('compulsoryPA');

// variables
let engineCC = 0;
let compPA = 275;

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

bundled.addEventListener('change', (event) => {
    
    console.log(typeof(event.target.value), event.target.value);
    if(event.target.value === 'act_only') {
        showActOnly();
    } else if(event.target.value === 'bundled') {
        if($('#compulsoryPA').is(":checked"))
            showBundled();
    }
})

payears.addEventListener('change', (e) => {
    console.log('PA Years: ', e.target.value);
    const years = parseInt(e.target.value);
    compPA = 275 * years;
    $('#compulsoryPAamount').html(`&#x20b9; ${compPA}`);
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