$(document).ready(getCupcakes())

function getCupcakeHtml(cupcake) {
    //makes HTML for cupcake li
    return $(`<div data-cupcake-id=${cupcake.id}>
    <li class='list-group-item d-flex justify-content-between align-items-center'>
    ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}</li>
    <img class="Cupcake-img"
    src="${cupcake.image}"
    alt="(no image provided)">
    </div>`)

}

async function getCupcakes() {
    //shows all cupcakes
    let cupcakes = await axios.get('/api/cupcakes');
    const $cupcakeList = $("ul");
    for (let cupcake of cupcakes.data.cupcakes) {

        // let $newLi = $("<li>")
        // $newLi.html(cupcake.flavor)
        // $newLi.addClass("list-group-item d-flex justify-content-between align-items-center")
        $cupcakeList.append(getCupcakeHtml(cupcake))
    }
};

$('.add-cupcake').click(addCupcake)

async function addCupcake() {
    //adds a new cupcakes and updates the page
    const flavor = $('#flavor').val()
    const size = $('#size').val()
    const rating = $('#rating').val()
    const image = $('#image').val()
    await axios.post('/api/cupcakes', {
        flavor, size, rating, image
    })
    await getCupcakes();
}
