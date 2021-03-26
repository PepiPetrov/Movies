import { getMovies } from "../api/data.js";
import { html } from "../../node_modules/lit-html/lit-html.js";

const catalog = (data, onSearch) => html`
<div>
    <div class="jumbotron jumbotron-fluid text-light" style="background-color: #343a40;">
        <img src="https://s.studiobinder.com/wp-content/uploads/2019/06/Best-M-Night-Shyamalan-Movies-and-Directing-Style-StudioBinder.jpg"
            class="img-fluid" alt="Responsive image">
        <h1 class="display-4">Movies</h1>
        <p class="lead">Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.</p>
    </div>
    <h1 class="text-center">Movies</h1>
    <section>
        <a href="/add" class="btn btn-warning ">Add Movie</a>
        <form class="search float-right" @submit=${onSearch}>
            <label>Search: </label>
            <input type="text" name="val">
            <input type="submit" class="btn btn-info" value="Search">
        </form>
    </section>
</div>
<div class=" mt-3 ">
    <div class="row d-flex d-wrap">

        <div class="card-deck d-flex justify-content-center">
            ${data.length>0?data.map(movieCard):'No movies...'}
        </div>
    </div>
</div>`

const movieCard = (movie) => html`
<div class="card mb-4">
    <img class="card-img-top" src="${movie.imageUrl}" alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">${movie.name}</h4>
    </div>
    <div class="card-footer">
        <a href="/details/${movie._id}"><button type="button" class="btn btn-info">Details</button></a>
    </div>

</div>
`

export async function moviesPage(ctx) {
    const movies = await getMovies()
    ctx.render(catalog(movies,onSearch))
    async function onSearch(e) {
        e.preventDefault()
        const val = new FormData(e.target).get('val')
        const filtered=movies.filter(x=>x.name.includes(val))
        ctx.render(catalog(filtered,onSearch))
    }
}