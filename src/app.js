import page from '../node_modules/page/page.mjs'
import { render } from '../node_modules/lit-html/lit-html.js'
import { logout, login } from './api/data.js'
import { homePage } from './views/home.js'
import { moviesPage } from './views/movies.js'
import { movieDetails } from './views/details.js'
import { createPage } from './views/create.js'
import { editPage } from './views/edit.js'
import { loginPage, registerPage } from './views/auth.js'

setupNav()
page("/", context, homePage)
page('/movies', context, moviesPage)
page('/details/:id', context, movieDetails)
page('/add', context, createPage)
page('/edit/:id', context, editPage)
page('/login', context, loginPage)
page('/register', context, registerPage)

page.start()
window.login = login

document.getElementById('logoutBtn').addEventListener('click', async e => {
    await logout()
    setupNav()
})

function context(ctx, next) {
    ctx.render = (content) => render(content, document.querySelector('main'))
    ctx.setupNav = setupNav
    next()
}

function setupNav() {
    if (sessionStorage.getItem('userId')) {
        document.getElementById('user').style.display = 'block'
        document.getElementById('guest').style.display = 'none'
        document.getElementById('welcome').textContent = `Welcome, ${sessionStorage.getItem('username')}`
    } else {
        document.getElementById('guest').style.display = 'block'
        document.getElementById('user').style.display = 'none'
    }
}