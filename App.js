const loadDataOfApi = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data, dataLimit);
}
const displayData = (data, dataLimit) => {
    const cadrContainer = document.getElementById('cadr-container');
    cadrContainer.innerHTML = '';
    const ShowBtn = document.getElementById('Show-all');
    if (dataLimit && data.length > 10) {
        data = data.slice(0, 9);
        ShowBtn.classList.remove('d-none')
    }
    else {
        ShowBtn.classList.add('d-none')
    }
    const messege = document.getElementById('messege');
    if (data.length === 0) {
        messege.classList.remove('d-none');
    }
    else {
        messege.classList.add('d-none')
    }
    data.forEach(phone => {
        const col = document.createElement('div');
        col.classList.add('col');
        col.innerHTML = `
                <div class="card">
                  <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.slug}</p>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="loadPhoneDetels('${phone.slug}')">
                    See Phone Detels
                    </button>
                  </div>
                </div>
                `
        cadrContainer.appendChild(col);
    });
    togolLoderH(false);
}
function searchProssecc(dataLimit) {
    togolLoderH(true)
    const inputfuildText = document.getElementById('search-fuild').value;
    loadDataOfApi(inputfuildText, dataLimit)
}
document.getElementById('search-btn').addEventListener('click', function () {
    searchProssecc(10)
})
document.getElementById('Show-btn').addEventListener('click', function () {
    searchProssecc()
})
const togolLoderH = isLoding => {
    const loder = document.getElementById('loder');
    if (isLoding === true) {
        loder.classList.remove('d-none');
    }
    else {
        loder.classList.add('d-none');
    }
}
const loadPhoneDetels = async(id) =>{
    const url =`https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    ShowPhoneDetels(data.data)
}
const ShowPhoneDetels = (phone) =>{
    console.log(phone.mainFeatures)
    const ModalTitle = document.getElementById('staticBackdropLabel');
    ModalTitle.innerText = phone.name;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
                    <p class="card-text">slug: ${phone.slug}</p>
                    <p class="card-text">brand: ${phone.brand}</p>
                    <p class="card-text">brand: ${phone.releaseDate}</p>
                    <p class="card-text">brand: ${phone.mainFeatures.storage}</p>
                    <p class="card-text">brand: ${phone.mainFeatures.displaySize}</p>
                    <p class="card-text">brand: ${phone.mainFeatures.chipSet}</p>
    `;
}
