var product1 = {
	name: 'Термос Сталь ', 
	quantity: 1, 
	price: 250, 
	image: 'image/image1.jpg'
}, product2 = {
	name: 'Термос Веселка', 
	quantity: 1, 
	price: 350, 
	image: 'image/image2.jpg'
}, product3 = {
	name: 'Термос Елегантність', 
	quantity: 1, 
	price: 280, 
	image: 'image/image3.jpg'
}, product4 = {
	name: 'Термос Пікнік', 
	quantity: 1, 
	price: 320, 
	image: 'image/image4.jpg'
}, product5 = {
	name: 'Термос Віола', 
	quantity: 1, 
	price: 200, 
	image: 'image/image5.jpg'
}, product6 = {
	name: 'Термос Спорт', 
	quantity: 1, 
	price: 330, 
	image: 'image/image6.jpg'	
}, product7 = {
	name: 'Термос Дісней', 
	quantity: 1, 
	price: 150, 
	image: 'image/image7.jpg'
}, customer = {
	name: "Им'я", 
	phone: '12-34-56', 
	email: 'test@email.ua'
}, shipping = {
	name: 'Заберу сам', 
	price: 0
}, cart = {
	customer: customer, 
	products: [product1, product2,product3, product4, product5,product6, product7], 
	shipping: shipping
}, cities = {
	'cherkasy': 'Черкаси',
	'kyiv': 'Київ',
	'lviv': 'Львів'
}, offices = {
	'cherkasy': ['Черкаси Відділення 1', 'Черкаси Відділення 2', 'Черкаси Відділення 3'],
	'kyiv': ['Київ Відділення 1', 'Київ Відділення 2', 'Київ Відділення 3', 'Київ Відділення 4', 'Київ Відділення 5'],
	'lviv': ['Львів Відділення 1', 'Львів Відділення 2', 'Львів Відділення 3', 'Львів Відділення 4']
};

function selectAll(elem){
	var elements = document.getElementsByClassName('colors');
	var checked = elem.checked;
	for (var i = 0; i < elements.length;i++) {
		elements[i].checked = checked;			
	}
}
function getCost(price, quantity) {
	return price * quantity;
}

function getCostWithShipping(subtotal, shippingPrice) {
	return subtotal + shippingPrice;
}

function updateCartTotal() {
	var costSpans, costSpan, total = 0;

	costSpans = document.getElementsByClassName('cart-product-cost');
	for (var i = 0; i < costSpans.length; i++) {
		costSpan = costSpans[i];
		total += parseFloat(costSpan.innerHTML);
	}

	document.getElementById('total').innerHTML = total.toFixed(2);
}

function changeProductQuantityHandler(event) {
	var target = event.target;
	var number = target.dataset.number;
	var quantity = parseInt(target.value);

	removeErrorMessage(target);

	if (quantity > 0) {
		// changing products cost
		var price = parseFloat(document.getElementById('price' + number).innerHTML);

		var costSpan = document.getElementById('cost' + number);
		if (costSpan) {
			costSpan.innerHTML = getCost(price, quantity).toFixed(2);
		}

		updateCartTotal();
	
	} else {
		showErrorMessage(target, 'Введіть кількість')
	}
}

function showEmptyCart() {
	var table = document.getElementById('cart-table');
	if (table) {
		document.getElementById('cart').removeChild(table);
	}

	var divCartEmpty = document.createElement('div');
	divCartEmpty.appendChild(document.createTextNode('В кошику немає товарів.'));
	document.getElementById('cart').appendChild(divCartEmpty);
}

function showProductTable(cart) {
	if (!cart.products.length) {
		showEmptyCart();
		return;
	}

	var table, row, data, element, product, cost, total = 0;

	table = document.createElement('table');
	table.id = 'cart-table';

	row = document.createElement('tr');

	data = document.createElement('th');
	data.colSpan = 2;
	data.appendChild(document.createTextNode('Продукт'));
	row.appendChild(data);

	data = document.createElement('th');
	data.appendChild(document.createTextNode('Кількість'));
	row.appendChild(data);

	data = document.createElement('th');
	data.appendChild(document.createTextNode('Ціна'));
	row.appendChild(data);

	data = document.createElement('th');
	data.appendChild(document.createTextNode('Вартість'));
	row.appendChild(data);

	var thead = document.createElement('thead');
	thead.appendChild(row);
	table.appendChild(thead);

	for (var i = 0; i < cart.products.length; i++) {
		product = cart.products[i];
		row = document.createElement('tr');
		row.id = 'row' + i;
		row.className = 'cart-table-row';

		data = document.createElement('td');
		element = document.createElement('div');
		element.className = 'image';
		element.innerHTML = '<img src="' + product.image + '" alt=""/>';
		data.appendChild(element);
		row.appendChild(data);

		data = document.createElement('td');
		data.appendChild(document.createTextNode(product.name));
		row.appendChild(data);

		data = document.createElement('td');
		element = document.createElement('input');
		element.type = 'number';
		element.name = 'quantity' + i;
		element.value = product.quantity;
		element.min = 0;
		element.dataset.number = i;
		data.appendChild(element);
		row.appendChild(data);

		element.addEventListener('change', changeProductQuantityHandler, false);

		data = document.createElement('td');
		data.innerHTML = '<span id="price' + i + '">' + product.price.toFixed(2) + '</span> грн';
		row.appendChild(data);

		cost = getCost(product.price, product.quantity);
		total += cost;

		data = document.createElement('td');
		data.innerHTML = '<span id="cost' + i + '" class="cart-product-cost">' + cost.toFixed(2) + '</span> грн';
		row.appendChild(data);

		table.appendChild(row);
	}

	row = document.createElement('tr');

	data = document.createElement('td');
	data.colSpan = 4;
	data.appendChild(document.createTextNode('До сплати'));
	row.appendChild(data);

	data = document.createElement('td');
	data.innerHTML = '<strong><span id="total">' + total.toFixed(2) + '</span> грн</strong>';
	row.appendChild(data);

	table.appendChild(row);

	document.getElementById('cart').appendChild(table);
}

