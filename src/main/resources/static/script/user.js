//Changing Display Content and Active SideBar {dashboard, sales, product_stock, add_product, sign_out}
const menu_items = document.querySelectorAll('.menu_items');
const content_dashboard = document.querySelector('.content_dashboard');
const content_sales = document.querySelector('.content_sales');
const transaction_content = document.querySelector('.transaction_content');
const content_productStock = document.querySelector('.content_productStock');
const content_account_settings = document.querySelector('.content_account_settings');
const content_signOut = document.querySelector('.content_signOut');
let  transaction_id;
menu_items.forEach((element, i) => {
    element.addEventListener('click', async () => {
        removeActiveMenu();
        element.classList.add('active');
        switch (i) {
            case 0:
                content_dashboard.classList.remove('hidden');
                content_sales.classList.remove('show');
                transaction_content.classList.remove('show');
                content_productStock.classList.remove('show');
                content_account_settings.classList.remove('show');
                //
                fetchTotalSale();
                fetchTotalSoldQuantityProduct();
                fetchTotalAvailableProduct();
                getSoldProducts();
                break;
            case 1:
                content_dashboard.classList.add('hidden');
                content_sales.classList.add('show');
                transaction_content.classList.remove('show');
                content_productStock.classList.remove('show');
                content_account_settings.classList.remove('show');
                //
                categories = await fetchCategories();
                products = await fetchProducts();
                updateCategoryDropdown(categories);
                filterProducts();
                switchToSingleTab();
                //
                break;
            case 2:
                content_dashboard.classList.add('hidden');
                content_sales.classList.remove('show');
                transaction_content.classList.add('show');
                content_productStock.classList.remove('show');
                content_account_settings.classList.remove('show');
                //
                categories = await fetchCategories();
                products = await fetchProducts();
                updateCategoryDropdown(categories);
                filterProducts();
                switchToSingleTab();
                customerTransactionData = await getDailyCustomerTransactions();
                buildCustomerTransactionTable(customerTransactionData);
                //
                break;
            case 3:
                content_dashboard.classList.add('hidden');
                content_sales.classList.remove('show');
                transaction_content.classList.remove('show');
                content_productStock.classList.add('show');
                content_account_settings.classList.remove('show');
                products = await fetchProducts();
                getOutProductStockTable(products);
                updateProductStockTable(products);
                break;
            case 4:
                content_dashboard.classList.add('hidden');
                content_sales.classList.remove('show');
                transaction_content.classList.remove('show');
                content_productStock.classList.remove('show');
                content_account_settings.classList.add('show');
                switchToSingleTab();
                break;
            case 5:
                Swal.fire({
                    icon: "question",
                    title: "Sign-Out",
                    text: "Are you sure you want to sign Out",
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    confirmButtonColor: 'var(--color-primary)',
                    cancelButtonText: 'Cancel',
                    cancelButtonColor: 'var(--color-red)',
                }).then(result =>{
                    if (result.isConfirmed) {
                        document.getElementById('logoutForm').submit();
                    }
                })
                break;
            default:
                break;
        }
    });
});

function removeActiveMenu() {
    menu_items.forEach((element) => {
        element.classList.remove('active');
    });
}

//For mobile phone menu
const menu_items_sm = document.querySelectorAll('.menu_items_sm');
menu_items_sm.forEach((element, i) => {
    element.addEventListener('click', async () => {
        removeActiveMenu();
        element.classList.add('active');
        switch (i) {
            case 0:
                content_dashboard.classList.remove('hidden');
                content_sales.classList.remove('show');
                transaction_content.classList.remove('show');
                content_productStock.classList.remove('show');
                content_account_settings.classList.remove('show');
                location.reload();
                //
                fetchTotalSale();
                fetchTotalSoldQuantityProduct();
                fetchTotalAvailableProduct();
                getSoldProducts();
                break;
            case 1:
                content_dashboard.classList.add('hidden');
                content_sales.classList.add('show');
                transaction_content.classList.remove('show');
                content_productStock.classList.remove('show');
                content_account_settings.classList.remove('show');
                //
                categories = await fetchCategories();
                products = await fetchProducts();
                updateCategoryDropdown(categories);
                filterProducts();
                switchToSingleTab();
                //
                break;
            case 2:
                content_dashboard.classList.add('hidden');
                content_sales.classList.remove('show');
                transaction_content.classList.add('show');
                content_productStock.classList.remove('show');
                content_account_settings.classList.remove('show');
                //
                categories = await fetchCategories();
                products = await fetchProducts();
                updateCategoryDropdown(categories);
                filterProducts();
                switchToSingleTab();
                customerTransactionData = await getDailyCustomerTransactions();
                buildCustomerTransactionTable(customerTransactionData);
                //
                break;
            case 3:
                content_dashboard.classList.add('hidden');
                content_sales.classList.remove('show');
                transaction_content.classList.remove('show');
                content_productStock.classList.add('show');
                content_account_settings.classList.remove('show');
                products = await fetchProducts();
                getOutProductStockTable(products);
                updateProductStockTable(products);
                break;
            case 4:
                content_dashboard.classList.add('hidden');
                content_sales.classList.remove('show');
                transaction_content.classList.remove('show');
                content_productStock.classList.remove('show');
                content_account_settings.classList.add('show');
                switchToSingleTab();
                break;
            case 5:
                Swal.fire({
                    icon: "question",
                    title: "Sign-Out",
                    text: "Are you sure you want to sign Out",
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    confirmButtonColor: 'var(--color-primary)',
                    cancelButtonText: 'Cancel',
                    cancelButtonColor: 'var(--color-red)',
                }).then(result =>{
                    if (result.isConfirmed) {
                        document.getElementById('logoutForm').submit();
                    }
                })
                break;
            default:
                break;
        }
    });
});

const open_menu_btn = document.querySelector('.open_menu_btn');
const phone_close_btn = document.querySelector('.phone_close_btn');
const slide_menu = document.querySelector('.slide_menu');
open_menu_btn.addEventListener('click',()=> {
    if(!slide_menu.classList.contains('show')){
        slide_menu.classList.add('show');
    }
})
phone_close_btn.addEventListener('click',()=> {
    if(slide_menu.classList.contains('show')){
        slide_menu.classList.remove('show');
    }
})
slide_menu.addEventListener('click',(e)=> {
    if(e.target.classList.contains('show')){
        slide_menu.classList.remove('show');
    }
})
//End dashboard

