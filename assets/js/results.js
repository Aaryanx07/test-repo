const params =
new URLSearchParams(window.location.search);

const productUrl =
params.get("url");

const resultsContainer =
document.getElementById("resultsContainer");

const loadingScreen =
document.getElementById("loadingScreen");

const productInfo =
document.getElementById("productInfo");

const websiteLogos = {

    amazon:
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",

    flipkart:
    "https://upload.wikimedia.org/wikipedia/commons/e/e5/Flipkart_logo_%282024%29.svg",

    blinkit:
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Blinkit-yellow-app-icon.svg",

    nike:
    "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",

    adidas:
    "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",

    bigbasket:
    "https://upload.wikimedia.org/wikipedia/commons/6/65/BigBasket_logo.png"
};

// NO URL

if (!productUrl) {

    loadingScreen.innerHTML = `

        <h2>No Product URL Provided</h2>
    `;

} else {

    fetchResults();
}

async function fetchResults() {

    try {

        const response = await fetch(

            `http://localhost:8000/api/products/search?url=${encodeURIComponent(productUrl)}`
        );

        // BACKEND FAILED

        if (!response.ok) {

            throw new Error("Backend request failed");
        }

        const data = await response.json();

        console.log(data);

        loadingScreen.style.display = "none";

        // PRODUCT HEADER

        productInfo.innerHTML = `

            <div class="product-header">

                <img
                    src="${data.results[0]?.image || "https://via.placeholder.com/200"}"
                    class="main-product-image"
                />

                <div>

                    <h2 class="product-title">

                        ${formatName(data.productName)}

                    </h2>

                    <p class="product-subtitle">

                        Comparing prices across Amazon,
                        Flipkart, Blinkit, Nike,
                        Adidas & BigBasket.

                    </p>

                </div>

            </div>
        `;

        // RESULT CARDS

        resultsContainer.innerHTML = "";

        data.results.forEach(result => {

            resultsContainer.innerHTML += `

                <div class="result-card">

                    <img
                        src="${websiteLogos[result.website]}"
                        class="website-logo"
                    />

                    <h3>

                        ${capitalize(result.website)}

                    </h3>

                    ${
                        result.found

                        ?

                        `

                        <div class="price">

                            ₹${result.price}

                        </div>

                        <a
                            href="${result.url}"
                            target="_blank"
                            class="visit-btn"
                        >

                            Visit Product

                        </a>

                        `

                        :

                        `

                        <div class="not-found">

                            ✕ Product Not Found

                        </div>

                        `
                    }

                </div>
            `;
        });

    } catch (error) {

        console.log(error);

        loadingScreen.innerHTML = `

            <h2>Backend Server Error</h2>
        `;
    }
}

// HELPERS

function capitalize(text) {

    return text.charAt(0).toUpperCase()
    + text.slice(1);
}

function formatName(name) {

    return name
    .split(" ")
    .slice(0, 6)
    .join(" ");
}