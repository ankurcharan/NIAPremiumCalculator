function heyy()
{
    if( $('#compulsoryPA').is(":checked") )
        console.log('vv');
    else
        console.log('aa');

    if($('#bundled').prop('selectedIndex') == 0)
        $('#xx').html('275');
    else if($('#bundled').prop('selectedIndex') == 1)
    {
        let option = `
        <div class="form-group">
            <label for="years">Act Only/Bundled</label>
            <select class="form-control" id="years">
            <option>1</option>
            <option>2</option>
            <option selected>3<option>
            </select>
        </div>
        `;

        $('#xx').html(option);
        $('#xx').append('<label>275 * option</label>');
    }
}