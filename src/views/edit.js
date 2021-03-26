import { html } from "../../node_modules/lit-html/lit-html.js";
import { editMovie, getMovie } from "../api/data.js";

const template = (movie, onSubmit) => html`
<form class="text-center border border-light p-5" @submit=${onSubmit}>
    <h1>Edit Movie</h1>
    <div class="form-group">
        <label for="title">Movie Title</label>
        <input type="text" class="form-control" placeholder="Movie Title" .value=${movie.name} name="title">
    </div>
    <div class="form-group">
        <label for="description">Movie Description</label>
        <textarea class="form-control" placeholder="Movie Description..." name="description"
            .value=${movie.description}></textarea>
    </div>
    <div class="form-group">
        <label for="imageUrl">Image url</label>
        <input type="text" class="form-control" placeholder="Image Url" .value=${movie.imageUrl} name="imageUrl">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
`


export async function editPage(ctx) {
    const id = ctx.params.id
    const movie = await getMovie(id)
    ctx.render(template(movie, onSubmit))
    async function onSubmit(e) {
        e.preventDefault()
        const [name,description,imageUrl]=[...new FormData(e.target).entries()].map(x=>x[1])
        const movieObj={name,description,imageUrl}
        movieObj._ownerId=movie._ownerId
        movieObj.likes=movie.likes
        if(name==''||description==''||imageUrl==''){
            return alert('All fields are required!')
        }
        await editMovie(id,movieObj)
        ctx.page.redirect('/details/'+id)
    }
}