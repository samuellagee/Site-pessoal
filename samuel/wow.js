document.addEventListener('DOMContentLoaded', function () {
    // Função para carregar perfil do GitHub
    function carregarPerfil() {
        fetch('https://api.github.com/users/samuellagee')
            .then(response => response.json())
            .then(data => {
                // Atualiza elementos no DOM com informações do perfil
                document.querySelector('.perfilText').textContent = data.bio;
                document.querySelector('.localizacao').innerHTML = `Localização: <a href="#">${data.location}</a>`;
            })
            .catch(error => console.error('Erro ao carregar perfil:', error));
    }

    // Função para carregar repositórios do GitHub
    function carregarRepositorios() {
        fetch('https://api.github.com/users/samuellagee/repos')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Limpa o conteúdo atual
                document.getElementById('repoCards').innerHTML = '';

                // Itera sobre os repositórios e cria cards para cada um
                data.forEach(repo => {
                    const card = `
                        <div class="col-md-3 col-sm-6 mb-4">
                            <div class="card h-100">
                                <a href="repo.html?name=${repo.name}"><img src="https://via.placeholder.com/150" alt="${repo.name}" /></a>
                                <div class="card__content">
                                    <a href="${repo.html_url}" class="card__title">${repo.name}</a>
                                    <p class="card__description">${repo.description}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    document.getElementById('repoCards').innerHTML += card;
                });
            })
            .catch(error => console.error('Erro ao carregar repositórios:', error));
    }

    const apiUrl = 'https://f43181e3-7144-4ced-b3c1-a0f1eaf7991b-00-2v3nodzmciug6.picard.replit.dev/colegas';

    // Função para carregar os dados dos colegas
    async function carregarColegas() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Erro ao carregar dados dos colegas');
            }
            const data = await response.json();

            // Seleciona o container onde os cards de colegas serão inseridos
            const colegasContainer = document.querySelector('.row.colegas');

            // Itera sobre os colegas e cria os cards dinamicamente
            data.forEach(colega => {
                const cardHTML = `
                    <div class="col-md-3 col-sm-6 mb-4 mx-5">
                        <div class="card h-100">
                            <img src="${colega.image}" alt="${colega.name}" />
                            <div class="card__content">
                                <a href="${colega.github}" class="card__title">${colega.name}</p>
                            </div>
                        </div>
                    </div>
                `;
                colegasContainer.innerHTML += cardHTML;
            });
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    // URL do JSON com os vídeos sugeridos
    const sugestoesURL = 'https://f43181e3-7144-4ced-b3c1-a0f1eaf7991b-00-2v3nodzmciug6.picard.replit.dev/sugestoes';

    // Função para carregar os vídeos sugeridos
    async function carregarVideosSugeridos() {
        try {
            const response = await fetch(sugestoesURL);
            const data = await response.json();

            // Limpar os slides existentes
            const slidesContainer = document.querySelector('.inner.carrosel');
            slidesContainer.innerHTML = '';

            // Iterar sobre os vídeos e criar os slides
            data.forEach((video, index) => {
                const slide = document.createElement('div');
                slide.classList.add('slide', `slide_${index + 1}`);
                slide.innerHTML = `
                <div class="slide-content">
                    <iframe width="914" height="514" src="https://www.youtube.com/embed/${video.videoId}" title="${video.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            `;
                slidesContainer.appendChild(slide);
            });

        } catch (error) {
            console.error('Erro ao carregar vídeos sugeridos:', error);
        }
    }

    // Chamar a função para carregar os vídeos sugeridos ao carregar a página
    carregarVideosSugeridos();


    // Chama as funções para carregar perfil e repositórios
    carregarPerfil();
    carregarRepositorios();
    carregarColegas();
});
