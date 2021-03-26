import { getMovie, likeMovie, deleteMovie } from "../api/data.js";
import { html } from "../../node_modules/lit-html/lit-html.js";

const detailsTemplate = (movie, onDelete, onLike) => html`
<div class="container">
    <div class="row bg-light text-dark">
        <h1>Movie title: ${movie.name}</h1>

        <div class="col-md-8">
            <img class="img-thumbnail" src=${movie.imageUrl} alt="Movie">
        </div>
        <div class="col-md-4 text-center">
            <h3 class="my-3 ">Movie Description</h3>
            <p>${movie.description}</p>
            ${sessionStorage.getItem('userId') == movie._ownerId ? html`
            <div>
                <a class="btn btn-danger" href="javascript:void(0)" @click=${onDelete}>Delete</a>
                <a class="btn btn-warning" href="/edit/${movie._id}">Edit</a>
                <span class="enrolled-span">Liked ${movie.likes.length}</span>
            </div>
            `: ''}
            ${movie.likes.includes(sessionStorage.getItem('userId')) ? html`
            <div>
                <span class="enrolled-span">Liked ${movie.likes.length}</span>
            </div>
            `: (sessionStorage.getItem('userId') !== movie._ownerId)?
            html`<div><a class="btn btn-primary" href="javascript:void(0)" @click=${onLike}>Like</a></div>`
        : ''}
        </div>
    </div>
</div>
`

export async function movieDetails(ctx) {
    const id = ctx.params.id
    const movie = await getMovie(id)
    ctx.render(detailsTemplate(movie, onDelete,onLike))
    async function onDelete() {
        if (confirm('Are you sure?')) {
            await deleteMovie(id)
            ctx.page.redirect('/movies')
        }
    }
    async function onLike(){
        await likeMovie(id)
        const movieLiked=await getMovie(id)
        ctx.render(detailsTemplate(movieLiked,onDelete,onLike))
    }
}