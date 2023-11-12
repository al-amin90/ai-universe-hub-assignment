const loadUniverseData = async (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayUniverseData(data.data.tools, dataLimit);
}

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
        console.log(universe);
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
                            <div type="button" data-bs-toggle="modal" data-bs-target="#univers"><i class="fa-solid fa-arrow-right btn"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        aiUniverseCards.appendChild(aiUniverseDiv);
    });
}

const showMoreBtn = () => {
    loadUniverseData();
    showAll.classList.add('d-none');
}



loadUniverseData(6);