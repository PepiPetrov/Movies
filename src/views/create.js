import { html } from "../../node_modules/lit-html/lit-html.js";
import { createMovie } from "../api/data.js";

const template = (onSubmit) => html`
<form class="text-center border border-light p-5" @submit=${onSubmit}>
    <h1>Add Movie</h1>
    <div class="form-group">
        <label for="title">Movie Title</label>
        <input type="text" class="form-control" placeholder="Title" name="title" value="">
    </div>
    <div class="form-group">
        <label for="description">Movie Description</label>
        <textarea class="form-control" placeholder="Description" name="description"></textarea>
    </div>
    <div class="form-group">
        <label for="imageUrl">Image url</label>
        <input type="text" class="form-control" placeholder="Image Url" name="imageUrl" value="">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
`

export function createPage(ctx) {
    ctx.render(template(onSubmit))
    async function onSubmit(e) {
        e.preventDefault()
        const [name, description, imageUrl] = [...new FormData(e.target).entries()].map(x => x[1])
        const movie = { name, description, imageUrl }
        movie._ownerId = sessionStorage.getItem('userId')
        movie.likes=[]
        if (name == '' || description == '' || imageUrl == '') {
            return alert('All fields are required!')
        }
        const { _id } = await createMovie(movie)
        ctx.page.redirect('/details/' + _id)
    }
}