function createSelect(name, options) {
	var select, option;
	select = document.createElement('select');
	select.name = name;

	for (var key in options) {
		option = document.createElement('option');
		option.value = key;
		option.appendChild(document.createTextNode(options[key]));

		select.appendChild(option);
	}

	return select;
}

function showSelectCity() {
	var select = createSelect('city', cities);
	
	var div = document.getElementById('shipping');
	div.appendChild(select);

	var br = document.createElement('br');
	div.appendChild(br.cloneNode());
	div.appendChild(br);

	for (var cityName in cities) {
		break;
	}

	showSelectOffice(cityName);

	select.addEventListener('change', function(event) {
		showSelectOffice(event.target.value);
	}, false);
}

function hideSelectCity() {
	var div = document.getElementById('shipping');

	hideSelectOffice();
	
	var select = div.querySelector('[name=city]');
	if (select) {
		var br = select.nextSibling;
		div.removeChild(br);
		br = select.nextSibling;
		div.removeChild(br);
		div.removeChild(select);
	}
}

function showSelectOffice(cityName) {
	hideSelectOffice();

	var options = offices[cityName];
	if (options !== undefined) {
		var select = createSelect('office', options);

		document.getElementById('shipping').appendChild(select);
	}
}

function hideSelectOffice() {
	var div = document.getElementById('shipping');
	var select = div.querySelector('[name=office]');
	if (select) {
		div.removeChild(select);
	}
}

function changeShippingHandler(event) {
	if (event.target.id == 'input-shipping2') {
		showSelectCity();
	} else {
		hideSelectCity();
	}
}

function showErrorMessage(field, messageText) {
	removeErrorMessage(field);

	var errorMessage = document.createElement('div');
	errorMessage.className = 'error';
	errorMessage.innerHTML = messageText;

	field.parentElement.insertBefore(errorMessage, field);
}

function removeErrorMessage(field) {
	if (field.previousSibling && field.previousSibling.className == 'error') {
		field.parentElement.removeChild(field.previousSibling);
	}
}

function formSubmitHandler(event) {
	var requiredFields = document.getElementsByClassName('required');
	for (var i = 0; i < requiredFields.length; i++) {
		var field = requiredFields[i];

		if ((field.type == 'checkbox' && !field.checked) || !field.value) {
			event.preventDefault();

			if (field.type == 'checkbox') {
				showErrorMessage(field, 'Необхідно прийняти ліцензійні угоди');
			} else {
				showErrorMessage(field, 'Заповніть, будь ласка, поле');
			}
		}
	}
}

function changeEmailHandler(event) {
	var field = event.target;

	if (!(/\S+@\S+\.\S+/.test(field.value))) {
		showErrorMessage(field, 'Введіть, будь ласка, електронну адресу');
	}
}

function changePhoneHandler(event) {
	var value = event.target.value;

	var digits = value.match(/\d/g);
	if (!(/^[\d\+\(\)\-\ ]+$/.test(value)) || !digits || digits.length < 10) {
		showErrorMessage(event.target, 'Введіть, будь ласка, телефон');
	}
}

window.addEventListener('load', function() {
	showProductTable(cart);

	var inputEmail = document.getElementById('input-email');
	inputEmail.addEventListener('blur', changeEmailHandler, false);

	var inputPhone = document.getElementById('input-phone');
	inputPhone.addEventListener('blur', changePhoneHandler, false);

	var form = document.getElementById('form');
	form.addEventListener('submit', formSubmitHandler, false);

	// adding event on shipping type change
	var shippingChildren = document.getElementById('shipping').children;
	for (var i = 0; i < shippingChildren.length; i++) {
		if (shippingChildren[i].tagName == 'INPUT' && shippingChildren[i].name == 'shipping') {
			shippingChildren[i].addEventListener('change', changeShippingHandler, false);
		}
	}

	// adding event on required fields
	var requiredFields = document.getElementsByClassName('required');
	for (var i = 0; i < requiredFields.length; i++) {
		var field = requiredFields[i];
		field.addEventListener('click', function(event) {
			removeErrorMessage(event.target);
		}, false);
	}
}, false);
