const searchBtn =
document.getElementById("searchBtn");

const searchInput =
document.getElementById("searchInput");

searchBtn.addEventListener("click", ()=>{

    const product =
    searchInput.value.trim();

    if(!product){

        alert("Please enter a product");

        return;
    }

    window.location.href =

    `search-results.html?product=${encodeURIComponent(product)}`;
});

searchInput.addEventListener("keypress",(e)=>{

    if(e.key === "Enter"){

        searchBtn.click();
    }
});