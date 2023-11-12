const loadUniverseData = async (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayUniverseData(data.data.tools, dataLimit);
}

const loader = document.getElementById('loader');
const displayUniverseData = (universes, dataLimit) => {
    const showAll = document.getElementById('show-all');
    if ( dataLimit && universes.length > 6) {
        universes = universes.slice(0, 6);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }

    const aiUniverseCards = document.getElementById('ai-universe-cards');
    aiUniverseCards.textContent = '';
    universes.forEach(universe => {
        console.log()
        const aiUniverseDiv = document.createElement('div');
        aiUniverseDiv.classList.add('col');
        aiUniverseDiv.innerHTML = `
            <div class="card h-100 p-4">
                <img src="${universe.image ? universe.image : ''}" class="card-img-top" alt="...">
                <div class="">
                    <h5 class="card-title text-heading mt-4">Features</h5>
                    <div class="text-paragraph">
                        <p class="text-paragraph">1. ${universe.features[0]}</p>
                        <p class="text-paragraph">2. ${universe.features[1]}</p>
                        <p class="text-paragraph">3. ${universe.features[2]}</p>
                    </div>
                    <hr>
                    <div>
                        <h5 class="card-title text-heading mt-4">${universe.name}</h5>
                        <div class="d-flex justify-content-between">
                            <div class="d-flex align-items-center">
                                <i class="fa-solid fa-calendar-days"></i>
                                <p class="text-paragraph m-2">${universe.published_in}</p>
                            </div>
                            <div onclick="loadDetails('${universe.id}')" type="button" data-bs-toggle="modal" data-bs-target="#univers"><i class="fa-solid fa-arrow-right btn"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        aiUniverseCards.appendChild(aiUniverseDiv);
        loader.classList.add('d-none');
    });
}

const showMoreBtn = () => {
    loadUniverseData();
}

const loadDetails = async(id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.data);
}


const displayDetails = (data) => {
    console.log(data.pricing? data.pricing[0].price : 'Free of Cost/Basic');
    const modalBody = document.getElementById('modal-body');
    modalBody.textContent = '';
    const modalDiv = document.createElement('div');
    modalDiv.classList.add('d-md-flex', 'gap-3');
    modalDiv.innerHTML = `
        <div class="card border-danger mb-3 w-100">
            <div class="card-body modal-card-left">
                <h5 class="text-heading">${data.description}</h5>
                <div class="d-flex text-center">
                    <h5 class="subcrition-card text-success">${data.pricing ? data.pricing[0].price : 'Free of Cost/'} Basic</h5>
                    <h5 class="subcrition-card text-warning">${data.pricing ? data.pricing[1].price : 'Free Of Cost/'} Pro</h5>
                    <h5 class="subcrition-card text-danger">${data.pricing ? data.pricing[2].price : 'Free of Cost /'} Enterprise</h5>
                </div>
                <div class="d-flex justify-content-between">
                    <div>
                        <h5 class="text-heading">Features</h5>
                        <ul class="text-paragraph">
                            <li>${data.features[1].feature_name}</li>
                            <li>${data.features[2].feature_name}</li>
                            <li>${data.features[3].feature_name}</li>
                        </ul>
                    </div>
                    <div>
                        <h5 class="text-heading">Integrations</h5>
                        <ul class="text-paragraph">
                            <li>${data.integrations? data.integrations[0] : 'No data Found'}</li>
                            <li>${data.integrations? data.integrations[1] : 'No data Found'}</li>
                            <li>${data.integrations? data.integrations[2] : 'No data Found'}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="card border-secondary mb-3 w-100">
            <div class="card-body text-secondary text-center">
                <img class="img-fluid" src="${data.image_link[0]}" alt="">
                <h5 class="text-heading mt-3">${data.input_output_examples ? data.input_output_examples[0].input : 'Can you give any example?' }</h5>
                <p class="card-text">${data.input_output_examples ? data.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
            </div>
        </div>
    `;
    modalBody.appendChild(modalDiv);
    loader.classList.add('d-none');
}



loader.classList.remove('d-none');
loadUniverseData(6);