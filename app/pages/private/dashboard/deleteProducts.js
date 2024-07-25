export function deleleteProduct() {
    const $pageContent = `
  <div id="productos">
    
  </div>
  `;

  const logic = async () => {

    const searchRes = window.location.search;
    const paramters = new URLSearchParams(searchRes);
    const productId = paramters.get('productId')

    const response = await fetch(`http://localhost:4000/products/${productId}`, {
    method: 'DELETE',
    })

    if (response.ok) {
        alert('producto eliminado exitosamente')
    }
  }

  return {
    $pageContent,
    logic
  }
}