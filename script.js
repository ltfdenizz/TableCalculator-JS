const harcamaInput = document.querySelector("#harcama");
const fiyatInput = document.querySelector("#fiyat");
const formBtn = document.querySelector(".ekle-btn");
const liste = document.querySelector(".liste");
const toplamBilgi = document.querySelector("#toplam-bilgi");
const statusCheck = document.querySelector("#status-input");
const selectFilter = document.querySelector("#filter-select");
const nameInput = document.querySelector("#name-input");

/* Kulanıcının girdiği ismi tarayıcıda saklama */
const username = localStorage.getItem("name") || "";
nameInput.value = username;
nameInput.addEventListener("change", (e) => {
  localStorage.setItem("name", e.target.value);
});

/* izleme işlemleri */
formBtn.addEventListener("click", addExpense);
liste.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter);
/* Toplam State */
let toplam = 0;
function updateToplam(fiyat) {
  toplam += Number(fiyat);
  toplamBilgi.innerText = toplam;
}

/*  Harcama Oluşturma*/
function addExpense(e) {
  e.preventDefault();

  /* form boşsa alt tarafa geçmesin */
  if (!fiyatInput.value || !harcamaInput) {
    alert("Formları Doldurunuz");
    return;
  }

  /* div oluşturma */
  const harcamaDiv = document.createElement("div");

  /* class ekleme */

  harcamaDiv.classList.add("harcama");

  if (statusCheck.checked) {
    harcamaDiv.classList.add("payed");
  }

  /* içeriğini ayarlama */
  harcamaDiv.innerHTML = ` <h2>${harcamaInput.value}</h2>
  <h2 id="valuen">${fiyatInput.value}</h2>
  <div class="buttons">
      <img id="payment" src="images/pays.png" alt="">
      <img  id="removed"  src="images/trash.gif" alt="">
      </div>
      `;
  /* Oluşan harcamayı html e gönderme (listeye ekleme) */
  liste.appendChild(harcamaDiv);
  /* Toplamı Güncelle */
  updateToplam(fiyatInput.value);
  /* formu temizleme */
  harcamaInput.value = "";
  fiyatInput.value = "";
}

/* Listeye tıklanma olayını yönetme */
function handleClick(e) {
  const element = e.target;
  if (element.id === "removed") {
    /* tıkanılan silme butonunu kapsayıcısını alma */
    const wrapperElement = element.parentElement.parentElement;

    /* SİLİNEN ELEMANIN FİYATINI ALMA */
    const deletedPrice = wrapperElement.querySelector("#valuen").innerText;
    Number(deletedPrice);
    /* Silinenin Fiyatını Toplamdan Çıkarma */
    updateToplam(-Number(deletedPrice));
    /* kapsayıcı htmlden kaldırma */
    wrapperElement.remove();
  }
}

/* FİLTRELEME İŞLEMLERİ */
let items = liste.childNodes;
console.log(items);

function handleFilter(e) {
  let items = liste.childNodes;
  console.log(items);
  items.forEach((item) => {
    console.log(item);
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;

      case "payed":
        if (!item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }

        break;

      case "not-payed":
        if (item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;
    }
  });
}
