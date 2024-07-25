export function dashboard() {
    const $pageContent = `
    <div id= productsView>
    </div>
    `

    const logic = async () => {
        const roleId = localStorage.getItem('roleId')
        try {
        const response = await fetch('http://localhost:4000/products')
        if (response.ok) {
            const products = await response.json();
            products.forEach(product => {
                const $product = document.createElement('div');
                $product.innerHTML = `
                <p>${product.name}</p>
                <p>${product.description}</p>
                <p>${product.price}</p>
                <div id="element-${product.id}"></div>
                `;
                document.getElementById('productsView').appendChild($product);

                const $buttonsContainer = $product.querySelector(`#element-${product.id}`);

                if (roleId === 1) {
                    $buttonsContainer.innerHTML = `
                    <button class="edit"  data-id="${product.id}">edit</button>
                    <button class="delete"  data-id="${product.id}">delete</button>

                    `
                } else if (roleId === 2) {
                    $buttonsContainer.innerHTML = `
                    <button class="purchase" data-id="${product.id}">purchase</button>
                    `
                }

                let $edit = $buttonsContainer.querySelector("button.edit");
                let $delete = $buttonsContainer.querySelector(`.delete`);
                let $purchase = $buttonsContainer.querySelector(`.purchase`)


                if ($edit) {
                    $edit.addEventListener('click', (e) => {
                        e.preventDefault();
                        console.log('hola', product.id)
                    })
                }
            });
        }
    } catch (e) {
        console.error(e, "errorsito")
    }
    }
}