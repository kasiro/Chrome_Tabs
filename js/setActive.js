setTimeout(() => {
	var menuItem = document.location.hash;
	// console.log('item: ', menuItem);
	var list = document.querySelectorAll('.list');
	var h;
	for (let i = 0; i < list.length; i++){
		h = list[i].querySelector('a').hash.substr(1);
		//- console.log('href: ', list[i].querySelector('a').hash);
		if (list[i].querySelector('a').hash == menuItem){
			list[i].className = 'list active';
			if (document.querySelector('.'+h)) {
				document.querySelector('.'+h).style.display = 'block';
				//- console.log('.'+h, 'set: block');
			}
		}
	}
	if (document.querySelectorAll('.list.active').length === 0){
		var list = document.querySelectorAll('.list');
		list[0].className = 'list active';
		list[0].click();
	}
}, 1350);