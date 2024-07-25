export function editProducts() {
  const $pageContent = `
    <div>
        <form>
            <input id="description"/>
            <input id="price"/>
            <input id="stock"/>

        </form>
    </div>
    `;

  const logic = async () => {
    const $descripcion = document.getElementById("description");
    const $precio = document.getElementById("price");
    const $stock = document.getElementById("stock");

    const searchParams = window.location.search;
    const paramResolved = new URLSearchParams(searchParams);
    const value = paramResolved.get("productId");
    console.log(value);
    try {
    const response = await fetch(`http://localhost:4000/products/${value}`);
    console.log(response)
    if (response.ok) {
      const products = await response.json();
      $descripcion.value = products.description;
      $precio.value = products.price;
      $stock.value = products.stock;
      
    }
} catch(e) {
    console.error(e, 'error apa')
}
  };

  return {
    $pageContent,
    logic,
  };
}