//Data Array
let categories = [];
let products = [];
let dailySoldProducts = [];
//Data Array

//=======================DASH BOARD DATA CONTENT===================================
//FETCH ALL TOTAL SALES
async function fetchTotalSale () {
    try {
        let response = await fetch('http://localhost:8081/api/sale/total_sale', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        let total_sale_daily =  await response.json();
        const dashboard_total_sale_value =  document.getElementById('dashboard_total_sale_value');
        const total_sale = parseFloat(total_sale_daily).toFixed(2);
        dashboard_total_sale_value.innerHTML = `&#8373 ` + total_sale;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}
fetchTotalSale ();
//FETCH ALL TOTAL SALES


//FETCH ALL TOTAL SOLD PRODUCT QUANTITY
async function fetchTotalSoldQuantityProduct () {
    try {
        let response = await fetch('http://localhost:8081/api/sale/total_quantity', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        let total_soldProduct_daily =  await response.json();
        const dashboard_total_quantitySold_value = document.getElementById('dashboard_total_quantitySold_value');
        dashboard_total_quantitySold_value.innerHTML = parseInt(total_soldProduct_daily);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}
fetchTotalSoldQuantityProduct();
//FETCH ALL TOTAL SOLD PRODUCT QUANTITY

//FETCH ALL TOTAL AVAILABLE PRODUCTS QUANTITY
async function fetchTotalAvailableProduct () {
    try {
        let response = await fetch('http://localhost:8081/api/product/get_available', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        let total_available_product =  await response.json();
        const dashboard_available_products = document.getElementById('dashboard_available_products');
        dashboard_available_products.innerHTML = parseInt(total_available_product);
    } catch (error) {
        console.error('Error fetching available products:', error);
        return [];
    }
}
fetchTotalAvailableProduct();
//FETCH ALL TOTAL AVAILABLE PRODUCTS QUANTITY


//FETCH ALL RESTOCK NOTIFICATIONS
async function fetchRestockNotification () {
    try {
        let response = await fetch('http://localhost:8081/api/stock/notify', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        let restockProductsList =  await response.json();
        let restockCount = restockProductsList.length;
        const dashboard_restock_notify_count = document.getElementById('dashboard_restock_notify_count');
        const nav_alerts_number = document.getElementById('nav_alerts_number');
        const message_alert_content = document.getElementById('message_alert_content');
        alert_btn.style.color = restockCount > 0 ? 'var(--color-red)' : 'var(--color-primary)';
        dashboard_restock_notify_count.innerHTML = restockCount > 0 ? restockCount: '0';
        nav_alerts_number.innerHTML = restockCount > 0 ? restockCount: '0';
        message_alert_content.innerHTML = '';
        restockProductsList.forEach(product => {
            let message = ` <article class="alert_message">
                                    <span class="message_title">${product.name}</span>
                                    <span class="message_body">${product.name} stock is low: ${product.quantity} items in stock</span>
                                </article>
                              `
            message_alert_content.innerHTML += message;
        });
        let notification = restockCount == 1 ? `You have ${restockCount} notification` : `You have ${restockCount} notifications`
        if (restockCount > 0){
            Swal.fire({
                position: "top-end",
                title: "Stock Alert",
                text: notification,
                showConfirmButton: false,
                timer: 1500,
            });
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
fetchRestockNotification();



async function getSoldProducts() {
    try {
        let response = await fetch('http://localhost:8081/api/sale/sold_products', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        let sold_products =  await response.json();
        if (response.ok) {
            buildSoldProductTable(sold_products);
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

function buildSoldProductTable(soldProducts) {
    let currentSale_table_body = document.getElementById('currentSale_table_body');
    currentSale_table_body.innerHTML = '';
    soldProducts.forEach(product => {
        let name = product.name;
        let price = parseFloat(product.price).toFixed(2);
        let availableQuantity = product.availableQuantity;
        let soldQuantity = product.soldQuantity;
        let totalAmt = parseFloat(price * soldQuantity).toFixed(2);
        let row = ` <tr>
                        <td>${name}</td>
                        <td class="lg_text">${price}</td>
                        <td>${availableQuantity}</td>
                        <td>${soldQuantity}</td>
                        <td>${totalAmt}</td>
                    </tr>`
        currentSale_table_body.innerHTML += row;
    });
}
getSoldProducts();
//=======================DASH BOARD DATA CONTENT===================================

//========================SALES SECTION================================
async function fetchProducts() {
    try {
        let response = await fetch('http://localhost:8081/api/product/get_all', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

async function fetchCategories () {
    try {
        let response = await fetch('http://localhost:8081/api/category/get', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

const categoryDropdown = document.getElementById("category_dropdown");
const searchInput = document.getElementById("product_search");
const dropdown = document.getElementById("product_dropdown");
const selected_Quantity = document.getElementById("selected_Quantity");
const add_to_cart_btn = document.getElementById("add_to_cart_btn");
const delete_all_cart_btn = document.getElementById("delete_all_cart_btn");
const add_to_cart_table_body = document.getElementById("add_to_cart_table_body");
const submit_cart_btn = document.getElementById("submit_cart_btn");
const total_price = document.getElementById("total_price");


function updateCategoryDropdown(categories) {
    selected_Quantity.value = '';
    categoryDropdown.options.length = 0; // Clear the existing options
    const defaultOption = document.createElement("option");
    defaultOption.value = 0;
    defaultOption.text = "Select category";
    categoryDropdown.add(defaultOption);

    categories.forEach((category) => {
        let text = category.name.toLowerCase()
        let categoriesProduct = text.charAt(0).toUpperCase() + text.slice(1);// Capitalizing all categories to Sentence Cases
        const option = document.createElement("option");
        option.value = category.id;
        option.text = categoriesProduct;
        categoryDropdown.add(option);
    });
}

//Function for category value change
categoryDropdown.addEventListener("change", () => {
    filterProducts();
});

//Search products input
searchInput.addEventListener("input", () => {
    filterProducts();
});

//Function to filter products[] array based on select category
function filterProducts() {
    const selectedCategoryId = categoryDropdown.value;
    const searchTerm = searchInput.value.toLowerCase();
    //Creating an array of filtered products based on the selected category
    const filteredOptions = products.filter(
        (product) =>
        (selectedCategoryId === '' || product.category.id == selectedCategoryId) &&
        product.name.toLowerCase().includes(searchTerm)
    );
    //passing filtered array to product drop down select list
    updateProductDropdown(filteredOptions);
}

function updateProductDropdown(products) {
    // Clear the existing options
    dropdown.options.length = 0;
    //Creating new options based on the filtered selected category
    products.forEach((product) => {
        const option = document.createElement("option");
        option.value = product.id;
        option.text = `${product.name} - GH ${product.price.toFixed(2)} (${product.quantity} in stock)`;
        dropdown.add(option);
    });
}

const customer_name_input = document.getElementById('customer_name');
const customer_telephone_input = document.getElementById('customer_telephone');
const customer_name_value = document.getElementById('customer_name_value');
customer_name_input.addEventListener('keyup', ()=>{
    customer_name_value.textContent = customer_name_input.value.toUpperCase();
});

add_to_cart_btn.addEventListener('click', ()=> {
    const productQuantity = selected_Quantity.value;
    const selectedProductId = dropdown.value;
    //Checking if customers name is not empty and enforcing contact provision
    if ((customer_name_input.value.length > 0) && (customer_telephone_input.value == '' )) {
        Swal.fire({
            title: `Error`,
            text: `Provide customer's contact`,
            icon:`warning`,
            confirmButtonText: 'OK',
            confirmButtonColor: 'var(--color-red)',
        })
        return;
    }
    //Checking if customer phone number is valid
    if ((customer_telephone_input.value != '' ) && (customer_telephone_input.value.length < 10)) {
        Swal.fire({
            title: `Error`,
            text: `Customer contact is invalid`,
            icon:`warning`,
            confirmButtonText: 'OK',
            confirmButtonColor: 'var(--color-red)',
        })
        return;
    }

    //Checking to if phone number is provided and enforcing provision of customer's name
    if ((customer_telephone_input.value != '' ) && (customer_telephone_input.value.length == 10) && (customer_name_input.value.length == 0)) {
        Swal.fire({
            title: `Error`,
            text: `Provide customer's name`,
            icon:`warning`,
            confirmButtonText: 'OK',
            confirmButtonColor: 'var(--color-red)',
        })
        return;
    }
    //Checking if product has been selected

    if (!parseInt(selectedProductId) || selectedProductId == '') {
        Swal.fire({
            title: `Error`,
            text: `No category and product selected`,
            icon:`warning`,
            confirmButtonText: 'OK',
            confirmButtonColor: 'var(--color-red)',
        })
        return;
    }
    //Checking if quantity has been selected
    if (parseInt(productQuantity) < 1 || productQuantity == '') {
        Swal.fire({
            title: `Error`,
            text: `Product quantity cannot be less than 1`,
            icon:`warning`,
            confirmButtonText: 'OK',
            confirmButtonColor: 'var(--color-primary)',
        });
        return;
    }

    const selectedProduct = products.find((product) => product.id == selectedProductId);
    // Add the selected product to the cart
    addToCart(selectedProduct,productQuantity);
});

// Implementation to add the product to the cart
function addToCart(product, selectedQuantity) {
    //Checking if product is already added to the cart 
    const productIds = Array.from(add_to_cart_table_body.querySelectorAll('[data-productid]')).map(e => e.dataset.productid);
    let isPresent = false;
    productIds.forEach(e => {
        if (e == product.id) {
            isPresent = true;
        }else {
            isPresent == false;
        }
    });

    if (isPresent) {
        Swal.fire({
            title: `Error`,
            text: `${product.name} is already added to cart. Please edit instead!!`,
            icon:`info`,
            confirmButtonText: 'OK',
            confirmButtonColor: 'var(--color-red)',
        })
        return;
    }

    const id = product.id;
    const productName = product.name;
    const productQuantity = product.quantity;
    const productPrice = product.price;
    const category = product.category;
    const total = parseInt(selectedQuantity) * productPrice;
    if (selectedQuantity > productQuantity) {
        Swal.fire({
            title: `Error`,
            text: `Not enough stock available`,
            icon:`warning`,
            confirmButtonText: 'OK',
            confirmButtonColor: 'var(--color-red)',
        })
        return;
    }
    const cartItem = `<tr id=row_${id}  data-productId= ${id} data-productQuantity= ${productQuantity} data-productPrice= ${productPrice} data-category_id= ${category.id} data-category_name= ${category.name}>
                            <td>${productName}</td>
                            <td>${selectedQuantity}</td>
                            <td class= "cart_price_column_sm">${productPrice}</td>
                            <td>${total.toFixed(2)}</td>
                            <td>
                                <div class="cart_table_btns">
                                      <button id = "edit_${id}" class="btn btn_primary"  onclick={editFunction(this)}><i class="uil uil-edit"></i><span class="text_cartBtn">Edit</span></button>
                                      <button id = "rem_${id}" class="btn btn_danger"  onclick={removeFunction(this)}> <i class="uil uil-trash-alt"></i><span class="text_cartBtn">Remove</span></button>
                                </div>
                            </td>
                        </tr>`
    add_to_cart_table_body.innerHTML += cartItem;
    //total  price
    let current_total = total_price.value == "" ? parseFloat('0.00'): total_price.value;
    total_price.value  = parseFloat(current_total) + parseFloat(total);
}

//Clearing all cats table after selling
delete_all_cart_btn.addEventListener('click',()=> {
    add_to_cart_table_body.innerHTML = "";
})

//Editing items in cart table content
function editFunction(btn) {
    const id = btn.id.split("_")[1];
    const row = document.getElementById(`row_${id}`);
    const product_price = parseFloat(row.children[2].innerHTML);
    const product_total_price = parseFloat(row.children[3].innerHTML);
    const availableQuantity = row.dataset.productquantity;
    let current_total_price = parseFloat(total_price.value);
    let total_price_left = current_total_price - product_total_price;
    Swal.fire({
        title: 'Edit Quantity',
        input: 'number',
        inputAttributes: {min: 1, max: 1000},
        showCancelButton: true,
        confirmButtonText: 'Save',
        confirmButtonColor: 'var(--color-primary)',
        cancelButtonText: 'Cancel',
        cancelButtonColor: 'var(--color-red)',
    }).then((result) => {
        if (result.value) {
            const newQuantity = parseInt(result.value);
            if (newQuantity > availableQuantity) {
                Swal.fire({
                    title: `Error`,
                    text: `Not enough stock available`,
                    icon:`warning`,
                    confirmButtonText: 'OK',
                    confirmButtonColor: 'var(--color-red)',
                })
                return;
            }
            row.children[1].innerHTML = newQuantity;
            const newTotal = newQuantity * product_price;
            row.children[3].innerHTML = newTotal.toFixed(2);
            total_price.value = total_price_left + newTotal;
        }
    });
}
//Deleting items in cart table content
function removeFunction(btn) {
    const id = btn.id.split("_")[1];
    const row = document.getElementById(`row_${id}`);
    let productName = row.children[0].innerHTML;
    Swal.fire({
        title: 'Remove Item',
        text: `Are you sure you want to remove ${productName} from cart?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'var(--color-primary)',
        cancelButtonColor: 'var(--color-red',
        confirmButtonText: 'Yes!',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.value) {
            let row_total_price = parseFloat(row.children[3].innerHTML);
            let current_total = total_price.value == "" ? parseFloat('0.00'): total_price.value;
            total_price.value = parseFloat(current_total) - parseFloat(row_total_price);
            row.remove();
        }
    })

}
//Submit event handling for cart items
submit_cart_btn.addEventListener('click', async()=> {
    const content = document.querySelector('.content_sales');
    let content_id = content.id.split("_")[1];
    let customer_name = customer_name_value.textContent;
    let customer_phone = customer_telephone_input.value;

    let cart_content = add_to_cart_table_body.childElementCount;
    if (!cart_content) {
        Swal.fire({
            title: `Error`,
            text: `No item has been added to cart!`,
            icon:`warning`,
            confirmButtonText: 'OK',
            confirmButtonColor: 'var(--color-primary)',
        })
        return;
    }
    const rows = add_to_cart_table_body.querySelectorAll("tr");
    let productCost = 0;
    let total_productQuantity = 0;
    //Creating array from cart table of products
    const cartItems = Array.from(rows).map((row) => {
        productCost += parseFloat(row.dataset.productprice) * parseInt(row.children[1].textContent);
        total_productQuantity += parseInt(row.children[1].textContent);
        //Creating List<Object> of the products
        return {
            id: row.dataset.productid,
            quantity: parseInt(row.children[1].textContent),
        }
    })

    let requestBody = {
        cartItems: cartItems,
        totalAmount: productCost,
        worker: parseInt(content_id),
        customerName: customer_name,
        customerContact: customer_phone,
    };

    //Clear transaction inputs and cart table
    customer_name_input.value = '';
    customer_telephone_input.value = '';
    customer_name_value.textContent = '';
    add_to_cart_table_body.innerHTML = '';
    total_price.value = '';

    try {
        const response = await fetch('http://localhost:8081/api/sale/cart', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        const data = await response.json();
        if (data.status === true) {
            Swal.fire({
                title: `Sale total  = GHC ${productCost}`,
                text: data.message,
                icon:`info`,
                confirmButtonText: 'OK',
                confirmButtonColor: 'var(--color-primary)',
            })
        }else {
            Swal.fire({
                icon: 'error',
                title: 'Transaction',
                text: `${results.message}`,
                confirmButtonColor: `var(--color-red)`,
            });
        }
    } catch (error) {
        console.error('Error saving sale:', error);
    }
    //
    categories = await fetchCategories();
    products = await fetchProducts();
    updateCategoryDropdown(categories);
    filterProducts();
    fetchTotalSale();
    fetchTotalSoldQuantityProduct();
    fetchTotalAvailableProduct();
    fetchRestockNotification();
    customerTransactionData = await getDailyCustomerTransactions();
    buildCustomerTransactionTable(customerTransactionData);
    getSoldProducts();
})
//========================SALES SECTION==================================

//========================Transactions===================================
const transaction_table = document.getElementById('transaction_section_table_body');
const transaction_search = document.getElementById('transaction_search');
async function getDailyCustomerTransactions() {
    try {
        const response = await fetch('http://localhost:8081/api/sale/sale_trans', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        let transaction = await response.json();
        if (response.ok) {
            return transaction;
        }
    } catch (error) {
        console.error('getting sale transactions:', error);
    }
}

let customerTransactionData = []

function buildCustomerTransactionTable(data) {
    transaction_table.innerHTML = '';
    data.forEach((transaction, i) => {
        let customer = convertToSentenceName(transaction.customer.name)
        let contact = transaction.customer.contact;
        let dateTime = transaction.date;
        let time = dateTime.split(" ")[1] + " " + dateTime.split(" ")[2];
        let totalQuantity = transaction.quantity.split(",").map(Number).reduce((acc, cur)=> acc + cur, 0)
        let totalTransaction = transaction.totalTransaction.split(",").map(Number).reduce((acc, cur)=> acc + cur, 0)
        let row = ` <tr data-index = "${i}">
                        <td>${customer}</td>
                        <td class="cart_price_column_sm">${contact}</td>
                        <td class="cart_price_column_sm">${time}</td>
                        <td>${totalQuantity}</td>
                        <td>${parseFloat(totalTransaction).toFixed(2)}</td>
                        <td> <button id = "tran_${i}" class="btn btn_primary"  onclick={viewCustomerFunction(this)}> <i class="uil uil-eye"></i><span class="text_cartBtn">View</span></button></td>
                    </tr>
        `
        transaction_table.innerHTML += row;
    });
}
buildCustomerTransactionTable(customerTransactionData)
//Changing alert width based on current view
let swal_width = "50%";
let invoiceBottomWidth = "55%";
let cur_width = window.innerWidth;
window.addEventListener('resize', ()=> {
    cur_width = window.innerWidth;
    checkWindowScreen(cur_width);
});

function checkWindowScreen(width) {
    if (width < 820) {
        swal_width = "100%";
        invoiceBottomWidth = "100%";
    }else if (width > 820) {
        swal_width = "50%";
        invoiceBottomWidth = "55%";
    }else if ((width > 820)&&(width < 1180)) {
        swal_width = "40%";
        invoiceBottomWidth = "55%";
    }
}
checkWindowScreen(cur_width)
function viewCustomerFunction(e) {
    let width = window.innerWidth;
    checkWindowScreen(width)
    let index = e.id.split("_")[1];
    //Getting transaction details from transaction array
    let customerTransaction = customerTransactionData[index]
    let sale_id = customerTransaction.saleId;
    let customer  = customerTransaction.customer;
    let fullName = convertToSentenceName(customer.name)
    let dateTime = customerTransaction.date;
    let date = dateTime.split(" ")[0]
    let time = dateTime.split(" ")[1] + " " + dateTime.split(" ")[2];

    let products = customerTransaction.productName.split(",").map(String);
    let quantities = customerTransaction.quantity.split(",").map(Number);
    let prices = customerTransaction.productPrice.split(",").map(Number);
    let amounts = customerTransaction.totalTransaction.split(",").map(Number);
    let totalProducts = products.length;
    let totalQuantity = quantities.reduce((acc, cur)=> acc + cur, 0);
    let totalAmount = amounts.reduce((acc, cur)=> acc + cur, 0);

    const table = document.createElement('table');table.classList.add('table_invoice');table.style.fontSize = "0.9rem";
    let tableBody = document.createElement('tbody'); tableBody.classList.add('table_invoice_body');
    let t_headers_row = document.createElement('tr'); t_headers_row.classList.add('table_invoice_headers');
    let th_index = document.createElement('th'); th_index.innerHTML = "<b>No.</b>"
    let th_product = document.createElement('th'); th_product.innerHTML= "<b>Product</b>";
    let th_prices = document.createElement('th'); th_prices.innerHTML = "<b>Price</b>";
    let th_quantity = document.createElement('th'); th_quantity.innerHTML = "<b>Quantity</b>";
    let th_amount = document.createElement('th'); th_amount.innerHTML = "<b>Amount GH&#8373</b>";

    t_headers_row.appendChild(th_index);
    t_headers_row.appendChild(th_product);
    t_headers_row.appendChild(th_prices)
    t_headers_row.appendChild(th_quantity)
    t_headers_row.appendChild(th_amount)
    table.append(t_headers_row)
    for (let i = 0; i < totalProducts; i++) {
        let row =  ` <tr class>
                        <td>${[i+1]}</td>
                        <td>${products[i]}</td>
                        <td>${parseFloat(prices[i]).toFixed(2)}</td>
                        <td>${quantities[i]}</td>
                        <td>${parseFloat(amounts[i]).toFixed(2)}</td>
                     </tr>
        `
        tableBody.innerHTML += row
    }
    table.appendChild(tableBody);
    //Creating the invoice wrapper div layout
    const invoiceWrapper = document.createElement('div');invoiceWrapper.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.1)",
    invoiceWrapper.style.display ="flex";invoiceWrapper.style.gap ="1rem";invoiceWrapper.style.flexDirection ="column";
    invoiceWrapper.style.padding = "0.5rem";invoiceWrapper.style.borderRadius = "0.5rem";
    const invoiceHeader = document.createElement('div');invoiceHeader.style.display = "flex"; invoiceHeader.style.flexDirection = "column";invoiceHeader.style.gap = "0.7rem";
    const invoiceHeaderBottom = document.createElement('div');invoiceHeaderBottom.style.display = "flex";invoiceHeaderBottom.style.justifyContent = "space-between";invoiceHeaderBottom.style.gap = "0.7rem";
    const invoiceHeaderLeft = document.createElement('div');invoiceHeaderLeft.style.display = "flex";invoiceHeaderLeft.style.flexDirection = "column";invoiceHeaderLeft.style.gap = "0.7rem";
    const invoiceHeaderRight = document.createElement('div');invoiceHeaderRight.style.display = "flex";invoiceHeaderRight.style.flexDirection = "column";invoiceHeaderRight.style.gap = "0.7rem";
    //Changing the flex direction of InvoiceBottom base on screen size
    let cur_width = window.innerWidth;
    if (cur_width < 820) {
        invoiceHeaderBottom.style.flexDirection = "column";
    }else {
        invoiceHeaderBottom.style.flexDirection = "row";
    }
    //
    invoiceHeader.style.fontSize = "0.9rem";
    const spanSaleId = document.createElement('span'); spanSaleId.innerHTML = `<b>Transaction Id:</b> <p>${sale_id}</p>`;
    const spanName = document.createElement('span'); spanName.innerHTML = `<b>Customer:</b> <p>${fullName}</p>`;
    const spanTel = document.createElement('span'); spanTel.innerHTML = `<b>Contact:</b> <p>${customer.contact}</p>`;
    const spanDate = document.createElement('span'); spanDate.innerHTML = `<b>Date:</b> <p>${date}</p>`;
    const spanTime = document.createElement('span'); spanTime.innerHTML = `<b>Time:</b> <p>${time}</p>`;

    invoiceHeaderLeft.appendChild(spanName);
    invoiceHeaderLeft.appendChild(spanDate);
    invoiceHeaderRight.appendChild(spanTel);
    invoiceHeaderRight.appendChild(spanTime);

    invoiceHeaderBottom.append(invoiceHeaderLeft);
    invoiceHeaderBottom.append(invoiceHeaderRight);

    invoiceHeader.append(spanSaleId);
    invoiceHeader.append(invoiceHeaderBottom);

    const invoiceBottom = document.createElement('div'); invoiceBottom.style.display = "flex"; invoiceBottom.style.flexDirection = "column"; invoiceBottom.style.gap = "0.4rem";
    invoiceBottom.style.width = invoiceBottomWidth; invoiceBottom.style.fontSize = "0.9rem";invoiceBottom.style.alignSelf = "self-end"; invoiceBottom.style.padding = "0.4rem";
    const spanTotalProducts = document.createElement('span'); spanTotalProducts.innerHTML = `<b>Total items:</b> <p>${totalProducts}</p>`;
    const spanTotalQuantity = document.createElement('span'); spanTotalQuantity.innerHTML = `<b>Total Quantity:</b> <p>${totalQuantity}</p>`;
    const spanTotalAmount = document.createElement('span'); spanTotalAmount.innerHTML = `<b>Grand Total GH&#8373:</b> <p>${parseFloat(totalAmount).toFixed(2)}</p>`;
    spanTotalAmount.style.borderTop = "2px solid #333"; spanTotalAmount.style.paddingTop = " 0.7rem"
    invoiceBottom.appendChild(spanTotalProducts)
    invoiceBottom.appendChild(spanTotalQuantity)
    invoiceBottom.appendChild(spanTotalAmount)

    //Appending invoiceHeader, table and invoiceBottom to the invoice wrapper
    invoiceWrapper.appendChild(invoiceHeader)
    invoiceWrapper.appendChild(table)
    invoiceWrapper.appendChild(invoiceBottom)
    //---
    Swal.fire({
        html: invoiceWrapper,
        width: swal_width,
        showCancelButton: false,
        showConfirmButton: false,
        padding: '1em',
    })
    //Style each span item the invoice wrapper has been rendered
    const invoiceHeaderSpans = invoiceHeader.querySelectorAll('span')
    invoiceHeaderSpans.forEach(span => {
        span.style.display = "flex";
        span.style.gap = "1rem";
    });

    const tableTds = table.querySelectorAll('td')
    tableTds.forEach(td => {
        td.style.borderBottom = "1px solid #ddd";
        td.style.background = "#f2f2f2";
    });

    const tableThs = table.querySelectorAll('th')
    tableThs.forEach(th => {
        th.style.fontSize = "0.9rem";
        th.style.width = "fit-content";
    });

    const invoiceBottomSpans = invoiceBottom.querySelectorAll('span')
    invoiceBottomSpans.forEach(span => {
        span.style.fontSize = "0.9rem";
        span.style.display = "flex";
        span.style.flexDirection ="row";
        span.style.gap ="1rem";
        span.style.justifyContent = "space-between"
    });
}

transaction_search.addEventListener('keyup', ()=> {
    let search = transaction_search.value.toLowerCase()
    let filteredCustomers = customerTransactionData.filter(cus => cus.customer.name.toLowerCase().includes(search));
    buildCustomerTransactionTable(filteredCustomers)
});

function convertToSentenceName(name) {
    name = name.toLowerCase();
    if (name.indexOf(" ") !== -1) {
        let f_name = name.split(" ")[0]
        let firstname = f_name.charAt(0).toUpperCase() + f_name.slice(1)
        let l_name = name.split(" ")[1]
        let lastname = l_name.charAt(0).toUpperCase() + l_name.slice(1)
        let fullName = firstname + " " + lastname;
        return fullName;
    }else {
        let f_name = name.split(" ")[0];
        let fullName = f_name.charAt(0).toUpperCase() + f_name.slice(1);
        return fullName;
    }

}
//========================Transactions=================================

//=======================PRODUCT STOCK===================================
const stock_single_section_table = document.getElementById('stock_single_section_table');
const stock_multiple_section_table = document.getElementById('stock_multiple_section_table');
const stock_tab_single = document.getElementById('stock_tab_single');
const stock_tab_multiple = document.getElementById('stock_tab_multiple');
const stock_slide_wrapper = document.getElementById('stock_slide_wrapper');
const stock_tab = document.querySelectorAll('.stock_tab');
//Change between stock tabs
stock_tab_single.addEventListener('click', ()=> {
    switchToSingleTab();
})

function switchToSingleTab() {
    stock_slide_wrapper.classList.remove('show');
    removeActiveTab();
    stock_tab_single.classList.add('active')
    updateProductStockTable(products)
};

stock_tab_multiple.addEventListener('click', ()=> {
    switchToMultipleTab();
})

function switchToMultipleTab() {
    stock_slide_wrapper.classList.add('show');
    removeActiveTab();
    stock_tab_multiple.classList.add('active');
    getOutProductStockTable(products);
}
//Remove active tab
function removeActiveTab() {
    stock_tab.forEach(tab => {
        tab.classList.remove('active')
    });
}
//Build stock update stock table function
function updateProductStockTable(stock_products) {
    build_updateProductStockTable(stock_products);
}

function getOutProductStockTable(products) {
    build_OutOfStockProductStockTable(products);
};
const stock_product_search = document.getElementById('stock_product_search');
stock_product_search.addEventListener('keyup', () => {
    const search_term = stock_product_search.value.toLowerCase();
    const stock_products = products.filter(product => product.name.toLowerCase().includes(search_term));
    build_updateProductStockTable(stock_products);
});


function build_updateProductStockTable(stock_products) {
    stock_single_section_table.innerHTML = '';
    stock_multiple_section_table.innerHTML = '';
    stock_products.forEach((product) => {
        const row = document.createElement('tr');
        row.classList.add(`stock-row_${product.id}`);
        row.id = `stock-row_${product.id}`;
        row.setAttribute(`data-category`,`${product.category.name}`)
        row.setAttribute(`data-productid`,`${product.id}`)
        row.setAttribute(`data-product_name`,`${product.name}`)
        //Checking for product stock and changing color based on the level
        const restockLevel = product.productStock.restockLevel;
        const availableQuantity = product.quantity;
        if (restockLevel >= availableQuantity) {
            row.style.color = 'var(--color-red)';
            row.style.fontWeight = 'bold';
        }else {
            row.style.color = 'var(--color-black)';
            row.style.fontWeight = 'normal';
        }
        row.innerHTML = `
        <td>${product.name}</td>
        <td>${parseFloat(product.price).toFixed(2)}</td>
        <td>${product.quantity}</td>
        <td>
            <div class="stock_table_btns">
                <button id = "stock-edit_${product.id}" class="btn btn_primary sm_btn"  onclick={stock_EditFunction(this)}><i class="uil uil-plus"></i><span class="text_cartBtn">Add quantity</span></button>
            </div>
        </td>
         `
        stock_single_section_table.append(row);
    });
}

function build_OutOfStockProductStockTable(stock_products) {
    stock_multiple_section_table.innerHTML = '';
    stock_products.forEach((product) => {
        const row = document.createElement('tr');
        row.classList.add(`stock-out-row_${product.id}`);
        row.id = `stock-out-row_${product.id}`;
        row.setAttribute(`data-category`,`${product.category.name}`)
        row.setAttribute(`data-productid`,`${product.id}`)
        row.setAttribute(`data-product_name`,`${product.name}`)
        row.setAttribute(`data-restock_level`,`${product.productStock.restockLevel}`)
        //Checking for product stock and changing color based on the level
        const restockLevel = product.productStock.restockLevel;
        const availableQuantity = product.quantity;
        if (restockLevel >= availableQuantity) {
            row.style.color = 'var(--color-red)';
            row.style.fontWeight = 'bold';
            row.innerHTML = `
                            <td>${product.name}</td>
                            <td>${parseFloat(product.price).toFixed(2)}</td>
                            <td>${product.quantity}</td>
                            <td class="lg_text">${0}</td>
                            <td>
                                <div class="stock_table_btns">
                                    <button id = "stockBatch-edit_${product.id}" class="btn btn_primary sm_btn"  onclick={stockBatch_EditFunction(this)}><i class="uil uil-edit"></i><span class="text_cartBtn">Edit quantity</span></button>
                                    <button id = "stockBatch-clear_${product.id}" class="btn btn_danger sm_btn"  onclick={stockBatch_ClearFunction(this)}><i class="uil uil-trash-alt"></i><span class="text_cartBtn">Clear</span></button>
                                </div>
                            </td>
                            `
            stock_multiple_section_table.append(row)
        }else {
            row.style.color = 'var(--color-black)';
            row.style.fontWeight = 'normal';
        }
    });
}

function stock_EditFunction(e) {
    const id = e.id.split("_")[1];
    const row = document.getElementById(`stock-row_${id}`);
    const product_id = id
    const productName = row.dataset.product_name;
    const content = document.querySelector('.content_sales');
    let content_id = content.id.split("_")[1];
    Swal.fire({
        title: 'Edit product quantity',
        input: 'number',
        text: `${row.children[0].textContent}`,
        inputPlaceholder: "Enter quantity",
        inputAttributes: {min: 1, max: 10000},
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
    }).then(async (result) => {
        if (result.value) {
            const newQuantity = result.value;
            const productStockDto = {
                id: product_id,
                name: productName,
                quantity: newQuantity,
                user: content_id
            }
            try {
                let response = await fetch(`http://localhost:8081/api/product/stock/update_one`,{
                    method:'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(productStockDto)
                });
                let data = await response.json();
                showUpdatedProductNotification(data.message)
            } catch (error) {
                console.log(error)
            };
        }
        fetchRestockNotification();
        fetchTotalAvailableProduct();
        products = await fetchProducts();
        updateProductStockTable(products);
    });
}

function stockBatch_EditFunction(e) {
    const id = e.id.split("_")[1];
    const row = document.getElementById(`stock-out-row_${id}`);
    //
    const restockLevel = parseInt(row.dataset.restock_level);
    const productName = row.children[0].textContent;
    const updatedQuantity = parseInt(row.children[3].textContent);
    //
    Swal.fire({
        title: 'Edit Quantity',
        input: 'number',
        inputAttributes: {min: 1, max: 1000},
        showCancelButton: true,
        confirmButtonText: 'Save',
        confirmButtonColor: 'var(--color-primary)',
        cancelButtonText: 'Cancel',
        cancelButtonColor: 'var(--color-red)',
    }).then((result) => {
        if (result.value) {
            if (updatedQuantity == 0) {
                //If the product is being updated for the first time
                const newQuantity = parseInt(result.value);
                const productQuantity = parseFloat(row.children[2].textContent);
                const newTotal = productQuantity + newQuantity;
                if (newTotal < restockLevel) {
                    Swal.fire({
                        title: `Error`,
                        text: `${productName}'s quantity is still less`,
                        icon:`info`,
                        confirmButtonText: 'OK',
                        confirmButtonColor: 'var(--color-primary)',
                    })
                    row.children[3].textContent = newTotal;
                    row.style.color = 'var(--color-red)';
                    row.style.fontWeight = 'bold';
                }else {
                    row.children[3].textContent = newTotal;
                    row.style.color = 'var(--color-black)';
                    row.style.fontWeight = 'normal';
                }
            }else {
                //If the product is being updated for 2nd or more times
                const newQuantity = parseInt(result.value);
                const productQuantity = parseFloat(row.children[3].textContent);
                const newTotal = productQuantity + newQuantity;
                if (newTotal < restockLevel) {
                    Swal.fire({
                        title: `Error`,
                        text: `${productName}'s quantity is still less`,
                        icon:`info`,
                        confirmButtonText: 'OK',
                        confirmButtonColor: 'var(--color-primary)',
                    })
                    row.children[3].textContent = newTotal;
                    row.style.color = 'var(--color-red)';
                    row.style.fontWeight = 'bold';
                }else {
                    row.children[3].textContent = newTotal;
                    row.style.color = 'var(--color-black)';
                    row.style.fontWeight = 'normal';
                }
            }

        }
    });
}

function stockBatch_ClearFunction(e) {
    const id = e.id.split("_")[1];
    const row = document.getElementById(`stock-out-row_${id}`);
    row.children[3].textContent = `0`;
    row.style.color = 'var(--color-red)';
    row.style.fontWeight = 'bold';
}

const stock_batch_submit_btn = document.getElementById('stock_batch_submit_btn')
stock_batch_submit_btn.addEventListener('click', async ()=> {
    const content = document.querySelector('.content_sales');
    let content_id = content.id.split("_")[1];
    let stock_batch_content = stock_multiple_section_table.childElementCount;
    if (!stock_batch_content) {
        Swal.fire({
            title: `Error`,
            text: `No item is present!`,
            icon:`warning`,
            confirmButtonText: 'OK',
            confirmButtonColor: 'var(--color-primary)',
        })
        return;
    }
    const rows = stock_multiple_section_table.querySelectorAll("tr");
    let productStockListDto = [];
    rows.forEach(e => {
        let updatedQuantity = parseInt(e.children[3].innerHTML);
        if (updatedQuantity > 0) {
            let productStockDto = {
                id: e.dataset.productid,
                name: e.dataset.product_name,
                quantity: parseInt(e.children[3].innerHTML),
                user: content_id
            }
            productStockListDto.push(productStockDto);
        }
    });

    let listLength = productStockListDto.length
    if (listLength == 0) {
        Swal.fire({
            title: `Error`,
            text: `No update made!`,
            icon:`warning`,
            confirmButtonText: 'OK',
            confirmButtonColor: 'var(--color-red)',
        })
        return;
    }

    stock_multiple_section_table.innerHTML = '';
    try {
        let response = await fetch(`http://localhost:8081/api/product/stock/update_batch`,{
            method:'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productStockListDto)
        });
        let data = await response.json();
        if (data.status === true) {
            showUpdatedProductNotification(data.message)
        }
    } catch (error) {
        console.log(error)
    };
    fetchRestockNotification();
    fetchTotalAvailableProduct();
    products = await fetchProducts();
    updateProductStockTable(products);
    switchToMultipleTab();
})

const show_product_stock_Update = document.querySelector('.show_product_stock_Update');
const show_product_text = document.getElementById('show_product_stock_Update');
function showUpdatedProductNotification(text) {
    show_product_stock_Update.classList.add("show")
    show_product_text.innerHTML = text;
    setTimeout(() => {
        show_product_stock_Update.classList.remove("show")
        show_product_text.innerHTML = text;
    }, 3000); // 5 seconds
}
//=======================PRODUCT STOCK===================================

//=======================ALERT MESSAGES===================================
const alert_btn = document.querySelector('.alert_btn');
const message_alert_main = document.querySelector('.message_alert_main');
const message_alert_close_btn = document.querySelector('.message_alert_close_btn');

alert_btn.addEventListener('click',()=> {
    if(!message_alert_main.classList.contains('show')){
        message_alert_main.classList.add('show');
    }
})

message_alert_close_btn.addEventListener('click',()=> {
    if(message_alert_main.classList.contains('show')){
        message_alert_main.classList.remove('show');
    }
})

message_alert_main.addEventListener('click',(e)=> {
    if(e.target.classList.contains('show')){
        message_alert_main.classList.remove('show');
    }
});
//=================================ALERT MESSAGES==================================



//==============================ACCOUNT SETTINGS===================================
const current_password_input = document.getElementById('current_password');
const new_password_input = document.getElementById('new_password');
const confirm_password_input = document.getElementById('confirm_password');

const current_password_toggle = document.getElementById('current_password_toggle');
const new_password_toggle = document.getElementById('new_password_toggle');
const confirm_password_toggle = document.getElementById('confirm_password_toggle');

const change_password_submit_btn = document.getElementById('change_password_submit_btn');

let isCurrentPasswordVisible = false;
let isNewPasswordVisible = false;
let isConfirmPasswordVisible = false;

current_password_toggle.addEventListener('click', ()=> {
    isCurrentPasswordVisible = !isCurrentPasswordVisible;
    if (isCurrentPasswordVisible) {
        current_password_toggle.innerHTML = '<i class="uil uil-eye"></i>';
        current_password_input.type = "text";
    } else {
        current_password_toggle.innerHTML = '<i class="uil uil-eye-slash"></i>';
        current_password_input.type = "password";
    }
})

new_password_toggle.addEventListener('click', ()=> {
    isNewPasswordVisible = !isNewPasswordVisible;
    if (isNewPasswordVisible) {
        new_password_toggle.innerHTML = '<i class="uil uil-eye"></i>';
        new_password_input.type = "text";
    } else {
        new_password_toggle.innerHTML = '<i class="uil uil-eye-slash"></i>';
        new_password_input.type = "password";
    }
})

confirm_password_toggle.addEventListener('click', ()=> {
    isConfirmPasswordVisible = !isConfirmPasswordVisible;
    if (isConfirmPasswordVisible) {
        confirm_password_toggle.innerHTML = '<i class="uil uil-eye"></i>';
        confirm_password_input.type = "text";
    } else {
        confirm_password_toggle.innerHTML = '<i class="uil uil-eye-slash"></i>';
        confirm_password_input.type = "password";
    }
})


//validating characters and length
// Function to validate password

new_password_input.addEventListener('keyup', ()=> {
    let password = new_password_input.value;
    let password_hint = document.querySelector('.password_hint');
    if (password.length >= 8) {
        password_hint.classList.add('hide')
    }else {
        password_hint.classList.remove('hide')
    }
});
confirm_password_input.addEventListener('keyup', () =>{
    let password_new = new_password_input.value;
    let password_confirm = confirm_password_input.value;
    let password_mismatch = document.querySelector('.password_mismatch');
    if (password_confirm.length >= 8) {
        if (password_new === password_confirm) {
            password_mismatch.classList.remove('show')
        }else{
            password_mismatch.classList.add('show')
        }
    }else {
        password_mismatch.classList.add('show')
    }
})
//validating characters and length

change_password_submit_btn.addEventListener('click', async()=> {
    const account_header = document.querySelector('.content_sales');
    let content_id = account_header.id.split("_")[1];
    let current_password = current_password_input.value;
    let new_password = new_password_input.value;
    let password_confirm = confirm_password_input.value;

    if (current_password_input.value == '') {
        Swal.fire({
            icon: 'error',
            text: 'Please enter current password',
            confirmButtonColor: `var(--color-red)`
        });
        return
    }

    //Checking new and confirm password
    if (new_password.length < 8 || password_confirm.length < 8 || new_password != password_confirm) {
        Swal.fire({
            icon: 'error',
            text: 'Invalid password',
            confirmButtonColor: `var(--color-red)`
        });
        return
    }

    const PasswordChangeDto = {
        worker: content_id,
        currentPassword: current_password,
        newPassword: new_password,
    }
    try {
        let response = await fetch('http://localhost:8081/api/users/change_password', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(PasswordChangeDto)
        });
        let results = await response.json();
        if(results.status === true) {
            Swal.fire({
                title: 'Password Change',
                icon: 'success',
                position: "top-end",
                text: `${results.message}`,
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            });
            clearPasswordFields();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Password Change',
                text: `${results.message}`,
                confirmButtonColor: `var(--color-red)`,
            });
            current_password_input.value = '';
            alertError(current_password_input);
        }
    } catch (error) {
        console.log("error changing password: " + error)
    }
});

function clearPasswordFields() {
    current_password_input.value = '';
    new_password_input.value = '';
    confirm_password_input.value = '';
}


function alertError(input) {
    input.style.borderColor = `var(--color-red)`;
    setTimeout(() => {
        input.style.borderColor = `var(--color-primary)`;
    }, 6000);//6 seconds
}
//=======================ACCOUNT CONTENT===================================