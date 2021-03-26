import { html } from "../../node_modules/lit-html/lit-html.js";
import { login, register } from "../api/data.js";

const loginTemplate = (onSubmit) => html`
<form class="text-center border border-light p-5" @submit=${onSubmit}>
    <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" placeholder="Email" name="email" value="">
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" placeholder="Password" name="password" value="">
    </div>

    <button type="submit" class="btn btn-primary">Login</button>
</form>
`
export async function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmit))
    async function onSubmit(e) {
        e.preventDefault()
        const [email, password] = [...new FormData(e.target).entries()].map(x => x[1])
        if (email == '' || password == '') {
            return alert('All fields are required!')
        }
        await login(email, password)
        ctx.setupNav()
        ctx.page.redirect('/movies')
    }
}

const registerTemplate = (onSubmit) => html`

<form class="text-center border border-light p-5" @submit=${onSubmit}>
    <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" placeholder="Email" name="email" value="">
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" placeholder="Password" name="password" value="">
    </div>

    <div class="form-group">
        <label for="repeatPassword">Repeat Password</label>
        <input type="password" class="form-control" placeholder="Repeat-Password" name="repeatPassword" value="">
    </div>

    <button type="submit" class="btn btn-primary">Register</button>
</form>
`

export async function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit))
    async function onSubmit(e) {
        e.preventDefault()
        const [email, password, repeatPassword] = [...new FormData(e.target)].map(x => x[1])
        if (email == '' || password == '') {
            return alert('All fields are required!')
        }
        if (password !== repeatPassword) {
            return alert("Passwords don't match!")
        }
        await register(email,password)
        ctx.setupNav()
        ctx.page.redirect('/movies')
    }
}