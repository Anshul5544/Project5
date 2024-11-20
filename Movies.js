let cards = document.querySelector('.cards');
let json_url = "Movies.json";

fetch(json_url).then(Response => Response.json())
.then((data) => {
    data.forEach((elec,i) => {
        let {name, poster, cover, imdb1, url} = elec;

        let card = document.createElement('a');
        card.classList.add('card');
        card.href = url;
        card.innerHTML = `
        <img decoding="async" src="${poster}" alt="" class="poster">

        <div class="cover">
            <img decoding="async" src="${cover}" alt="">

            <div class="cont">
                <div class="info">
                    <h4>${name}</h4>
                    <p class="imdb"><i class="ri-star-s-fill"></i> <span>${imdb1}</span>/10</p>
                </div>

                <div class="play-btn">
                    <i class="ri-play-line"></i>
                </div>
            </div>
        </div>
        `

        cards.appendChild(card);
    });
});