(function() {

    window.onload = function() {
        try {
            inject();
        } catch (error) {
            console.log(error)
        }

        let body = document.getElementsByTagName("BODY")[0];

        body.addEventListener('mousemove', function() {
            inject()
        });
    }

})();


function inject() {


    let skuSpan = document.getElementsByClassName("sku")[0]
    if (typeof skuSpan !== "undefined") {
        //Add USD
        let priceDiv = document.getElementsByClassName("price")[0]
        if (!document.getElementById('USDSpan')) {
            let span = document.createElement('span');
            span.id = "USDSpan"
            span.innerHTML = " USD"
            priceDiv.appendChild(span)
        }

        //Get SKU
        const regex = RegExp('\\d');
        let sku = ''
        if (regex.test(skuSpan.innerHTML)) {
            sku = skuSpan.innerHTML.match(/\d/g).join('')
        } else {
            const firstSkuImage = document.documentElement.innerHTML.match(/firstSkuImage.+;/g)[0]
            sku = firstSkuImage.substring(firstSkuImage.indexOf('/') + 1, firstSkuImage.indexOf('_'))
            skuSpan.innerHTML = "SKU: " + sku
        }

        //Increase SKU size
        skuSpan.style.fontSize = "24px"
        skuSpan.style.lineHeight = "24px"
        skuSpan.style.marginLeft = "20px"

        //Create button div
        let buttonCreated = false;
        if (!document.getElementById('buttonDiv')) {
            let div = document.createElement('div');
            div.id = "buttonDiv"
            div.style.marginLeft = "20px"

            document.getElementsByClassName('top namePartPriceContainer')[1].appendChild(div);
            buttonCreated = true;
        }

        //Create button
        let lastSku = undefined
        chrome.storage.sync.get('lastSku', function(data) {
            lastSku = data.lastSku;
            if (sku !== lastSku || buttonCreated) {
                let buttonDiv = document.getElementById("buttonDiv")
                buttonDiv.innerHTML = `<button id="copySKUButton" value="${sku}" onclick="navigator.clipboard.writeText(this.value)">Copy SKU</button>`
                chrome.storage.sync.set({
                    lastSku: sku
                });
            }
        })
    }
}