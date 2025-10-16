//Changing Display Content and Active SideBar {dashboard, sales, product_stock, add_product, sign_out}
const menu_items = document.querySelectorAll('.menu_items');
const content_dashboard = document.querySelector('.content_dashboard');
const transaction_content = document.querySelector('.transaction_content');
const invoice_content = document.querySelector('.invoice_content');
const customer_content = document.querySelector('.customer_content');
const content_addProduct = document.querySelector('.content_addProduct');
const content_product_inventory = document.querySelector('.content_product_inventory');
const report_content = document.querySelector('.report_content');
const content_account_settings = document.querySelector('.content_account_settings');
const content_signOut = document.querySelector('.content_signOut');
let  transaction_id;
menu_items.forEach((element, i) => {
    element.addEventListener('click', async () => {
        removeActiveMenu();
        element.classList.add('active');
        switch (i) {
            case 0://dashboard content
                content_dashboard.classList.remove('hidden');
                transaction_content.classList.remove('show');
                invoice_content.classList.remove('show');
                customer_content.classList.remove('show');
                content_addProduct.classList.remove('show');
                content_product_inventory.classList.remove('show');
                report_content.classList.remove('show');
                content_account_settings.classList.remove('show');
                transactionsCount ();
                fetchTotalAvailableProduct();
                fetchTotalSoldQuantityProduct();
                fetchTotalSale ();
                break;
            case 1://transaction content
                content_dashboard.classList.add('hidden');
                transaction_content.classList.add('show');
                invoice_content.classList.remove('show');
                customer_content.classList.remove('show');
                content_addProduct.classList.remove('show');
                content_product_inventory.classList.remove('show');
                report_content.classList.remove('show');
                content_account_settings.classList.remove('show');
                //
                getProductCategory();
                customerTransactionData = await getDailyCustomerTransactions();
                buildCustomerTransactionTable(customerTransactionData);
                transactionsCount ();
                fetchTotalAvailableProduct();
                fetchTotalSoldQuantityProduct();
                fetchTotalSale ();
                break;
            case 2://invoice content
                content_dashboard.classList.add('hidden');
                transaction_content.classList.remove('show');
                invoice_content.classList.add('show');
                customer_content.classList.remove('show');
                content_addProduct.classList.remove('show');
                content_product_inventory.classList.remove('show');
                report_content.classList.remove('show');
                content_account_settings.classList.remove('show');
                products = await fetchProducts()
                buildInvoiceProductTable(products)
                clearInvoiceDetails ();
                break;
            case 3://customer content
                content_dashboard.classList.add('hidden');
                transaction_content.classList.remove('show');
                invoice_content.classList.remove('show');
                customer_content.classList.add('show');
                content_addProduct.classList.remove('show');
                content_product_inventory.classList.remove('show');
                report_content.classList.remove('show');
                content_account_settings.classList.remove('show');
                customersInfo = await getCustomersInfo();
                buildCustomerInfoTable(customersInfo)
                break;
            case 4://add product content
                content_dashboard.classList.add('hidden');
                transaction_content.classList.remove('show');
                invoice_content.classList.remove('show');
                customer_content.classList.remove('show');
                content_addProduct.classList.add('show');
                content_product_inventory.classList.remove('show');
                report_content.classList.remove('show');
                content_account_settings.classList.remove('show');
                //
                getProductCategory();
                transactionsCount ()
                fetchTotalAvailableProduct();
                fetchTotalSoldQuantityProduct();
                fetchTotalSale ();
                break;
            case 5://product inventory content
                content_dashboard.classList.add('hidden');
                transaction_content.classList.remove('show');
                invoice_content.classList.remove('show');
                customer_content.classList.remove('show');
                content_addProduct.classList.remove('show');
                content_product_inventory.classList.add('show');
                report_content.classList.remove('show');
                content_account_settings.classList.remove('show');
                //
                products = await fetchProducts();
                buildInventory_table(products);
                getProductCategory();
                clearEditedInputs();
                transactionsCount ()
                fetchTotalAvailableProduct();
                fetchTotalSoldQuantityProduct();
                fetchTotalSale ();
                productHistory = await getDailyProductHistory();
                buildProductHistoryTable(productHistory);
                break;
            case 6://reports content
                content_dashboard.classList.add('hidden');
                transaction_content.classList.remove('show');
                invoice_content.classList.remove('show');
                customer_content.classList.remove('show');
                content_addProduct.classList.remove('show');
                content_product_inventory.classList.remove('show');
                report_content.classList.add('show');
                content_account_settings.classList.remove('show');
                //
                fetchSalesCharts ()
                transactionsCount ()
                fetchTotalAvailableProduct();
                fetchTotalSoldQuantityProduct();
                fetchTotalSale ();
                break;
            case 7://Account content
                content_dashboard.classList.add('hidden');
                transaction_content.classList.remove('show');
                invoice_content.classList.remove('show');
                customer_content.classList.remove('show');
                content_addProduct.classList.remove('show');
                content_product_inventory.classList.remove('show');
                report_content.classList.remove('show');
                content_account_settings.classList.add('show');
                transactionsCount ()
                fetchTotalAvailableProduct();
                fetchTotalSoldQuantityProduct();
                fetchTotalSale ();
                users = await getAllUsers();
                buildUsersTable (users)
                break;
            case 9://logout code
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

//FOR MOBILE PHONES MENUS
const menu_items_sm = document.querySelectorAll('.menu_items_sm');
menu_items_sm.forEach((element, i) => {
    element.addEventListener('click', async () => {
        removeActiveMenu();
        element.classList.add('active');
        switch (i) {
            case 0://dashboard content
                content_dashboard.classList.remove('hidden');
                transaction_content.classList.remove('show');
                invoice_content.classList.remove('show');
                customer_content.classList.remove('show');
                content_addProduct.classList.remove('show');
                content_product_inventory.classList.remove('show');
                report_content.classList.remove('show');
                content_account_settings.classList.remove('show');
                transactionsCount ();
                fetchTotalAvailableProduct();
                fetchTotalSoldQuantityProduct();
                fetchTotalSale ();
                location.reload();
                break;
            case 1://transaction content
                content_dashboard.classList.add('hidden');
                transaction_content.classList.add('show');
                invoice_content.classList.remove('show');
                customer_content.classList.remove('show');
                content_addProduct.classList.remove('show');
                content_product_inventory.classList.remove('show');
                report_content.classList.remove('show');
                content_account_settings.classList.remove('show');
                //
                getProductCategory();
                customerTransactionData = await getDailyCustomerTransactions();
                buildCustomerTransactionTable(customerTransactionData);
                transactionsCount ();
                fetchTotalAvailableProduct();
                fetchTotalSoldQuantityProduct();
                fetchTotalSale ();
                break;
            case 2://invoice content
                content_dashboard.classList.add('hidden');
                transaction_content.classList.remove('show');
                invoice_content.classList.add('show');
                customer_content.classList.remove('show');
                content_addProduct.classList.remove('show');
                content_product_inventory.classList.remove('show');
                report_content.classList.remove('show');
                content_account_settings.classList.remove('show');
                products = await fetchProducts()
                buildInvoiceProductTable(products)
                clearInvoiceDetails ();
                break;
            case 3://customer content
                content_dashboard.classList.add('hidden');
                transaction_content.classList.remove('show');
                invoice_content.classList.remove('show');
                customer_content.classList.add('show');
                content_addProduct.classList.remove('show');
                content_product_inventory.classList.remove('show');
                report_content.classList.remove('show');
                content_account_settings.classList.remove('show');
                customersInfo = await getCustomersInfo();
                buildCustomerInfoTable(customersInfo)
                break;
            case 4://add product content
                content_dashboard.classList.add('hidden');
                transaction_content.classList.remove('show');
                invoice_content.classList.remove('show');
                customer_content.classList.remove('show');
                content_addProduct.classList.add('show');
                content_product_inventory.classList.remove('show');
                report_content.classList.remove('show');
                content_account_settings.classList.remove('show');
                //
                getProductCategory();
                transactionsCount ()
                fetchTotalAvailableProduct();
                fetchTotalSoldQuantityProduct();
                fetchTotalSale ();
                break;
            case 5://product inventory content
                content_dashboard.classList.add('hidden');
                transaction_content.classList.remove('show');
                invoice_content.classList.remove('show');
                customer_content.classList.remove('show');
                content_addProduct.classList.remove('show');
                content_product_inventory.classList.add('show');
                report_content.classList.remove('show');
                content_account_settings.classList.remove('show');
                //
                products = await fetchProducts();
                buildInventory_table(products);
                getProductCategory();
                clearEditedInputs();
                transactionsCount ()
                fetchTotalAvailableProduct();
                fetchTotalSoldQuantityProduct();
                fetchTotalSale ();
                productHistory = await getDailyProductHistory();
                buildProductHistoryTable(productHistory);
                break;
            case 6://reports content
                content_dashboard.classList.add('hidden');
                transaction_content.classList.remove('show');
                invoice_content.classList.remove('show');
                customer_content.classList.remove('show');
                content_addProduct.classList.remove('show');
                content_product_inventory.classList.remove('show');
                report_content.classList.add('show');
                content_account_settings.classList.remove('show');
                //
                fetchSalesCharts ()
                transactionsCount ()
                fetchTotalAvailableProduct();
                fetchTotalSoldQuantityProduct();
                fetchTotalSale ();
                break;
            case 7://Account content
                content_dashboard.classList.add('hidden');
                transaction_content.classList.remove('show');
                invoice_content.classList.remove('show');
                customer_content.classList.remove('show');
                content_addProduct.classList.remove('show');
                content_product_inventory.classList.remove('show');
                report_content.classList.remove('show');
                content_account_settings.classList.add('show');
                transactionsCount ()
                fetchTotalAvailableProduct();
                fetchTotalSoldQuantityProduct();
                fetchTotalSale ();
                users = await getAllUsers();
                buildUsersTable (users)
                break;
            case 9://logout code
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
//END OF MENUS

let products = [];
let customerTransactionData = [];
let customersInfo = [];
let productHistory = [];

//DASHBOARD
//DASHBOARD CHART
async function fetchSalesCharts () {
    try {
        let response = await fetch('https://rockpos.onrender.com/api/sale/daily_report', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        let sales = await response.json();
        let categories = Array.from(sales).map((item)=> item.category);
        let totalQuantity = Array.from(sales).map((item)=> item.totalQuantity);
        let totalSales = Array.from(sales).map((item)=> item.totalAmount);
        adminBarChart(totalQuantity, categories)
        adminLineChart(totalSales, categories)
    } catch (error) {
        console.error('Error fetching chart details:', error);
    }
}
fetchSalesCharts ()
//Colors
let primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
let primaryDeep = getComputedStyle(document.documentElement).getPropertyValue('--color-primary-deep').trim();
let primaryRed = getComputedStyle(document.documentElement).getPropertyValue('--color-red').trim();
//Colors
function adminBarChart(totalQuantity, categories) {
    const barChart = document.getElementById("admin_dashboard_chart-bar");
    barChart.innerHTML = '';
    var barChartOptions = {
        series: [{
            data: totalQuantity,
            name: 'Quantity'
        }],
        chart: {
            type: 'bar',
            background: 'transparent',//chart background
            height: 350,
            toolbars: {
                show: false
            }
        },
        colors: [
            primaryColor,
            primaryRed,
            primaryDeep,
            '#ff6d00',
            '#583cb3'
        ],
        plotOptions: {
            bar: {
                distributed: true,
                borderRadius: 1,
                horizontal: false,
                columnWidth: '70%'//size of the bar
            }
        },
        dataLabels: {
            enabled: true
        },
        fill: {
            opacity: 1
        },
        grid: {
            borderColor: '#55596e',//Border colors
            yaxis: {
                lines: {
                    show: true
                },
            },
            xaxis: {
                lines: {
                    show: true,
                }
            },
        },
        legend: {
            labels: {
                colors: '#000'// top small labels color
            },
            show: true,
            position: 'top'// top small labels position
        },
        stroke: {
            colors: ['transparent'], //bar chart stroke color
            show: true,
            width: 1
        },
        tooltip: {
            shared: true,
            intersect: false,
            theme: 'dark' // the hover tooltip color
        },
        //Categories on xaxis
        xaxis: {
            categories: categories,
            title: {
                style: {
                    color: '#f5f7ff'//--
                },
            },
            axisBorder: {
                show: true,
                color: '#55596e',// xaxis base line color
            },
            axisTicks: {
                show: true,
                color: '#55596e', //xaxis base markings color
            },
            labels: {
                style: {
                    colors: '#000',//xaxis base labels color
                },
            },
        },
        //yaxis

        yaxis: {
            title: {
                text: 'Quantity Sold',
                style: {
                    color: '#000',//yaxis base label color
                },
            },
            axisBorder: {
                color: '#55596e',//yaxis vertical line color
                show: true,
            },
            axisTicks: {
                color: '#55596e',//yaxis vertical line markings color
                show: true,
            },
            labels: {
                style: {
                    colors: '#000'// //yaxis vertical labels color
                },
            },
        },
    }//End of options
    const adminBarChart = new ApexCharts(barChart,  barChartOptions);
    adminBarChart.render();
}
//Line Chart

//Area Chart
function adminLineChart(totalSale, categories) {
    const adminAreaChart = document.getElementById("admin_dashboard_chart-line");
    adminAreaChart.innerHTML = '';
    var areaChartOptions = {
        series: [{
            data: totalSale,
            name: 'Amount GH&#8373'
        }],
        chart: {
            type: 'area',
            background: 'transparent',//chart background
            height: 350,
            stacked: false,
            toolbars: {
                show: false
            }
        },
        colors: [
            primaryDeep,primaryColor,
        ],
        dataLabels: {
            enabled: true
        },
        fill: {
            gradient: {
                opacityFrom: 1,
                opacityTo: 1,
                shadeIntensity: 0.5,
                stops: [0,100],
                type:'vertical',
            },
            type: 'gradient',
        },
        grid: {
            borderColor: '#55596e',//Border colors
            yaxis: {
                lines: {
                    show: true
                },
            },
            xaxis: {
                lines: {
                    show: true,
                }
            },
        },
        legend: {
            labels: {
                colors: '#000'// top small labels color
            },
            show: true,
            position: 'top'// top small labels position
        },
        markers: {
            size: 6,
            strokeColors: '#1b2635',
            strokeWidth: 3,
        },
        stroke: {
            curve: 'smooth'
        },
        tooltip: {
            shared: true,
            intersect: false,
            theme: 'dark' // the hover tooltip color
        },
        //Categories on xaxis
        xaxis: {
            categories: categories,
            title: {
                style: {
                    color: '#f5f7ff'//--
                },
            },
            axisBorder: {
                show: true,
                color: '#55596e',// xaxis base line color
            },
            axisTicks: {
                show: true,
                color: '#55596e', //xaxis base markings color
            },
            labels: {
                style: {
                    colors: '#000',//xaxis base labels color
                },
            },
        },
        //yaxis

        yaxis: {
            title: {
                text: 'Amount GHC',
                style: {
                    color: '#000',//yaxis base label color
                },
            },
            axisBorder: {
                color: '#55596e',//yaxis vertical line color
                show: true,
            },
            axisTicks: {
                color: '#55596e',//yaxis vertical line markings color
                show: true,
            },
            labels: {
                style: {
                    colors: '#000'// //yaxis vertical labels color
                },
            },
        },
    }//End of options
    const adminBarChart = new ApexCharts(adminAreaChart,  areaChartOptions);
    adminBarChart.render();
}

//Area Chart

//Count transaction
async function transactionsCount () {
    try {
        let response = await fetch('https://rockpos.onrender.com/api/sale/transact/count', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        let count = await response.json();
        if (response.ok) {
            document.getElementById('dashboard_transaction_count').innerHTML = count;
        }
    } catch (error) {
        console.error('getting sale transactions:', error);
    }
}
transactionsCount()

//total available products
async function fetchTotalAvailableProduct () {
    try {
        let response = await fetch('https://rockpos.onrender.com/api/product/get_available', {
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

//fetch all total sold products quantity
async function fetchTotalSoldQuantityProduct () {
    try {
        let response = await fetch('https://rockpos.onrender.com/api/sale/total_quantity', {
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

//fetch all total daily sales
async function fetchTotalSale () {
    try {
        let response = await fetch('https://rockpos.onrender.com/api/sale/total_sale', {
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

//=======================DASH BOARD DATA CONTENT===================================

//========================Transactions===================================
const transaction_table = document.getElementById('transaction_section_table_body');
const transaction_search = document.getElementById('transaction_search');
async function getDailyCustomerTransactions() {
    try {
        const response = await fetch('https://rockpos.onrender.com/api/sale/sale_trans', {
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
        console.error('Error getting sale transactions:', error);
    }
}

function buildCustomerTransactionTable(data) {
    transaction_table.innerHTML = '';
    data.forEach((transaction, i) => {
        let customer = convertToSentenceName(transaction.customer.name)
        let contact = transaction.customer.contact;
        let dateTime = transaction.date;
        let date = dateTime.split(" ")[0]
        let time = dateTime.split(" ")[1] + " " + dateTime.split(" ")[2];
        let totalQuantity = transaction.quantity.split(",").map(Number).reduce((acc, cur)=> acc + cur, 0)
        let totalTransaction = transaction.totalTransaction.split(",").map(Number).reduce((acc, cur)=> acc + cur, 0)
        let user = transaction.user;
        let row = ` <tr data-index = "${i}">
                        <td>${customer}</td>
                        <td class="cart_price_column_sm">${contact}</td>
                        <td class="cart_price_column_sm">${date}</td>
                        <td class="cart_price_column_sm">${time}</td>
                        <td>${totalQuantity}</td>
                        <td>${parseFloat(totalTransaction).toFixed(2)}</td>
                        <td class="cart_price_column_sm">${user}</td>
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
        let fullname = firstname + " " + lastname;
        return fullname;
    }else {
        let f_name = name.split(" ")[0];
        let fullname = f_name.charAt(0).toUpperCase() + f_name.slice(1);
        return fullname;
    }
}
//custom transactions
const get_all_transactions_btn = document.getElementById('get_all_transactions');
const transaction_date = document.getElementById('transaction_date');
const get_customDate_transaction_btn = document.getElementById('get_customDate_transaction');

get_all_transactions_btn.addEventListener('click', async ()=> {
    try {
        const response = await fetch('https://rockpos.onrender.com/api/sale/admin/sale_trans/all', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        let transaction = await response.json();
        if (response.ok) {
            customerTransactionData = transaction;
            buildCustomerTransactionTable(customerTransactionData);
        }
    } catch (error) {
        console.error('Error getting sale transactions:', error);
    }
});

get_customDate_transaction_btn.addEventListener('click', async ()=> {
    const date = transaction_date.value;
    if (date == '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please select a date',
            confirmButtonColor: 'var(--color-red)',
        })
        return;
    }
    transaction_date.value = '';
    try {
        const response = await fetch('https://rockpos.onrender.com/api/sale/admin/sale_trans/date', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(date),
        });
        //clear date feild
        let transaction = await response.json();
        if (response.ok) {
            customerTransactionData = transaction;
            let length = customerTransactionData.length;
            if (length == 0) {
                Swal.fire({
                    icon: 'info',
                    title: 'Oops!',
                    text: 'No product transaction found for the selected date',
                    confirmButtonColor: 'var(--color-primary)',
                });
                return;
            }
            buildCustomerTransactionTable(customerTransactionData);
        }
    } catch (error) {
        console.error('Error getting sale transactions:', error);
    }
});
//custom transactions
//========================Transactions=========================================


//========================INVOICE SECTION=========================================
const invoice_previous_btn = document.getElementById('invoice_previous_btn');
const clearTable_invoice_btn = document.getElementById('clearTable_invoice_btn');
const generate_invoice_btn = document.getElementById('generate_invoice_btn');
const invoice_generation_wrapper = document.querySelector('.invoice_generation_wrapper');
const invoice_print_wrapper = document.querySelector('.invoice_print_wrapper');
const invoice_product_search = document.getElementById('invoice_product_search');
const invoice_section_table_body = document.getElementById('invoice_section_table_body');
const add_invoice_table_body = document.getElementById('add_invoice_table_body');
const total_invoice_value = document.getElementById('total_invoice_value');

invoice_product_search.addEventListener('keyup', ()=> {
    let search = invoice_product_search.value.toLowerCase()
    let filteredProducts = products.filter(product => product.name.toLowerCase().includes(search));
    buildInvoiceProductTable(filteredProducts)

});

function buildInvoiceProductTable(ProductData){
    invoice_section_table_body.innerHTML = '';
    ProductData.forEach((product, index) => {
        let row = `<tr id = "invoiceProductTable_${product.id}">
                  <td>${product.name}</td>
                  <td>${parseFloat(product.price).toFixed(2)}</td>
                  <td>
                    <button id = "invoiceAdd_${index}" class="btn btn_primary"  onclick={addInvoiceProductFunction(this)}> <i class="uil uil-plus"></i><span class="text_cartBtn">Add</span></button>
                  </td>
            </tr>
            `
        invoice_section_table_body.innerHTML += row;
    })
}

function addInvoiceProductFunction(index) {
    let product_index = index.id.split("_")[1];
    let product = products[product_index];
    let currentGrandTotal = parseFloat(total_invoice_value.textContent);
    let name = product.name;
    let price = product.price;
    Swal.fire({
        title: 'Add Quantity',
        html: `${name}: Price(GH&#8373) = ${parseFloat(price).toFixed(2)}`,
        input: 'number',
        inputAttributes: {min: 1, max: 1000},
        showCancelButton: true,
        confirmButtonText: 'Add <i class="uil uil-plus"></i>',
        confirmButtonColor: 'var(--color-primary)',
        cancelButtonText: 'Cancel',
        cancelButtonColor: 'var(--color-red)',
    }).then((result) => {
        if (result.value) {
            let quantity = result.value;
            let total = quantity * price;
            let row = `<tr id = "add_invoiceTable_${product.id}">
                            <td>${name}</td>
                            <td>${parseFloat(price).toFixed(2)}</td>
                            <td>${quantity}</td>
                            <td>${parseFloat(total).toFixed(2)}</td>
                            <td>
                              <div class="cart_table_btns">
                                <button id = "invoiceAdded-edit_${product.id}" class="btn btn_primary"  onclick={editAddedInvoiceProductFunction(this)}><i class="uil uil-edit"></i><span class="text_cartBtn">Edit</span></button>
                                <button id = "invoiceAdd-remove_${product.id}" class="btn btn_danger"  onclick={removeAddedInvoiceProductFunction(this)}><i class="uil uil-trash-alt"></i><span class="text_cartBtn">Remove</span></button>
                              </div>
                            </td>
                        </tr>`;
            add_invoice_table_body.innerHTML += row;
            let newGrandTotal = parseFloat(currentGrandTotal) + parseFloat(total);
            total_invoice_value.textContent = parseFloat(newGrandTotal).toFixed(2);
        }
    });
}

clearTable_invoice_btn.addEventListener('click', ()=> {
    add_invoice_table_body.innerHTML = '';
    total_invoice_value.textContent = `0.00`;
});

function editAddedInvoiceProductFunction(btn) {
    let row_id = btn.id.split("_")[1];
    let row = document.getElementById(`add_invoiceTable_${row_id}`);
    let currentGrandTotal = parseFloat(total_invoice_value.textContent);
    let currentTotal = parseFloat(row.children[3].textContent);
    let price = parseFloat(row.children[1].textContent);
    let name = row.children[0].textContent
    Swal.fire({
        title: 'Add Quantity',
        html: `${name}: Price(GH&#8373) = ${parseFloat(price).toFixed(2)}`,
        input: 'number',
        inputAttributes: {min: 1, max: 1000},
        showCancelButton: true,
        confirmButtonText: 'Save <i class="uil uil-save"></i>',
        confirmButtonColor: 'var(--color-primary)',
        cancelButtonText: 'Cancel',
        cancelButtonColor: 'var(--color-red)',
    }).then((result) => {
        if (result.value) {
            const newQuantity = parseInt(result.value);
            let newTotal = newQuantity * price;
            let newGrandTotal = parseFloat(currentGrandTotal) - parseFloat(currentTotal) + newTotal;
            row.children[2].textContent = newQuantity;
            row.children[3].textContent = parseFloat(newTotal).toFixed(2);
            total_invoice_value.textContent = parseFloat(newGrandTotal).toFixed(2);
        }
    });
}

function removeAddedInvoiceProductFunction (btn) {
    let row_id = btn.id.split("_")[1];
    let row = document.getElementById(`add_invoiceTable_${row_id}`);
    let total = parseFloat(row.children[3].textContent);
    let currentGrandTotal = parseFloat(total_invoice_value.textContent);
    let newGrandTotal = parseFloat(currentGrandTotal) - parseFloat(total);
    row.remove();
    total_invoice_value.textContent = parseFloat(newGrandTotal).toFixed(2);
}

const invoice_customer_name_input = document.getElementById('invoice_customer_name');
const invoice_customer_phone_input  = document.getElementById('invoice_customer_phone');
const customer_email_input  = document.getElementById('customer_email');

const invoice_number = document.getElementById('invoice_number');
const invoice_date = document.getElementById('invoice_date');
const customer_namePrint = document.getElementById('customer_namePrint');
const customer_emailPrint = document.getElementById('customer_emailPrint');
const customer_telephonePrint = document.getElementById('customer_telephonePrint');
let invoicePrint_table_body = document.getElementById('invoicePrint_table_body');
const invoicePrint_total = document.getElementById('invoicePrint_total');
const invoice_download_btn = document.getElementById('invoice_download_btn');
const invoice_print_btn = document.getElementById('invoice_print_btn');
//Generating Invoice
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validateEmail(email) {
    return emailRegex.test(email);
}

generate_invoice_btn.addEventListener('click', async ()=> {
    let invoice_customer_name = invoice_customer_name_input.value;
    let invoice_customer_phone = invoice_customer_phone_input.value;
    let customer_email = customer_email_input.value;
    console.log(validateEmail(customer_email))
    if (invoice_customer_name == '' || customer_email == '' || invoice_customer_phone == '') {
        Swal.fire({
            text: `Enter customer's details!`,
            icon:`warning`,
            confirmButtonText: 'OK',
            confirmButtonColor: 'var(--color-primary)',
        })
        alertError(invoice_customer_name_input);
        alertError(invoice_customer_phone_input);
        alertError(customer_email_input);
        return;
    }

    if (invoice_customer_phone.length < 10) {
        Swal.fire({
            text: `Invalid telephone number`,
            icon:`warning`,
            confirmButtonText: 'OK',
            confirmButtonColor: 'var(--color-primary)',
        })
        alertError(invoice_customer_phone_input)
        return;
    }

    if (!validateEmail(customer_email)) {
        Swal.fire({
            text: `Invalid email`,
            icon:`warning`,
            confirmButtonText: 'OK',
            confirmButtonColor: 'var(--color-primary)',
        })
        alertError(customer_email_input)
        return;
    }

    let addInvoiceTableCount = add_invoice_table_body.childElementCount;
    if (!addInvoiceTableCount) {
        Swal.fire({
            title: `Error`,
            text: `No item is present!`,
            icon:`warning`,
            confirmButtonText: 'OK',
            confirmButtonColor: 'var(--color-primary)',
        })
        return;
    }

    invoice_previous_btn.classList.add('show');
    invoice_generation_wrapper.classList.add('hide');
    invoice_print_wrapper.classList.add('show');
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);// Format the date as "YYYY-MM-DD"
    const invoice_id = `#INV${new Date().getTime()}`;

    invoice_number.textContent = invoice_id;
    invoice_date.textContent = formattedDate;
    customer_namePrint.textContent = invoice_customer_name;
    customer_emailPrint.textContent = customer_email;
    customer_telephonePrint.textContent = invoice_customer_phone;

    const grandTotal = parseFloat(total_invoice_value.textContent).toFixed(2);
    let addInvoiceTableContent = add_invoice_table_body.querySelectorAll('tr');
    invoicePrint_table_body.innerHTML = '';
    addInvoiceTableContent.forEach(row => {
        let name = row.children[0].textContent;
        let price = parseFloat(row.children[1].textContent).toFixed(2);
        let quantity = parseInt(row.children[2].textContent)
        let total = parseFloat(row.children[3].textContent).toFixed(2);
        let printRow = `<tr>
                        <td>${name}</td>
                        <td>${price}</td>
                        <td>${quantity}</td>
                        <td>${total}</td>
                    </tr>`
        invoicePrint_table_body.innerHTML += printRow;
    });
    invoicePrint_total.textContent = grandTotal;
    //

    const customerDto = {
        name: invoice_customer_name,
        email: customer_email,
        contact: invoice_customer_phone,
    }
    try {
        let response = await fetch('https://rockpos.onrender.com/api/customer/admin/save', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customerDto)
        });
        let results = await response.json();
        if (response.ok) {
            console.log(results.message)
        }
    } catch (error) {
        console.log("error committing transaction: " + error)
    }

})

invoice_previous_btn.addEventListener('click', ()=> {
    invoice_previous_btn.classList.remove('show');
    invoice_generation_wrapper.classList.remove('hide');
    invoice_print_wrapper.classList.remove('show');
})

function clearInvoiceDetails () {
    invoice_number.textContent = '';
    invoice_date.textContent = '';
    customer_namePrint.textContent = '';
    customer_emailPrint.textContent = '';
    customer_telephonePrint.textContent = '';
    invoicePrint_total.textContent = '';
    invoicePrint_table_body.innerHTML = '';
}

invoice_download_btn.addEventListener('click', ()=> {
    const print_sectionWrapper = document.querySelector('.invoice_print_sectionWrapper');
    const options = {
        margin: 1,
        filename: "customer_invoice",
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 5 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'p' }
    };

    // Generate the PDF.
    html2pdf().set(options).from(print_sectionWrapper).save();
})

invoice_print_btn.addEventListener('click', ()=> {
    const invoicePrint_table_wrapper = document.querySelector('.invoicePrint_table_wrapper');
    const companyDetails = document.querySelector('.companyDetails');
    const invoiceDetails = document.querySelector('.invoiceDetails');
    const customerDetails = document.querySelector('.customerDetails');
    const printWindow =  window.open('', 'Print Window', 'width=800,height=600');
    printWindow.document.write(`
     <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          th {
              background: #4b87b8;
              color: #fff;
          }

          th, td {
            padding: 10px;
            text-align: left;
            border: 1px solid #000;
          }

          .invoicePrint_body_top {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin: 0;
          }

          .invoice_labels {
              display: flex;
              gap: 5px;
              margin: 7px 0;
          }

          .companyDetails{
              padding: 5px 10px;
              background: #4b87b8;
              display: flex;
              flex-direction: column;
              gap: 1rem;
              border-radius: 8px;
              color: #fff;
          }

          .companyDetails_left {
              padding: 5px 10px;
              display: flex;
              justify-content: space-between;
          }

          .companyDetails_right {
              padding: 5px 10px;
              display: flex;
              flex-direction: column;
              gap: 1px;
          }

          .invoiceDetails {
              padding: 5px 10px;
              display: flex;
              justify-content: space-between;
              border-top: 2px solid #babbbc;
              border-bottom: 2px solid #babbbc;
          }

          .customerDetails {
              padding: 5px 10px;
              display: flex;
              flex-direction: column;
          }

          #invoicePrint_total,
          .invoicePrint_total {
              background: #4b87b8;
              color: #fff;
              font-weight: 600;
          }

        </style>
      </head>
      <body>
        <div class="invoice_print_sectionWrapper">
            <div class="invoicePrint_body_top">
                <div class="companyDetails">
                    ${companyDetails.innerHTML}
                </div>
                <div class="invoiceDetails">
                   ${invoiceDetails.innerHTML}
                </div>
                <div class="customerDetails">
                    ${customerDetails.innerHTML}
                </div>
            </div>
            <div class="invoicePrint_table_wrapper">
                ${invoicePrint_table_wrapper.innerHTML}
            </div>
        </div>
      </body>
      </html>
    `)
    // Print the invoice
    printWindow.document.close();
    printWindow.print();
    // Close the new window
    printWindow.close();
})
//========================INVOICE SECTION=========================================

//========================CUSTOMER SECTION=========================================
const customers_search = document.getElementById('customers_search');
const customers_table_body = document.getElementById('customers_table_body');

async function getCustomersInfo() {
    try {
        const response = await fetch('https://rockpos.onrender.com/api/customer/admin/get', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        let customers = await response.json();
        if (response.ok) {
            return customers;
        }
    } catch (error) {
        console.error('getting sale transactions:', error);
    }
}

function buildCustomerInfoTable(customers) {
    customers_table_body.innerHTML = '';
    customers.forEach(cus => {
        let id = cus.customer.id;
        let name = convertToSentenceName(cus.customer.name);
        let contact = cus.customer.contact;
        let email = cus.customer.email;
        let saleCount = cus.saleCount;

        let row = ` <tr id ="customerRow_${id}">
                        <td>${name}</td>
                        <td>${contact}</td>
                        <td class="lg_text">${email}</td>
                        <td class="lg_text">${saleCount}</td>
                        <td>
                            <div class="cart_table_btns">
                                <button id = "customerEdit_${id}" class="btn btn_primary sm_btn"  onclick={customer_EditFunction(this)}><i class="uil uil-edit"></i><span class="text_cartBtn">Edit</span></button>
                                <button id = "Customer-whatsApp_${id}" class="btn btn_secondary sm_btn user_delete"  onclick={customer_messageFunction(this)}><i class="uil uil-envelope-share"></i><span class="text_cartBtn">Message</span></button>
                            </div>
                        </td>
                  </tr>`
        customers_table_body.innerHTML += row;
    });
}
buildCustomerInfoTable(customersInfo);

customers_search.addEventListener('keyup', ()=> {
    let searchValue = customers_search.value.toLowerCase();
    let filterCustomers = customersInfo.filter(cus => cus.customer.name.toLowerCase().includes(searchValue));
    buildCustomerInfoTable(filterCustomers)
});

async function customer_EditFunction(btn) {
    let cus_id = btn.id.split("_")[1];
    let customers = customersInfo.find(cus => cus.customer.id == cus_id);
    let id = customers.customer.id;
    let name = convertToSentenceName(customers.customer.name);
    let contact = customers.customer.contact;
    let email = customers.customer.email;
    let  html= `<div class = "account_edit_swal">
                    <div class = "edit_swal_groups">
                        <input id="customer_name_${id}" type="text" class="form-control" value="${name}"  placeholder="Customer name">
                        <input id="customer_contact_${id}" type="tel" class="form-control" value="${contact}" maxlength="10"  placeholder="Telephone">
                    </div>
                    <input id="customer_email_${id}" type="email" class="form-control" value="${email}"  placeholder="Email or leave blank">
                </div>
            `;
    Swal.fire({
        title: 'Edit Customer',
        html: html,
        showCancelButton: true,
        confirmButtonColor: `var(--color-primary)`,
        cancelButtonColor: `var(--color-red)`,
        confirmButtonText: `<i class="uil uil-file-edit-alt"></i> Save`,
    }).then(async (result) => {
        if (result.isConfirmed) {
            let customer_name = document.getElementById(`customer_name_${id}`).value;
            let customer_contact = document.getElementById(`customer_contact_${id}`).value;
            let customer_email = document.getElementById(`customer_email_${id}`).value;

            if (customer_name == "" || customer_contact == "" ) {
                Swal.fire({
                    icon: 'error',
                    text: 'You have to fill all input',
                    confirmButtonColor: `var(--color-red)`,
                });
                return;
            }

            if (customer_email.length > 0) {
                if (!validateEmail(customer_email)) {
                    Swal.fire({
                        text: `Invalid email`,
                        icon:`warning`,
                        confirmButtonText: 'OK',
                        confirmButtonColor: 'var(--color-primary)',
                    })
                    return;
                }
            }

            let customerUpdateDto = {
                id: id,
                name: customer_name,
                contact: customer_contact,
                email: customer_email,
            }
            console.log(customerUpdateDto)
            try {
                let response = await fetch('https://rockpos.onrender.com/api/customer/admin/update', {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(customerUpdateDto)
                });
                let results = await response.json();
                if(response.ok) {
                    Swal.fire({
                        icon: 'success',
                        position: "top-end",
                        text: `${results.message}`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    customersInfo = await getCustomersInfo();
                    buildCustomerInfoTable(customersInfo);
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        text: 'You have to fill all input',
                        confirmButtonColor: `var(--color-red)`,
                    });
                }
            } catch (error) {
                console.log("error saving customer updates: " + error)
            }

        }
    });
}

function customer_messageFunction(btn) {
    let id = btn.id.split("_")[1];
    let customers = customersInfo.find(cus => cus.customer.id == id);
    let customer_name = convertToSentenceName(customers.customer.name);
    console.log(customer_name)
    let html =  ` <div class = "cus_messageHeader">Connect with ${customer_name}</div>
                  <div class="customer_messageWrapper">
                    <button id = "Customer-whatsApp_${id}" class="btn btn_secondary sm_btn customer_whatsApp"  onclick={customer_whatsAppFunction(this)}><i class="uil uil-whatsapp"></i></button>
                    <button id = "Customer-whatsApp_${id}" class="btn btn_secondary sm_btn customer_emailMessage"  onclick={customer_emailAppFunction(this)}><i class="uil uil-envelope-edit"></i></button>
                  </div>
                `
    Swal.fire({
        title: "Message",
        html: html,
        showConfirmButton: false,
    });
}

function customer_whatsAppFunction (btn) {
    let id = btn.id.split("_")[1];
    let customers = customersInfo.find(cus => cus.customer.id == id);
    let name = convertToSentenceName(customers.customer.name);
    let contact = customers.customer.contact;
    if (contact == "no-contact" || contact == "") {
        Swal.fire({
            icon: 'error',
            text: `${name}'s number is invalid! Please update it`,
            confirmButtonColor: `var(--color-primary)`
        });
        return
    }
    window.open(`https://wa.me/${contact}`, '_blank');
}

function customer_emailAppFunction(btn) {
    let id = btn.id.split("_")[1];
    let customers = customersInfo.find(cus => cus.customer.id == id);
    let name = convertToSentenceName(customers.customer.name);
    let email = customers.customer.email;
    if (email == "no-email" || email == "") {
        Swal.fire({
            icon: 'error',
            text: `${name}'s email is invalid! Please update it`,
            confirmButtonColor: `var(--color-primary)`,
        });
        return
    }
    window.open(`mailto:${email}`, '_blank');
}
//========================CUSTOMER SECTION=========================================


//=======================ADD PRODUCT CONTENT===================================
//getting product category
const add_product_Category = document.getElementById('select_product_Category');
async function getProductCategory () {
    try {
        let response = await fetch('https://rockpos.onrender.com/api/category/get', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        let results = await response.json();
        add_product_Category.options.length = 1;
        results.forEach(element => {
            let category_id = element.id;
            let text = element.name.toLowerCase();//Converting all categories to lowercase
            let categoriesProduct = text.charAt(0).toUpperCase() + text.slice(1);// Capitalizing all categories to Sentence Cases
            const option = document.createElement("option");
            option.value = categoriesProduct;
            option.text = categoriesProduct;
            option.setAttribute(`data-category_id`, `${category_id}`);
            add_product_Category.add(option);
        });
        inventory_product_category.options.length = 1;
        const option_default = document.createElement("option");
        option_default.value = "Select Category";
        results.forEach(element => {
            let category_id = element.id;
            let text = element.name.toLowerCase();//Converting all categories to lowercase
            let categoriesProduct = text.charAt(0).toUpperCase() + text.slice(1);// Capitalizing all categories to Sentence Cases
            const option = document.createElement("option");
            option.value = categoriesProduct;
            option.text = categoriesProduct;
            option.setAttribute(`data-category_id`, `${category_id}`);
            inventory_product_category.add(option);
        });

    } catch (error) {
        console.log(error)
    }
}
getProductCategory();

//Create new product category
const save_category_btn = document.getElementById('save_category_btn');
save_category_btn.addEventListener('click', async()=> {
    let create_product_category = document.getElementById('create_product_category');
    let input_category = create_product_category.value;
    if (input_category == '' || !isNaN(input_category)){
        Swal.fire({
            icon: 'error',
            text: 'Please enter a category name',
            confirmButtonColor: `var(--color-primary)`
        });
        return
    }
    Swal.fire({
        title: 'Creating new Category',
        text: `Are you sure you want to create ${input_category} category`,
        icon: 'info',
        confirmButtonText: 'Yes',
        confirmButtonColor: `var(--color-primary)`,
        showCancelButton: true,
        cancelButtonText: 'No',
        cancelButtonColor: 'var(--color-red)',
    }).then( async(result)=>{
        if  (result) {
            let category = {
                name: input_category,
            }
            create_product_category.value = '';
            try {
                let response = await fetch('https://rockpos.onrender.com/api/category/save', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(category)
                });
                let results = await response.json();
                if(results.status === true) {
                    Swal.fire({
                        position: "top-end",
                        text: `${results.message}`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    getProductCategory();
                }
            } catch (error) {
                console.log("error committing transaction: " + error)
            }
        }
    })
});

//Adding products to table to be saved
const resetAdded_product = document.querySelector('.resetAdded_product');
const add_product_btn = document.getElementById('add_product_btn');
const added_Product_table_body = document.getElementById('added_Product_table_body');
const new_productName_input = document.getElementById('new_productName');
const new_productPrice_input = document.getElementById('new_productPrice');
const restock_level_input = document.getElementById('restock_level');

//Adding event listener to get the selected category ID
let new_product_selected_category_id;
add_product_Category.addEventListener('change', () => {
    const selectedOption = add_product_Category.options[add_product_Category.selectedIndex];
    new_product_selected_category_id = selectedOption.dataset.category_id;
});

resetAdded_product.addEventListener('click', ()=> {
    clear_createProductInput()
})
//Clearing all fields after product has been added to table
function clear_createProductInput() {
    add_product_Category.value = '0';
    new_productName_input.value = '';
    new_productPrice_input.value = '0.00';
    restock_level_input.value = '0';
}
//Adding event listener to add product to table
add_product_btn.addEventListener('click', ()=> {
    let new_productPrice = new_productPrice_input.value;
    let restock_level = restock_level_input.value;
    let new_productName = new_productName_input.value;
    let product_Category = add_product_Category.value;
    let category_id =new_product_selected_category_id;
    if (product_Category =='' || product_Category == 0){
        Swal.fire({
            icon: 'error',
            text: 'Please a select a category',
            confirmButtonColor: `var(--color-primary)`
        });
        return
    }
    if (!isNaN(new_productName) || new_productName == ''){
        Swal.fire({
            icon: 'error',
            text: 'Product name invalid',
            confirmButtonColor: `var(--color-primary)`
        });
        return
    }

    const row = document.createElement('tr');
    row.setAttribute('data-category_id', category_id);
    row.setAttribute('data-restock_level', restock_level);
    row.innerHTML = `<td>${new_productName}</td><td>${new_productPrice}</td><td>${product_Category}</td>`
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('btn','btn_danger')
    removeBtn.innerHTML = '<i class="uil uil-trash-alt"></i><span class="text_cartBtn">Remove</span>';
    removeBtn.addEventListener('click', () => {row.remove()});
    let cell_action = document.createElement('td');
    cell_action.appendChild(removeBtn);
    row.appendChild(cell_action);
    added_Product_table_body.appendChild(row);
    clear_createProductInput();
})

//Save added products
const upload_addedProduct_btn = document.querySelector('.upload_addedProduct_btn');
upload_addedProduct_btn.addEventListener('click', async ()=> {
    const added_Product_table_body = document.getElementById('added_Product_table_body');
    let table_count = added_Product_table_body.childElementCount;
    if(!table_count) {
        Swal.fire({
            icon: 'error',
            text: 'No product(s) added to table',
            confirmButtonColor: `var(--color-red)`
        });
        return
    }
    const rows = added_Product_table_body.querySelectorAll('tr');
    let productDto = Array.from(rows).map((row)=> {
        return {
            name: row.cells[0].textContent,
            category: {id: parseInt(row.dataset.category_id), name: row.cells[2].textContent},
            price: parseFloat(row.cells[1].textContent),
            quantity: parseInt(0),
            restockLevel: parseInt(row.dataset.restock_level),
        };
    });

    //clear table
    added_Product_table_body.innerHTML = '';
    try {
        const response = await fetch('https://rockpos.onrender.com/api/product/save_new', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productDto)
        });
        const data = await response.json();
        if(data.status === true) {
            Swal.fire({
                title: "Saved!",
                icon: 'success',
                position: "top-end",
                text: `${data.message}`,
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            });
        }
    } catch (error) {
        console.error('Error saving sale:', error);
    }
});
//=======================ADD PRODUCT CONTENT===================================

async function fetchProducts() {
    try {
        let response = await fetch('https://rockpos.onrender.com/api/product/get_all', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer '+ token,
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

//=======================PRODUCT INVENTORY===================================
const product_inventory_table_body = document.getElementById('inventory_section_table_body');
const inventory_product_search = document.getElementById('inventory_product_search');
const inventory_product_category = document.getElementById('inventory_product_category');
const edit_category_btn = document.getElementById('edit_category_btn');
const edit_productName = document.getElementById('edit_productName');
const edit_productPrice = document.getElementById('edit_productPrice');
const edit_restock_level = document.getElementById('edit_restock_level');
const edit_quantity = document.getElementById('edit_quantity');
const save_edit_product_btn = document.getElementById('save_edit_product_btn');


function buildInventory_table(products) {
    product_inventory_table_body.innerHTML = '';
    products.forEach(product => {
        const row = `<tr id = invent-row_${product.id} data-product_id = ${product.id} data-restock_level=${product.productStock.restockLevel} onclick={editFunction(this)}>
                        <td>${product.name}</td>
                        <td>${parseFloat(product.price).toFixed(2)}</td>
                        <td>${product.quantity}</td>
                        <td><button class="btn btn_primary"><i class="uil uil-edit"></i><span class="text_cartBtn">Edit</span></button></td>
                    </tr>`
        product_inventory_table_body.innerHTML += row;
    });
}

//search functionality
inventory_product_search.addEventListener('keyup', ()=> {
    let search_key  = inventory_product_search.value.toLowerCase();
    let filteredProducts = products.filter(product => product.name.toLowerCase().includes(search_key));
    buildInventory_table(filteredProducts);
})

function editFunction (event) {
    const id = event.id;
    const row = document.getElementById(`${id}`);
    edit_productName.setAttribute(`data-product_id`, row.dataset.product_id)
    edit_productName.value = row.children[0].textContent;
    edit_productPrice.value = parseFloat(row.children[1].textContent).toFixed(2);
    edit_restock_level.value = parseInt(row.dataset.restock_level);
    edit_quantity.value = parseInt(row.children[2].textContent);
    enableEditInputs();
}

save_edit_product_btn.addEventListener('click', async ()=> {
    const content = document.querySelector('.content_dashboard');
    let content_id = content.id.split("_")[1];
    const id = edit_productName.dataset.product_id;
    const name = edit_productName.value;
    const price = edit_productPrice.value;
    const restockLevel = edit_restock_level.value;
    const quantity = edit_quantity.value;
    const EditProductDto = {
        id: parseInt(id),
        name: name,
        price: parseFloat(price).toFixed(2),
        restockLevel: parseInt(restockLevel),
        quantity: parseInt(quantity),
        user: content_id
    }
    clearEditedInputs();
    try {
        const response = await fetch(`https://rockpos.onrender.com/api/product/stock/update_edit`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(EditProductDto),
        });
        const data = await response.json();
        if(data.status == true && response.ok) {
            Swal.fire({
                title: "Updated!",
                position: "top-end",
                text: data.message,
                icon: "success",
                confirmButtonColor: `var(--color-primary)`,
                timer: 1500,
                timerProgressBar: true,
            });
            products = await fetchProducts();
            buildInventory_table(products);
            getProductHistoryNotification();
        }
    } catch (error) {
        console.error(`Failed to updating ${name}:`, error);
    }
})

function clearEditedInputs() {
    edit_productName.value = '';
    edit_productPrice.value ='0.00'
    edit_quantity.value = '0'
    edit_restock_level.value = '0';
    //disable the input
    edit_productName.disabled = true;
    edit_productPrice.disabled = true;
    edit_quantity.disabled = true;
    edit_restock_level.disabled = true;
    save_edit_product_btn.disabled = true;
    save_edit_product_btn.style.backgroundColor = `var(--color-primary-disabled)`;
}

function enableEditInputs() {
    edit_productName.disabled = false;
    edit_productPrice.disabled = false;
    edit_quantity.disabled = false;
    edit_restock_level.disabled = false;
    save_edit_product_btn.disabled = false;
    save_edit_product_btn.style.backgroundColor = `var(--color-primary)`;
}

let category_delete_id;
inventory_product_category.addEventListener('change', ()=> {
    let category = inventory_product_category.value
    if (category == 0) {
        return
    }
    const selectedOption = inventory_product_category.options[inventory_product_category.selectedIndex];
    category_delete_id = selectedOption.dataset.category_id;
});

edit_category_btn.addEventListener('click', async()=> {
    const id = category_delete_id;
    if (id == 0 || id == "0" || typeof id === "undefined") {
        Swal.fire({
            icon: 'error',
            text: 'No category has been selected',
            confirmButtonColor: `var(--color-primary)`
        });
        return;
    }
    const category = inventory_product_category.value;
    Swal.fire({
        text: `Edit ${category} category`,
        icon: "info",
        input: "text",
        inputPlaceholder: "Enter quantity",
        showCancelButton: true,
        confirmButtonColor: `var(--color-primary)`,
        cancelButtonColor: `var(--color-red)`,
        confirmButtonText: "Save"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                let categoryEditDto = {
                    id: parseInt(id),
                    name: category,
                    newName: result.value
                }
                category_delete_id = 0;
                inventory_product_category.value = 0;
                const response = await fetch(`https://rockpos.onrender.com/api/category/edit`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(categoryEditDto)
                });
                const data = await response.json();
                if(data.status == true && response.ok) {
                    Swal.fire({
                        position: "top-end",
                        text: data.message,
                        icon: "success",
                        confirmButtonColor: `var(--color-primary)`,
                        timer: 1500,
                        timerProgressBar: true,
                    });
                    products = await fetchProducts();
                    buildInventory_table(products);
                    getProductCategory()
                }
            } catch (error) {
                console.error('Failed to update category:', error);
            }
        } else {
        }
    });
})
//------- Product History--------------//
const productHistory_previousBtn = document.querySelector('.productHistory_previousBtn');
const productHistory_btn = document.querySelector('.productHistory_btn');
const inventory_wrapper = document.querySelector('.inventory_wrapper');
const productHistory_wrapper = document.querySelector('.productHistory_wrapper');
const inventory_header = document.querySelector('.inventory_header');
const productHistory_search = document.getElementById('productHistory_search');
const productHistory_section_table_body = document.getElementById('productHistory_section_table_body');
const get_all_productHistory = document.getElementById('get_all_productHistory');
const get_customDate_productHistory = document.getElementById('get_customDate_productHistory');
const productHistory_date = document.getElementById('productHistory_date');

productHistory_btn.addEventListener('click', async()=> {
    showProductHistory();
});

productHistory_previousBtn.addEventListener('click', ()=> {
    hideProductHistory();
});

async function showProductHistory() {
    inventory_wrapper.classList.add('hide'); 
    productHistory_wrapper.classList.add('show'); 
    productHistory_previousBtn.classList.add('show');
    productHistory_btn.classList.add('hide');
    inventory_header.textContent = "Product History";
    productHistory = await getDailyProductHistory();
    buildProductHistoryTable(productHistory);
}

async function hideProductHistory() {
    inventory_wrapper.classList.remove('hide');
    productHistory_wrapper.classList.remove('show'); 
    productHistory_previousBtn.classList.remove('show');
    productHistory_btn.classList.remove('hide');
    inventory_header.textContent = "Product Inventory";
}


productHistory_search.addEventListener('keyup', ()=> {
    let searchValue = productHistory_search.value.toLowerCase();
    let filterProductHistory = productHistory.filter(ph => ph.product.toLowerCase().includes(searchValue));
    buildProductHistoryTable(filterProductHistory);
});

async function getDailyProductHistory() {
    try {
        const response = await fetch('https://rockpos.onrender.com/api/product_history/admin/get_daily', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        let productHistory = await response.json();
        if (response.ok) {
            return productHistory;
        }
    } catch (error) {
        console.error('Error getting product history:', error);
    }
}

function buildProductHistoryTable(productHistoryData){
    productHistory_section_table_body.innerHTML = "";
    productHistoryData.forEach(ph => {
        let p_name = ph.product;
        let dateTime = ph.date;
        let date = dateTime.split(" ")[0];
        let time = dateTime.split(" ")[1] + " " + dateTime.split(" ")[2];
        let oldQuantity = ph.oldQuantity;
        let updateQuantity = ph.updateQuantity;
        let newQuantity = ph.newQuantity;
        let user = ph.user;
        let row = `<tr>
                        <td>${p_name}</td>
                        <td class="cart_price_column_sm">${date}</td>
                        <td class="cart_price_column_sm">${time}</td>
                        <td class="cart_price_column_sm">${oldQuantity}</td>
                        <td>${updateQuantity}</td>
                        <td class="cart_price_column_sm">${newQuantity}</td>
                        <td>${user}</td>
                  </tr>
                `
        productHistory_section_table_body.innerHTML += row;
    });
}

get_all_productHistory.addEventListener('click', async()=>{
    try {
        const response = await fetch('https://rockpos.onrender.com/api/product_history/admin/get_all', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        let productHistoryData = await response.json();
        if (response.ok) {
            buildProductHistoryTable(productHistoryData);
        }
    } catch (error) {
        console.error('Error getting all product history:', error);
    }
});

get_customDate_productHistory.addEventListener('click', async()=>{
    const date = productHistory_date.value;
    if (date == '') {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Please select a date',
            confirmButtonColor: 'var(--color-red)',
        });
        return;
    }
    const salesDateRangeDto = {
        startDate: date,
        endDate: date
    }
    productHistory_date.value = "";
    try {
        const response = await fetch('https://rockpos.onrender.com/api/product_history/admin/get_by_date', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(salesDateRangeDto)
        });
        let productHistoryData = await response.json();
        if (response.ok) {
            let length = productHistoryData.length;
            if (length == 0) {
                Swal.fire({
                    icon: 'info',
                    title: 'Oops!',
                    text: 'No product history found for the selected date',
                    confirmButtonColor: 'var(--color-primary)',
                });
                return;
            }
            buildProductHistoryTable(productHistoryData);
        }
    } catch (error) {
        console.error('Error getting all product history:', error);
    }
});

//=======================alert messages==================================
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
//=================================alert messages==================================

//FETCH ALL RESTOCK NOTIFICATIONS
async function getProductHistoryNotification () {
 
        let productsHistoryList =  await getDailyProductHistory();
        let productHistoryCount = productsHistoryList.length;
        const nav_alerts_number = document.getElementById('nav_alerts_number');
        nav_alerts_number.innerHTML = productHistoryCount > 0 ? productHistoryCount: '0';
        const message_alert_content = document.getElementById('message_alert_content');
        message_alert_content.innerHTML = '';
        productsHistoryList.forEach(ph => {
            let message = ` <article class="alert_message">
                                    <span class="message_title">${ph.product}</span>
                                    <span class="message_body">${ph.product} was updated from ${ph.oldQuantity} to ${ph.newQuantity}</span>
                                </article>
                              `
            message_alert_content.innerHTML += message;
        });
        let notification = productHistoryCount == 1 ? `You have ${productHistoryCount} notification` : `You have ${productHistoryCount} notifications`
        if (productHistoryCount > 0){
            Swal.fire({
                position: "top-end",
                title: "Stock Alert",
                text: notification,
                showConfirmButton: false,
                timer: 1500,
            });
        }

}
getProductHistoryNotification();
//------- Product History--------------//


//=======================PRODUCT INVENTORY===================================

//=======================REPORT CONTENT========================================
const generate_daily_btn = document.getElementById('generate_daily_btn');
const custom_date_btn = document.getElementById('custom_date_btn');
const report_from_date_input = document.getElementById('report_from_date');
const report_to_date_input = document.getElementById('report_to_date');
const report_table_body = document.getElementById('report_table_body');


async function getSalesData() {
    try {
        let response = await fetch('https://rockpos.onrender.com/api/sale/daily_report', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        return data = await response.json();
    } catch (error) {
        console.error('Error fetching sales data:', error);
    }
}

const current_year_span = document.getElementById('current_year');
const report_date = document.getElementById('report_date');
const report_next_btn = document.getElementById('report_next_btn');
const inventory_previous_btn = document.getElementById('inventory_previous_btn');
let report_download_table_body = document.getElementById('report_download_table_body');
const report_content_wrapper = document.querySelector('.report_content_wrapper');
const report_download_section_container = document.querySelector('.report_download_section_container');

report_next_btn.addEventListener('click', ()=> {
    const table_count = report_table_body.childElementCount
    if(!table_count) {
        Swal.fire({
            icon: 'error',
            text: 'No report has been generated!!',
            confirmButtonColor: `var(--color-primary)`
        });
        return
    }
    report_content_wrapper.classList.add('hide');
    inventory_previous_btn.classList.add('show');
    report_download_section_container.classList.add('show');
});

inventory_previous_btn.addEventListener('click', ()=> {
    report_content_wrapper.classList.remove('hide');
    inventory_previous_btn.classList.remove('show');
    report_download_section_container.classList.remove('show');
    report_table_body.innerHTML = '';
});

//Generating Daily Reports
generate_daily_btn.addEventListener('click', async()=> {
    let salesData = await getSalesData();
    let categories = Array.from(salesData).map((item)=> item.category);
    let totalQuantity = Array.from(salesData).map((item)=> item.totalQuantity);
    let totalAmounts = Array.from(salesData).map((item)=> item.totalAmount);
    let totalSales = totalAmounts.reduce((accumulate, currentValue)=> accumulate + currentValue, 0);
    const currentYear = new Date().getFullYear();
    //Setting the current year
    current_year_span.textContent = currentYear;
    const currentDate = new Date();
    // Format the date as "YYYY-MM-DD"
    const formattedDate = currentDate.toISOString().slice(0, 10);
    //setting date for download section
    report_date.textContent = formattedDate;
    //Clearing report table body if data is present
    report_table_body.innerHTML = '';
    report_download_table_body.innerHTML = '';

    //Looping through the data and creating table rows[GENERATE SECTION]
    for (let i = 0; i < salesData.length; i++) {
        const row = document.createElement('tr');

        //Creating a date for the cell
        const dateCell = document.createElement('td')
        dateCell.textContent = i == 0 ? formattedDate: " ";

        //Creating cell for the categories
        const cellCategories = document.createElement('td')
        cellCategories.textContent = categories[i];

        //Creating cell for the totalQuantity
        const cellQuantity = document.createElement('td')
        cellQuantity.textContent = totalQuantity[i];

        //Creating cell for the totalAmount
        const cellTotalAmount = document.createElement('td')
        cellTotalAmount.textContent = totalAmounts[i];
        //Adding cells to the row
        row.appendChild(dateCell);
        row.appendChild(cellCategories);
        row.appendChild(cellQuantity);
        row.appendChild(cellTotalAmount);

        //Adding each row to the report table body
        report_table_body.appendChild(row)
    }
    let totalRow = `<tr class="total_report_value"><td></td><td></td><td>Total</td><td>${parseFloat(totalSales).toFixed(2)}</td></tr>`
    report_table_body.innerHTML += totalRow;

    //FOR DOWNLOAD SECTION TABLE
    for (let i = 0; i < salesData.length; i++) {
        const row = document.createElement('tr');

        //Creating a date for the cell
        const dateCell = document.createElement('td')
        dateCell.textContent = i == 0 ? formattedDate: " ";

        //Creating cell for the categories
        const cellCategories = document.createElement('td')
        cellCategories.textContent = categories[i];

        //Creating cell for the totalQuantity
        const cellQuantity = document.createElement('td')
        cellQuantity.textContent = totalQuantity[i];

        //Creating cell for the totalAmount
        const cellTotalAmount = document.createElement('td')
        cellTotalAmount.textContent = parseFloat(totalAmounts[i]);
        //Adding cells to the row
        row.appendChild(dateCell);
        row.appendChild(cellCategories);
        row.appendChild(cellQuantity);
        row.appendChild(cellTotalAmount);

        //Adding each row to the report table body
        report_download_table_body.appendChild(row)
    }
    let totalRow_download = document.createElement('tr');
    let emptyCell = document.createElement('td');
    let emptyCell1 = document.createElement('td');
    let totalText = document.createElement('td');
    let totalValue = document.createElement('td');
    totalValue.textContent = parseFloat(totalSales).toFixed(2)
    totalText.textContent = 'Total'
    totalRow_download.appendChild(emptyCell);
    totalRow_download.appendChild(emptyCell1);
    totalRow_download.appendChild(totalText);
    totalRow_download.appendChild(totalValue);
    totalRow_download.classList.add('total_report_value');
    report_download_table_body.append(totalRow_download);
});

//Generate Custom date report
custom_date_btn.addEventListener('click', async()=> {
    const fromDate = report_from_date_input.value;
    const toDate = report_to_date_input.value;
    if(fromDate == '' || toDate == '') {
        Swal.fire({
            icon: 'error',
            text: 'Enter a valid date range',
            confirmButtonColor: `var(--color-primary)`
        });
        return
    }
    const salesDateRangeDto = {
        startDate: fromDate,
        endDate: toDate
    }
    report_from_date_input.value = '';
    report_to_date_input.value = '';
    try {
        let response = await fetch('https://rockpos.onrender.com/api/sale/sale_range', {
            method: 'POST',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(salesDateRangeDto)
        });
        data = await response.json();

        if (response.ok) {
            let salesData = data;
            let categories = Array.from(salesData).map((item)=> item.category);
            let totalQuantity = Array.from(salesData).map((item)=> item.totalQuantity);
            let totalAmounts = Array.from(salesData).map((item)=> item.totalAmount);
            let totalSales = totalAmounts.reduce((accumulate, currentValue)=> accumulate + currentValue, 0);
            const currentYear = new Date().getFullYear();
            //Setting the current year
            current_year_span.textContent = currentYear;
            report_date.textContent = `${fromDate} to ${toDate}`
            //Clearing report table body if data is present
            report_table_body.innerHTML = '';
            report_download_table_body.innerHTML = '';
            //Looping through the data and creating table rows[FOR REPORT GENERATION SECTION]
            for (let i = 0; i < salesData.length; i++) {
                const row = document.createElement('tr');
                //Creating a date for the cell
                const dateCell = document.createElement('td')
                if (i == 0) {dateCell.textContent =fromDate;}
                if (i == 1) {dateCell.textContent = toDate;}
                //Creating cell for the categories
                const cellCategories = document.createElement('td')
                cellCategories.textContent = categories[i];
                //Creating cell for the totalQuantity
                const cellQuantity = document.createElement('td')
                cellQuantity.textContent = totalQuantity[i];
                //Creating cell for the totalAmount
                const cellTotalAmount = document.createElement('td')
                cellTotalAmount.textContent = totalAmounts[i];
                //Adding cells to the row
                row.appendChild(dateCell);
                row.appendChild(cellCategories);
                row.appendChild(cellQuantity);
                row.appendChild(cellTotalAmount);
                //Adding each row to the report table body
                report_table_body.appendChild(row);
            }
            let totalRow = `<tr class="total_report_value"><td></td><td></td><td>Total</td><td>${parseFloat(totalSales).toFixed(2)}</td></tr>`
            report_table_body.innerHTML += totalRow;
            //end
            //FOR REPORT DOWNLOAD SECTION TABLE
            for (let i = 0; i < salesData.length; i++) {
                const row = document.createElement('tr');
                //Creating a date for the cell
                const dateCell = document.createElement('td')
                if (i == 0) {dateCell.textContent =fromDate;}
                if (i == 1) {dateCell.textContent = toDate;}
                //Creating cell for the categories
                const cellCategories = document.createElement('td')
                cellCategories.textContent = categories[i];
                //Creating cell for the totalQuantity
                const cellQuantity = document.createElement('td')
                cellQuantity.textContent = totalQuantity[i];
                //Creating cell for the totalAmount
                const cellTotalAmount = document.createElement('td')
                cellTotalAmount.textContent = parseFloat(totalAmounts[i]);
                //Adding cells to the row
                row.appendChild(dateCell);
                row.appendChild(cellCategories);
                row.appendChild(cellQuantity);
                row.appendChild(cellTotalAmount);
                //Adding each row to the report table body
                report_download_table_body.appendChild(row);
            }
            let totalRow_download = document.createElement('tr');
            let emptyCell = document.createElement('td');
            let emptyCell1 = document.createElement('td');
            let totalText = document.createElement('td');
            let totalValue = document.createElement('td');
            totalValue.textContent = parseFloat(totalSales).toFixed(2)
            totalText.textContent = 'Total'
            totalRow_download.appendChild(emptyCell);
            totalRow_download.appendChild(emptyCell1);
            totalRow_download.appendChild(totalText);
            totalRow_download.appendChild(totalValue);
            totalRow_download.classList.add('total_report_value');
            report_download_table_body.append(totalRow_download);
        }
    } catch (error) {
        console.error('Error fetching sales data:', error);
    }
})

const report_download_btn = document.getElementById('report_download_btn');
//Download the generated report
report_download_btn.addEventListener('click', ()=> {
    report_table_body.innerHTML = '';
    const reportBody = document.querySelector('.report_download_section');
    const options = {
        margin: 1,
        filename: "Sales Report",
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 5 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'p' }
    };

    // Generate the PDF.
    html2pdf().set(options).from(reportBody).save();
});
//=======================REPORT CONTENT========================================

//=======================ACCOUNT SETTINGS===================================
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
//
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
    const account_header = document.querySelector('.account_header');
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
    clearPasswordFields();
    try {
        let response = await fetch('https://rockpos.onrender.com/api/users/change_password', {
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
//
const account_table_body = document.getElementById('account_table_body');
const firstname_input = document.getElementById('firstname');
const lastname_input = document.getElementById('lastname');
const username_input = document.getElementById('username');
const role_select = document.getElementById('role');
const btn_register_user = document.getElementById('btn_register_user');
btn_register_user.addEventListener('click', async()=> {
    const firstname = firstname_input.value;
    const lastname = lastname_input.value;
    const username = username_input.value;
    const role = role_select.value;

    if(firstname == '' || lastname == '' || username == '' || role == 0) {
        Swal.fire({
            icon: 'error',
            text: 'Fill all fields',
            confirmButtonColor: `var(--color-red)`
        });
        alertErrorInput()
        return
    }
    const RegisterUserDto = {
        firstname: firstname,
        lastname: lastname,
        username: username,
        role: role,
    };
    clearRegField();
    try {
        let response = await fetch('https://rockpos.onrender.com/api/users/admin/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(RegisterUserDto)
        });
        let results = await response.json();
        if(results.status === true) {
            Swal.fire({
                title: 'Registration',
                icon: 'success',
                position: "top-end",
                text: `${results.message}`,
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            });
            users = await getAllUsers();
            buildUsersTable(users)
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Registration',
                text: `${results.message}`,
                confirmButtonColor: `var(--color-red)`,
            });
        }
    } catch (error) {
        console.log("error registering user: " + error)
    }
})

function clearRegField () {
    firstname_input.value = ''
    lastname_input.value = ''
    username_input.value = ''
    role_select.value = '0';
}

function alertErrorInput() {
    firstname_input.style.borderColor = `var(--color-red)`;
    lastname_input.style.borderColor = `var(--color-red)`;
    username_input.style.borderColor = `var(--color-red)`;
    role_select.style.borderColor = `var(--color-red)`;
    setTimeout(() => {
        firstname_input.style.borderColor = `var(--color-primary)`;
        lastname_input.style.borderColor = `var(--color-primary`;
        username_input.style.borderColor = `var(--color-primary`;
        role_select.style.borderColor = `var(--color-primary`;
    }, 6000);//6 seconds
}
//
async function getAllUsers() {
    try {
        let response = await fetch('https://rockpos.onrender.com/api/users/admin/get_all', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        return await response.json();
    } catch (error) {
        console.log("Could not get users data:" + error);
    }
}
getAllUsers();

let users = []
//user table edit and reset
function buildUsersTable (data) {
    account_table_body.innerHTML = '';
    data.forEach(user => {
        let row = `<tr id = "user_${user.id}">
                    <td>${user.username}</td>
                    <td>${user.role}</td>
                    <td>
                      <div class="stock_table_btns">
                        <button id = "user-edit_${user.id}" class="btn btn_primary sm_btn"  onclick={user_EditFunction(this)}><i class="uil uil-plus"></i><span class="text_cartBtn">Edit</span></button>
                        <button id = "user-reset_${user.id}" class="btn btn_danger sm_btn"  onclick={user_ResetFunction(this)}><i class="uil uil-key-skeleton"></i><span class="text_cartBtn">Reset</span></button>
                      </div>
                    </td>
                </tr>`
        account_table_body.innerHTML += row;
    });
}

function user_EditFunction(user) {
    let id = user.id.split("_")[1];
    let user_data = users.find(user => user.id == id);
    Swal.fire({
        title: 'Edit User',
        html: `<div class = "account_edit_swal">
              <div class = "edit_swal_groups">
                  <input id="user_firstName_${id}" type="text" class="form-control" value="${user_data.firstname}"  placeholder="First Name">
                  <input id="user_lastName_${id}" type="text" class="form-control" value="${user_data.lastname}"  placeholder="Last Name">
              </div>
              <input id="user_email_${id}" type="email" class="form-control" value="${user_data.email}"  placeholder="Email">
              <div class = "edit_swal_groups">
                  <input id="userName_${id}" type="text" class="form-control" value="${user_data.username}"   placeholder="Username">
                  <select  name="role" id="role_${id}" required>
                      <option value="0">Select Role</option>
                        <option value="Sales-Person">Sale-Person</option>
                        <option value="Admin">Admin</option>
                      </select>
              </div>
              <button id = "user-delete_${id}" class="btn btn_danger sm_btn user_delete"  onclick={user_deleteFunction(this)}><i class="uil uil-trash"></i><span class="text_cartBtn">Delete</span></button>
          </div>
          `,
        showCancelButton: true,
        confirmButtonColor: `var(--color-primary)`,
        cancelButtonColor: `var(--color-red)`,
        confirmButtonText: `<i class="uil uil-file-edit-alt"></i> Save`,

    }).then(async (result) => {
        if (result.isConfirmed) {
            let firstname = document.getElementById(`user_firstName_${id}`).value;
            let lastname = document.getElementById(`user_lastName_${id}`).value;
            let email = document.getElementById(`user_email_${id}`).value;
            let username = document.getElementById(`userName_${id}`).value;
            let role = document.getElementById(`role_${id}`).value;
            if (firstname == "" || lastname == "" || email == "" || username=="" || role == 0) {
                Swal.fire({
                    icon: 'error',
                    text: 'You have to fill all input',
                    confirmButtonColor: `var(--color-red)`,
                });
                return;
            }
            let userDto = {
                id: id,
                firstname: firstname,
                lastname: lastname,
                email: email,
                username: username,
                role: role
            }
            try {
                let response = await fetch('https://rockpos.onrender.com/api/users/admin/edit', {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userDto)
                });
                let results = await response.json();
                if(results.status === true) {
                    Swal.fire({
                        icon: 'success',
                        position: "top-end",
                        text: `${results.message}`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    users = await getAllUsers();
                    buildUsersTable(users)
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        text: 'You have to fill all input',
                        confirmButtonColor: `var(--color-red)`,
                    });
                }
            } catch (error) {
                console.log("error saving changes: " + error)
            }

        }
    })
}

async function user_ResetFunction(user) {
    let id = user.id.split("_")[1];
    let user_data = users.find(user => user.id == id);
    let username = user_data.username;
    Swal.fire({
        text:  `Are you sure you want to reset ${username}'s account`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: `var(--color-primary)`,
        cancelButtonColor: `var(--color-red)`,
        confirmButtonText: 'Yes, reset it!',
    }).then(async (result) => {
        if (result.value) {
            try {
                const response = await fetch(`https://rockpos.onrender.com/api/users/admin/reset/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                });
                const data = await response.json();
                if(data.status === true) {
                    Swal.fire({
                        title: "Reset!",
                        icon: 'success',
                        position: "top-end",
                        text: `${data.message}`,
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                    });
                }
            } catch (error) {
                console.error('Error resetting user account:', error);
            }
        }
    });
}

//user table, edit and reset and delete
async function user_deleteFunction(user) {
    let id = user.id.split("_")[1];
    let user_data = users.find(user => user.id == id);
    let username = user_data.username;
    Swal.fire({
        text:  `Are you sure you want to delete ${username}'s account`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: `var(--color-primary)`,
        cancelButtonColor: `var(--color-red)`,
        confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
        if (result.value) {
            try {
                const response = await fetch(`https://rockpos.onrender.com/api/users/admin/delete/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                });
                const data = await response.json();
                if(data.status === true) {
                    Swal.fire({
                        title: "Delete!",
                        icon: 'success',
                        position: "top-end",
                        text: `${data.message}`,
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                    });
                    users = await getAllUsers();
                    buildUsersTable(users)
                }
            } catch (error) {
                console.error('Error deleting user account:', error);
            }
        }
    })
}
//=======================ACCOUNT SETTINGS===================================