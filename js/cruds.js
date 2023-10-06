class ManagementSystem {
    constructor() {

        this.head = document.getElementById('head');

        this.title = document.getElementById('title');
        this.price = document.getElementById('price');
        this.taxes = document.getElementById('taxes');
        this.ads = document.getElementById('ads');
        this.discount = document.getElementById('discount');
        this.total = document.getElementById('total');
        this.count = document.getElementById('count');
        this.category = document.getElementById('category');
        this.submit = document.getElementById('submit');
        this.alert = document.getElementById('alert');

        this.price.addEventListener('keyup', this.getTotal.bind(this));
        this.taxes.addEventListener('keyup', this.getTotal.bind(this));
        this.ads.addEventListener('keyup', this.getTotal.bind(this));
        this.discount.addEventListener('keyup', this.getTotal.bind(this));

        this.submit.addEventListener('click', this.createProduct.bind(this));

        this.container = [];
        this.moodCreateUpdate = 'Create';
        this.moodSearch = 'Title';
        this.indexUpdate;

        this.searchTitle = document.getElementById('searchTitle');
        this.searchCategory = document.getElementById('searchCategory');
        this.search = document.getElementById('search');

        this.searchTitle.addEventListener('click', this.convertToTitle.bind(this));
        this.searchCategory.addEventListener('click', this.convertToCategory.bind(this));
        this.search.addEventListener('keyup', this.searchData.bind(this));

        this.deleteAll = document.getElementById('deleteAll');
        this.deleteAll.addEventListener('click', this.deleteAllData.bind(this));

        this.tableBody = document.getElementById('tableBody');

        this.getAllOldData();

        this.getDetails();

        // localStorage.clear();
    }

    getDetails() {
        if (localStorage.getItem('NameOfUser') != null && localStorage.getItem('GenderOfUser') != null) {
            let gender = '';
            if (JSON.parse(localStorage.getItem('GenderOfUser')) === 'male')
                gender = 'Mr: ';
            else
                gender = 'Miss: '

            head.innerHTML = `${gender} ${JSON.parse(localStorage.getItem('NameOfUser'))} `;
        }
    }

    getAllOldData() {
        if (localStorage.getItem('products') != null) {
            this.container = JSON.parse(localStorage.getItem('products'));
        }
        this.showData();
    }

    clearData() {
        this.title.value = "";
        this.price.value = "";
        this.taxes.value = "";
        this.ads.value = "";
        this.discount.value = "";
        this.total.innerHTML = "";
        this.total.classList.replace('bg-success', 'bg-danger')
        this.count.value = "";
        this.category.value = "";
    }

    getTotal() {
        if (this.price.value != '') {

            this.total.innerHTML = +this.price.value + +this.taxes.value + +this.ads.value - +this.discount.value;
            this.total.classList.replace('bg-danger', 'bg-success')
        }
        else {

            this.total.innerHTML = '';
            this.total.classList.replace('bg-success', 'bg-danger')
        }
    }

    createProduct() {
        let newProduct = {
            title: this.title.value,
            price: this.price.value,
            taxes: this.taxes.value,
            ads: this.ads.value,
            discount: this.discount.value,
            total: this.total.innerHTML,
            count: this.count.value,
            category: this.category.value,
        }

        if (this.title.value != '' && this.price.value != '' && this.category.value != '' && this.count.value <= 100) {
            this.alert.classList.add('d-none')

            if (this.moodCreateUpdate === 'Create') {
                if (newProduct.count > 1) {
                    for (let i = 0; i < newProduct.count; i++) {
                        this.container.push(newProduct);
                    }
                }
                else
                    this.container.push(newProduct);
            }
            else {
                this.container[this.indexUpdate] = newProduct;
                this.restartToCreate();
            }
            this.clearData();
        }
        else {
            this.alert.classList.remove('d-none')
            this.alert.innerHTML = 'title, price, category is required and count less than or equal 100'
        }


        localStorage.setItem('products', JSON.stringify(this.container));

        if (this.search.value != '')
            this.searchData();
        else
            this.showData();

    }

    showData() {
        if (this.container.length > 0) {
            this.deleteAll.classList.remove('d-none');
            this.deleteAll.innerHTML = `Delete All ( ${this.container.length} )`
        }
        else
            this.deleteAll.classList.add('d-none');

        this.tableBody.innerHTML = '';
        for (let i = 0; i < this.container.length; i++) {
            let tr = document.createElement('tr');

            let tdId = document.createElement('td');
            let tdTitle = document.createElement('td');
            let tdPrice = document.createElement('td');
            let tdTaxes = document.createElement('td');
            let tdAds = document.createElement('td');
            let tdDiscount = document.createElement('td');
            let tdTotal = document.createElement('td');
            let tdCategory = document.createElement('td');

            let tdupdate = document.createElement('td');
            let tdDelete = document.createElement('td');

            let btnupdate = document.createElement('button');
            let btnDelete = document.createElement('button');

            tdId.innerHTML = i + 1;
            tdTitle.innerHTML = this.container[i].title;
            tdPrice.innerHTML = this.container[i].price;
            tdTaxes.innerHTML = this.container[i].taxes;
            tdAds.innerHTML = this.container[i].ads;
            tdDiscount.innerHTML = this.container[i].discount;
            tdTotal.innerHTML = this.container[i].total;
            tdCategory.innerHTML = this.container[i].category;

            btnupdate.setAttribute('index-Id', `${i}`);
            btnupdate.classList.add('btnUpdate', 'btn', 'btn-outline-warning', 'w-100', 'my-3');
            btnupdate.innerHTML = 'update';

            btnDelete.setAttribute('index-Id', `${i}`);
            btnDelete.classList.add('btnDelete', 'btn', 'btn-outline-danger', 'w-100', 'my-3');
            btnDelete.innerHTML = 'delete';

            tdupdate.appendChild(btnupdate);
            tdDelete.appendChild(btnDelete);

            tr.appendChild(tdId);
            tr.appendChild(tdTitle);
            tr.appendChild(tdPrice);
            tr.appendChild(tdTaxes);
            tr.appendChild(tdAds);
            tr.appendChild(tdDiscount);
            tr.appendChild(tdTotal);
            tr.appendChild(tdCategory);
            tr.appendChild(tdupdate);
            tr.appendChild(tdDelete);

            this.tableBody.prepend(tr);
        }

        this.addEventDelete();
        this.addEventUpdate();
    }

    addEventDelete() {
        let btnAllDelete = document.querySelectorAll('.btnDelete');

        var btnPressedDelete = e => {
            this.deleteData(e.target.getAttribute('index-Id'));
        }

        for (let button of btnAllDelete) {
            button.addEventListener("click", btnPressedDelete);
        }
    }

    addEventUpdate() {
        let btnAllDelete = document.querySelectorAll('.btnUpdate');

        var btnPressedDelete = e => {
            this.updateData(e.target.getAttribute('index-Id'));
        }

        for (let button of btnAllDelete) {
            button.addEventListener("click", btnPressedDelete);
        }
    }

    deleteData(temp) {
        this.container.splice(temp, 1);
        localStorage.setItem('products', JSON.stringify(this.container));
        if (this.search.value != '')
            this.searchData();
        else
            this.showData();
    }

    deleteAllData() {
        this.container.splice(0);
        localStorage.setItem('products', JSON.stringify(this.container));
        this.showData();

    }

    updateData(temp) {
        this.moodCreateUpdate = 'Update';
        this.indexUpdate = temp;
        this.getDataToUpdate(temp);
        scroll({
            top: 0,
            behavior: 'smooth'
        })
    }

    getDataToUpdate(temp) {
        this.title.value = this.container[temp].title;
        this.price.value = this.container[temp].price;
        this.taxes.value = this.container[temp].taxes;
        this.ads.value = this.container[temp].ads;
        this.discount.value = this.container[temp].discount;
        this.getTotal();
        this.count.classList.add('d-none');
        this.category.value = this.container[temp].category;
        this.submit.innerHTML = this.moodCreateUpdate;
    }

    restartToCreate() {
        this.moodCreateUpdate = 'Create';
        this.count.classList.remove('d-none');
        this.submit.innerHTML = this.moodCreateUpdate;

    }

    convertToTitle() {
        this.moodSearch = 'Title';
        this.getSearchMood();
    }

    convertToCategory() {
        this.moodSearch = 'Category';
        this.getSearchMood();
    }

    getSearchMood() {
        this.search.placeholder = 'Search by ' + this.moodSearch;
        this.search.value = '';
        this.showData();
        this.search.focus();
    }

    searchData() {
        if (this.search.value == '') {
            this.deleteAll.classList.remove('d-none');
            this.deleteAll.innerHTML = `Delete All ( ${this.container.length} )`

        }
        else
            this.deleteAll.classList.add('d-none');

        this.tableBody.innerHTML = '';

        if (this.moodSearch == 'Title') {
            for (let i = 0; i < this.container.length; i++) {
                if (this.container[i].title.toLowerCase().includes(this.search.value.toLowerCase())) {
                    let tr = document.createElement('tr');

                    let tdId = document.createElement('td');
                    let tdTitle = document.createElement('td');
                    let tdPrice = document.createElement('td');
                    let tdTaxes = document.createElement('td');
                    let tdAds = document.createElement('td');
                    let tdDiscount = document.createElement('td');
                    let tdTotal = document.createElement('td');
                    let tdCategory = document.createElement('td');

                    let tdupdate = document.createElement('td');
                    let tdDelete = document.createElement('td');

                    let btnupdate = document.createElement('button');
                    let btnDelete = document.createElement('button');

                    tdId.innerHTML = i + 1;
                    tdTitle.innerHTML = this.container[i].title;
                    tdPrice.innerHTML = this.container[i].price;
                    tdTaxes.innerHTML = this.container[i].taxes;
                    tdAds.innerHTML = this.container[i].ads;
                    tdDiscount.innerHTML = this.container[i].discount;
                    tdTotal.innerHTML = this.container[i].total;
                    tdCategory.innerHTML = this.container[i].category;

                    btnupdate.setAttribute('index-Id', `${i}`);
                    btnupdate.classList.add('btnUpdate', 'btn', 'btn-outline-warning', 'w-100', 'my-3');
                    btnupdate.innerHTML = 'update';

                    btnDelete.setAttribute('index-Id', `${i}`);
                    btnDelete.classList.add('btnDelete', 'btn', 'btn-outline-danger', 'w-100', 'my-3');
                    btnDelete.innerHTML = 'delete';

                    tdupdate.appendChild(btnupdate);
                    tdDelete.appendChild(btnDelete);

                    tr.appendChild(tdId);
                    tr.appendChild(tdTitle);
                    tr.appendChild(tdPrice);
                    tr.appendChild(tdTaxes);
                    tr.appendChild(tdAds);
                    tr.appendChild(tdDiscount);
                    tr.appendChild(tdTotal);
                    tr.appendChild(tdCategory);
                    tr.appendChild(tdupdate);
                    tr.appendChild(tdDelete);

                    this.tableBody.prepend(tr);
                }
            }
            this.addEventDelete();
            this.addEventUpdate();
        }
        else {
            for (let i = 0; i < this.container.length; i++) {
                if (this.container[i].category.toLowerCase().includes(this.search.value.toLowerCase())) {
                    let tr = document.createElement('tr');

                    let tdId = document.createElement('td');
                    let tdTitle = document.createElement('td');
                    let tdPrice = document.createElement('td');
                    let tdTaxes = document.createElement('td');
                    let tdAds = document.createElement('td');
                    let tdDiscount = document.createElement('td');
                    let tdTotal = document.createElement('td');
                    let tdCategory = document.createElement('td');

                    let tdupdate = document.createElement('td');
                    let tdDelete = document.createElement('td');

                    let btnupdate = document.createElement('button');
                    let btnDelete = document.createElement('button');

                    tdId.innerHTML = i + 1;
                    tdTitle.innerHTML = this.container[i].title;
                    tdPrice.innerHTML = this.container[i].price;
                    tdTaxes.innerHTML = this.container[i].taxes;
                    tdAds.innerHTML = this.container[i].ads;
                    tdDiscount.innerHTML = this.container[i].discount;
                    tdTotal.innerHTML = this.container[i].total;
                    tdCategory.innerHTML = this.container[i].category;

                    btnupdate.setAttribute('index-Id', `${i}`);
                    btnupdate.classList.add('btnUpdate', 'btn', 'btn-outline-warning', 'w-100', 'my-3');
                    btnupdate.innerHTML = 'update';

                    btnDelete.setAttribute('index-Id', `${i}`);
                    btnDelete.classList.add('btnDelete', 'btn', 'btn-outline-danger', 'w-100', 'my-3');
                    btnDelete.innerHTML = 'delete';

                    tdupdate.appendChild(btnupdate);
                    tdDelete.appendChild(btnDelete);

                    tr.appendChild(tdId);
                    tr.appendChild(tdTitle);
                    tr.appendChild(tdPrice);
                    tr.appendChild(tdTaxes);
                    tr.appendChild(tdAds);
                    tr.appendChild(tdDiscount);
                    tr.appendChild(tdTotal);
                    tr.appendChild(tdCategory);
                    tr.appendChild(tdupdate);
                    tr.appendChild(tdDelete);

                    this.tableBody.prepend(tr);
                }
            }
            this.addEventDelete();
            this.addEventUpdate();
        }

    }
}

let managementSystem = new ManagementSystem();
