import * as api from './api.js';


const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getMovies() {
    const teams = Object.values(await api.get(host + '/jsonstore/movies'))
    return teams;
}

export async function getMovie(id) {
    return await api.get(host + '/jsonstore/movies/' + id);
}

export async function createMovie(article) {
    return await api.post(host + '/jsonstore/movies', article);
}

export async function editMovie(id, article) {
    return await api.put(host + '/jsonstore/movies/' + id, article);
}

export async function deleteMovie(id) {
    return await api.del(host + '/jsonstore/movies/' + id);
}

// export async function getMyArticles(){
//     const userId=sessionStorage.getItem('userId')
//     const data=await api.get(host+`/data/movies?where=_ownerId%3D%22${userId}%22`)
//     return data
// }

export async function likeMovie(movieId) {
    const movie = await getMovie(movieId)
    movie.likes.push(sessionStorage.getItem('userId'))
    await editMovie(movieId, movie)
}