export function LayoutPrivate($pageContent, logic) {

    const $root = document.getElementById('root');
    $root.innerHTML = `
    <nav>
        <ul>
            <li>Productos</li>
            <li>Pedidos</li>

        </ul>
    </nav>
    <main>
        ${$pageContent}
    </main>
    `;

    logic 
    logic()

    const logicalNavbar = () => {
        const $listItems = document.querySelector('li');
        console.log($listItems)
        const $listItem1 = $listItems[0];
        const $lisItem2 = $listItems[1];

        

    }

}