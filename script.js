const APIURL = 'https://api.github.com/users/'

getUser('ofuygo');

const form = document.getElementById('form')
const main = document.getElementById('main')
const search = document.getElementById('search')

async function getUser(username) {
    try {
const { data } = await axios(APIURL + username)
    createUserCard(data)
    }
    catch(err){
            createErrorCard('No Profile with this user')
    }
}

function createErrorCard(msg) {
    const cardTHML = ` <div class="card>
       <h1>${msg}</h1>
       </div>
     `

     main.innerHTML = cardTHML
    
}

function createUserCard(user) {
    const cardHTML = ` <div class="card">
    <div>
        <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
    </div>
    <div class="user-info">
        <h2>${user.name}</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam, recusandae?</p>
        <ul>
            <li>${user.followers}<strong>followers</strong></li>
            <li>${user.following}<strong>following</strong></li>
            <li>${user.public_repos}<strong>Repos</strong></li>
        </ul>
        <div id="repos"></div>
    </div>
</div>`
main.innerHTML = cardHTML
 
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos')

    repos 
    .slice(0, 10)
    .forEach(e => {
        const repoEl =document.createElement('a')
        repoEl.classList.add('repo')
        repoEl.href = e.html-url
        repoEl.target = '_blank'
        repoEl.innerText = e.name
        repoEl.appendChild(repoEl)
    });
}

async function getRepos(username) {
    try {
        const { data } = await axios(APIURL + username + 'repos?sort=crated')
            addReposToCard(data);

            }
        
            catch(err){
                    createErrorCard('problem fetching repos')
            }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const user = search.value
    if (user){
        getUser(user)
        search.value = ''
    }
})
