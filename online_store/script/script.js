function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    document.querySelector("#cart").style.backgroundColor = "#bf94e4";
    document.querySelector("#cart").style.border = "4px dotted";
  }
  
  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function makeWhite() {
    document.querySelector("#cart").style.backgroundColor = "transparent";
    document.querySelector("#cart").style.border = "1px dashed";
  }
  
  function drop(ev) {
    ev.preventDefault();  
    const data = ev.dataTransfer.getData("text"); //считывается id
    const node = document.querySelector("#" + data);// считывается весь узел
    const cart = document.querySelector("#cart");
    let product = cart.querySelector("#" + node.id + "-in-cart");
      
    if (!product) {
      product = document.createElement("div");
      product.id = node.id + "-in-cart";
      product.classList.add("product-in-cart");
     }
  
    let amount = Number(product.getAttribute("amount"));
    if (amount === 0) {
      product.setAttribute("amount", 1);
      amount = 1;
    }
    else {
      amount += 1;
      product.setAttribute("amount", amount); 
    }
  
    const imgSrc = node.querySelector('img').src;
    const productName = node.textContent.match(/[A-z]+/)[0].trim();
    const productPrice = Number(node.textContent.match(/[\d]+/)[0]);
    
    const total = document.querySelector("#total");
    const totalPrice = Number(total.textContent.match(/[\d]+/)[0]);
    const maxBudget = document.querySelector("#budget").value;
    if (maxBudget && Number(maxBudget) < totalPrice + productPrice) {
        alert(`Вы вышли за пределы бюджета ${maxBudget}$`);
        return;
    }
    
    product.innerHTML = `
    <div class="img-box">    
    <img draggable="false" src="${imgSrc}" alt="${productName}">
    </div>
    ${productName}
    <div class="product-in-cart-box">
    <br>
    Цена: ${productPrice}$ <br>
    Количество: ${amount} <br>
    Сумма: ${productPrice * amount}$
    </div>
    `;
    
    if (cart.querySelector("#" + node.id + "-in-cart") == null) {
      cart.appendChild(product); 
    }
    total.textContent = `Total: ${totalPrice + productPrice}$`;
  }
  
  function empty() {
    const cart = document.querySelector("#cart");
    while (cart.firstChild) {
      cart.removeChild(cart.firstChild);
    }
    document.querySelector("#total").textContent = "Total: 0$";
    document.querySelector("#budget").value="";
  }