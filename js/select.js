// add active class in selected list item
let getParent = (el_to, count = 1) => {
	let el = el_to;
	for (let i = 1; i <= count; i++) {
		el = $(el).parent();
	}
	return el;
};
let reBind = () => {
	var titles = {
		'grid': 'main menu',
		'profile': 'profile'
	};
	var list = document.querySelectorAll('.list');
	for (let i = 0; i < list.length; i++){
		let Li_el = list[i];
		let hash = Li_el.querySelector('a').hash.substr(1);
		let h, element;
		$(Li_el).find('ion-icon[name="file-tray-outline"]').mouseover(function(){
			let classList = getParent(this, 3).attr('class').split(/\s+/);
			if (classList.indexOf('active') !== -1){
				$(this).css('display', 'none');
				$(Li_el)
					.find('ion-icon[name="file-tray"]')
					.css('display', 'inline-block');
			}
		});
		$(Li_el).find('ion-icon[name="file-tray"]').mouseout(function(){
			$(this).css('display', 'none');
			$(Li_el)
				.find('ion-icon[name="file-tray-outline"]')
				.css('display', 'inline-block');
		});
		$(Li_el).find('a .closeTab').click(() => {
			// console.log('closeTab clicked!');
			setTimeout(() => {
				$('.in div[style="display: block;"]').css('display','none');
				// Li_el.classList.add('Closed');
				setTimeout(function() {
					Li_el.remove();
					list[i-1].className = 'list active';
					list[i-1].click();
				}, 200);
			}, 500);
		});
		Li_el.onclick = () => {
			let o = 0;
			while (o < list.length){
				list[o].className = 'list';
				h = list[o].querySelector('a').hash.substr(1);
				element = document.querySelector('.'+h);
				if (element) document.querySelector('.'+h).style.display = 'none';
				o++;
			}
			Li_el.className = 'list active';
			// Li_el.className = 'list active';
			if (document.querySelector('.'+hash)) {
				document.querySelector('.'+hash).style.display = 'block';
				if (titles[hash] != undefined) {
					// console.log(`hash: ${hash}; title: ${titles[hash]}`);
					document.querySelector('title').textContent = titles[hash];
				}
				// console.log('.'+hash, 'set: block');
			} else {
				// console.log('.'+hash, 'not found...');
			}
			// let text = Li_el.querySelector('.title').textContent;
		};
	}
};
let Selectlast = () => {
	var list = document.querySelectorAll('.list');
	let o = 0;
	while (o < list.length){
		list[o++].className = 'list';
	}
	let lastList = list[list.length - 1];
	lastList.className = 'list active';
	lastList.click();
};
let reFunc = function(){
	$('ul').append(`
	<li class="list">
		<b></b>
		<b></b>
		<a href="#New_Tab">
			<span class="icon">
				<ion-icon name="browsers-outline"></ion-icon>
			</span>
			<span class="title">New Tab</span>
			<div class="closeTab">
				<ion-icon name="close-outline"></ion-icon>
			</div>
		</a>
	</li>
	`);
	let tcopy = this;
	$(this).remove();
	$('ul').append(tcopy);
	$('li.add').click(reFunc);
	reBind();
	Selectlast();
};
$('li.add').click(reFunc);
reBind();
