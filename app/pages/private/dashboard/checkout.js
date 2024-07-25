import { navigateTo } from "../../../Router";

export function checkout() {
    const $pageContent = `
    <div>
        <h3>Confirmar Pedido</h3>
        <button id="confirm-btn">confirmar</button>
    </div>
    `;

    const logic = () => {

        const searchParams = window.location.search;
        const parameters = new URLSearchParams(searchParams);
        const productId = parameters.get('productId')
        console.log(productId)

        const productInfo = JSON.parse(sessionStorage.getItem('purchase'));
        const productsAcquired = JSON.parse(sessionStorage.getItem("productsAcquired"))
        console.log(productInfo)
        const checkout = [productsAcquired]
        const $confirm = document.getElementById('confirm-btn');
        $confirm.addEventListener('click', (e) => {
            e.preventDefault();
            checkout.push(productId)
            console.log(checkout)
            alert('agregado a canasta')
            sessionStorage.setItem('productsAcquired', checkout)
            navigateTo('/dashboard/products')
        })
    }

    return {
        $pageContent,
        logic
    }
}