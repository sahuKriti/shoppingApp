var authen = false;
var totalCost = 0;
var editModeIndex = 0;
var cartArray = [{ item: '   ', cost: 0 }];

var productArray = [
    {
        productName: 'Outerwear',
        productTag: 'New Collection',
        productCost: 1956,
        productImg: 'https://andshop-vue.netlify.app/_nuxt/img/woman.3e56b7a.png'
    },
    {
        productName: 'Party Wear',
        productTag: 'Its Fashion',
        productCost: 3434,
        productImg: 'https://andshop-vue.netlify.app/_nuxt/img/woman4.26b67d7.png'
    },
    {
        productName: 'Formal Wear',
        productTag: 'Office Time',
        productCost: 2198,
        productImg: 'https://andshop-vue.netlify.app/_nuxt/img/woman.3e56b7a.png'
    },
    {
        productName: 'Fashion',
        productTag: 'Look Matters',
        productCost: 4534,
        productImg: 'https://andshop-vue.netlify.app/_nuxt/img/woman4.26b67d7.png'
    },
    {
        productName: 'Kids-wear',
        productTag: 'New Collection',
        productCost: 1378,
        productImg: 'https://andshop-vue.netlify.app/_nuxt/img/kids.5fb714a.png'
    }
];

// ==========================================Card Creation
const main = document.querySelector(".cardContainer");

function loadCards(){
    document.querySelector(".cardContainer").innerHTML = '';
    productArray.forEach((item, i) => {
        const card = document.createElement('div');
        card.classList = 'card';

        const cardInstance = `
        <p class="productTag">${item.productTag}</p>
        <p class="productName">${ item.productName }</p>
        <p class="productCost">₹ ${ item.productCost }</p>
        <button class="productBuy" onclick="addToCart(${i})">
        Add to Cart
        </button>
        <img class="productImg" src="${ item.productImg }" />
        <img
        class="editProduct"
        onclick="getProduct(${i})"
        src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-new-icon-22.png"
        />
        <img
        class="removeProduct"
        onclick="deleteProduct(${i})"
        src="https://cdn-icons-png.flaticon.com/512/1345/1345874.png"
        />
        `
        card.innerHTML += cardInstance;
        main.appendChild(card);
    });
}
loadCards();


// ==========================================Cart item Creation
const cartTray = document.querySelector(".cartTray");

function loadcartItems(){
    if ((cartArray[0].item == '   ') && (cartArray[0].cost == 0)) {
        cartArray.pop();
    }
    
    document.querySelector(".cartTray").innerHTML ='';
    totalCost=0;
    cartArray.forEach((items)=>{
        const cartItem = document.createElement('li');
        const cartInstance = `${items.item} <span>₹ ${items.cost}</span>`

        cartItem.innerHTML += cartInstance;
        cartTray.appendChild(cartItem);

        totalCost += items.cost;
    });
    document.querySelector(".totalOrderCost").innerHTML = totalCost;
}
loadcartItems();


// ==========================================functions
function homeFunction() {
    $(".signUpContainer").fadeOut();
    $(".adminContainer").fadeOut();
    $(".welcomePage").slideDown(500);
    $(".cartContainer").slideUp();
    $('footer').fadeIn(300);
}

function shopFunction() {
    if (authen == false) {
        alert("You need to signIn first to use this Feature");
        signUpFunction();
    } else {
        $(".signUpContainer").fadeOut();
        $(".welcomePage").fadeOut();
        $(".adminContainer").slideDown(500);
        $('footer').fadeIn(300);
    }
}

function aboutUsFunction() {
    $("#aboutUs").css('text-decoration', 'line-through').css('color', 'gray')
}

function signUpFunction() {
    $(".welcomePage").fadeOut();
    $(".adminContainer").fadeOut();
    $('footer').fadeOut();
    $(".cartContainer").slideUp();
    $(".signUpContainer").slideDown(500);
}

function userAuth() {
    let userId = $("#userId").val();
    let userPass = $("#userPass").val();

    if ((userId == 'admin') && (userPass == '1234')) {
        authen = true;
        $(".adminBox").css('display', 'flex');
        $(".editProduct").css('display', 'block');
        $(".removeProduct").css('display', 'block');
        shopFunction();
    }
    else if ((userId == 'user') && (userPass == '123')) {
        authen = true;
        $(".adminBox").css('display', 'none');
        $(".editProduct").css('display', 'none');
        $(".removeProduct").css('display', 'none');
        shopFunction();
    }
    else {
        authen = false;
        alert("Invalid Credentials")
    }
}

function addProduct() {
    let prodName = $("#prodName").val();
    let prodTag = $("#prodTag").val();
    let prodCost = $("#prodCost").val();
    let prodImg = $("#prodImg").val();
    productArray.push(
        {
            productName: prodName,
            productTag: prodTag,
            productCost: prodCost,
            productImg: prodImg
        }
    );
    loadCards();
}

function deleteProduct(hits) {
    productArray.splice(hits, 1);
    loadCards();
}

function getProduct(i) {
    $("#editMode").css('display', 'block');
    $("#editProdName").val(productArray[i].productName);
    $("#editProdTag").val(productArray[i].productTag);
    $("#editProdCost").val(productArray[i].productCost);
    $("#editProdImg").val(productArray[i].productImg);
    editModeIndex = i;
}

function editProduct() {
    let prodName = $("#editProdName").val();
    let prodTag = $("#editProdTag").val();
    let prodCost = $("#editProdCost").val();
    let prodImg = $("#editProdImg").val();
    productArray[editModeIndex] = (
        {
            productName: prodName,
            productTag: prodTag,
            productCost: prodCost,
            productImg: prodImg
        }
    );
    $("#editMode").css('display', 'none');
    loadCards();
}

function addToCart(a) {
    cartArray.push({ item: productArray[a].productName, cost: productArray[a].productCost });
    loadcartItems();
    console.log(cartArray);
}

function cartList() {
    $(".cartContainer").slideToggle(400);
}