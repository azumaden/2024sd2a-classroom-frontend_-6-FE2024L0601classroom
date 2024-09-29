// index.htmlのキャラクターリストエリアのHTML要素を操作するため、変数として取得する
const characterList = document.getElementById("character-list");

// キャラクター紹介の原稿の配列データ（オブジェクトの配列）
const characters = [
    {
        name: "テップ",
        description: "いつも明るく元気なテップ。仲間を思いやる優しい心の持ち主。",
        image: "./img/テップ.png"
    },
    {
        name: "ヂィール",
        description: "ちょっぴりおっちょこちょいだけど、友情を大切にするヂィール。",
        image: "./img/ヂィール.png"
    },
    {
        name: "クラリリス",
        description: "ナイトクラブの歌姫。テップとヂィールの憧れのマドンナ。",
        image: "./img/クラリリス.png"
    }
];

// キャラクター紹介の原稿の配列データの要素数分、ループをする
for(let i=0; i<characters.length; i++){
    const card = document.createElement("div");
    card.classList.add("col-sm-4");
    let character = characters[i];
    card.innerHTML = `
        <div class="card character-card" id="card_${i}">
            <img src="${character.image}" class="card-img-top character-img" alt="${character.name}">
            <div class="card-body">
                <h5 class="card-title">${character.name}</h5>
                <p class="card-text">${character.description}</p>
            </div>
        </div>
    `;
    characterList.appendChild(card);
}

// characters.forEach(character => {
//     const card = document.createElement("div");
//     card.classList.add("col-md-4");
//     card.innerHTML = `
//         <div class="card character-card">
//             <img src="${character.image}" class="card-img-top character-img" alt="${character.name}">
//             <div class="card-body">
//                 <h5 class="card-title">${character.name}</h5>
//                 <p class="card-text">${character.description}</p>
//             </div>
//         </div>
//     `;
//     characterList.appendChild(card);
// });