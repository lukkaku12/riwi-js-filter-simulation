import { Router, navigateTo } from "../../../Router";
import { editProducts } from "./editProducts";

export function DashboardPageComponent() {
  const $pageContent = `
  <div id="productos">
    
  </div>
  `;

  const logic = async () => {
    const $containerProducts = document.getElementById("productos");

    try {
      const roleId = localStorage.getItem("roleId");
      const response = await fetch("http://localhost:4000/products");
      if (response.ok) {
        $containerProducts.innerHTML = "";
        const products = await response.json();
        products.forEach((product) => {
          const productDiv = document.createElement("div");
          productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p class="description">${product.description}</p>
            <p class="price">${product.price}</p>
            <div id="elements-${product.id}"></div>
          `;
          $containerProducts.appendChild(productDiv);

          const $elemento = document.getElementById(`elements-${product.id}`);

          if (roleId === "1") {
            $elemento.innerHTML = `
          <button class="edit" data-id="${product.id}">Edit</button>
          <button class="delete" data-id="${product.id}">Delete</button>
          `;
          } else if (roleId === "2") {
            $elemento.innerHTML = `<button class="purchase" data-id="${product.id}">Purchase</button>`;
          }

          let $editButton = $elemento.querySelector(".edit");
          let $deleteButton = $elemento.querySelector(".delete");
          let $purchase = $elemento.querySelector(".purchase");

          if ($editButton) {
            $editButton.addEventListener("click", () => {
              navigateTo(`/dashboard/products/edit?productId="${$editButton.getAttribute('data-id')}"`);
              
            });
          }

          if ($deleteButton) {
            $deleteButton.addEventListener("click", () => {
              navigateTo(
                `/dashboard/products/delete?productId="${$deleteButton.getAttribute('data-id')}"`
              );
              
            });
          }

          if ($purchase) {
            $purchase.addEventListener('click', (e) => {
              e.preventDefault();
              const id = e.target.getAttribute('data-id');
              const name = productDiv.querySelector('h3').textContent;
              const description = productDiv.querySelector('p.description').textContent;
              const price = productDiv.querySelector('p.price').textContent;

              const product = {id, name, description, price}

              sessionStorage.setItem('purchase', JSON.stringify(product))
              navigateTo(`/dashboard/checkout?productId="${$purchase.getAttribute('data-id')}"`)
            })
          }

          // const $editButton = $elemento.querySelector(".edit");
          // const $deleteButton = $elemento.querySelector(".delete");
          // const $purchaseButton = $elemento.querySelector(".purchase");

          // if ($editButton) {
          //   $editButton.addEventListener("click", () => {
          //     navigateTo(`/dashboard/products/edit?productId=${product.id}`);
          //     console.log(product.id);
          //   });
          // }

          // if ($deleteButton) {
          //   $deleteButton.addEventListener("click", () => {
          //     navigateTo(`/dashboard/products/delete?productId=${product.id}`);
          //     console.log(product.id);
          //   });
          // }

          // if ($purchaseButton) {
          //   $purchaseButton.addEventListener("click", () => {
          //     alert(`Purchasing product ID: ${product.id}`);
          //   });
          // }
        });
      }
    } catch (e) {
      console.error("error trayendo la informacion");
    }
  };

  return {
    $pageContent,
    logic,
  };
}
