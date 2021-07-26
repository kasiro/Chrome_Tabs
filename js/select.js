// add active class in selected list item
let $$ = (query) => {
	return document.querySelectorAll(query);
};
let getParent = (el_to, count = 1) => {
	let el = el_to;
	for (let i = 1; i <= count; i++) {
		el = $(el).parent();
	}
	return el;
};
let reBind = (stop = false) => {
	var titles = {
		'grid': 'main menu',
		'profile': 'profile'
	};
	var list = $$('.list');
	// console.clear();
	for (let i = 0; i < list.length; i++){
		let Li_el = list[i];
		let hash = Li_el.querySelector('a').hash.substr(1);
		// console.log(hash+': ', $(Li_el).find('.title').text());
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
		$(Li_el).find('ion-icon[name="file-tray"]').click(function(){
			let parent = getParent(this, 3);
			let name = $(parent).find('.title').text();
			console.log(`tab "${name}" add to Poket`);
		});
		$(Li_el).find('ion-icon[name="file-tray"]').mouseout(function(){
			$(this).css('display', 'none');
			$(Li_el)
				.find('ion-icon[name="file-tray-outline"]')
				.css('display', 'inline-block');
		});
		$(Li_el).find('a .closeTab').click(() => {
			let hash = Li_el.querySelector('a').hash.substr(1);
			document.location.hash = hash;
			// if (hash != activeTab){
			// 	$('.in .'+hash).remove();
			// }
			// var activeTab = hash;
			$('.in div[style="display: block;"]').css('display', 'none');
			setTimeout(() => {
				if (list[i+1] != undefined){
					list[i+1].click();
				} else {
					list[i-1].click();
					list[i-1].click();
				}
				setTimeout(() => {
					Li_el.remove();
				}, 10);
			}, 10);
		});
		Li_el.onclick = () => {
			let hash = Li_el.querySelector('a').hash.substr(1);
			$('input').val('path/'+hash);
			let o = 0;
			while (o < list.length){
				list[o].className = 'list';
				h = list[o].querySelector('a').hash.substr(1);
				element = document.querySelector('.'+h);
				if (element) document.querySelector('.'+h).style.display = 'none';
				o++;
			}
			Li_el.className = 'list active';
			if (document.querySelector('.'+hash)) {
				document.querySelector('.'+hash).style.display = 'block';
				if (titles[hash] != undefined) {
					document.querySelector('title').textContent = titles[hash];
				}
			}
		};
	}
};
let Selectlast = () => {
	var list = $$('.list');
	let o = 0;
	while (o < list.length){
		list[o++].className = 'list';
	}
	let lastList = list[list.length - 1];
	lastList.className = 'list active';
	lastList.click();
};
let BindPannels = () => {
	let pannels = $$('.New_Tab .mini_panel');
	for (let pannel of pannels){
		$(pannel).click(function(){
			let icon = $(this).find('.icon-wrapper ion-icon').attr('name');
			let name = $(this).find('.text').text();
			$('.New_Tab').css('display', 'none');
			$('li.active').find('a').attr('href', '#'+name);
			$('li.active').find('.title').html(name);
			$('li.active').find('.icon ion-icon').remove();
			$('li.active').find('.icon').append(`<ion-icon name="${icon}"></ion-icon>`);
			if ($('.in .'+name).length == 0){
				$('.in').append(`<div class="${name}" style="display: none;"></div>`);
			}
			document.location.hash = '#'+name;
			$('li.active').click();
		});
	}
};
// При закрытии вкладки показываются сразу 2 просртранства
// (Bluetooth, New_Tab) к примеру (Сделать синхронизацию)

// При закрытии смотрим Сколько блоков показано если больше одного
// Смотрим вкладку с каким именем закрывали последней
// И просртранства с таким именем Показываем


// При закрытии вкладки остаётся закрытое пространство
var BindPannelsBool = false;
let reFunc = function(){
	$('ul').append(`<li class="list">
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
	</li>`);
	let tcopy = this;
	$(this).remove();
	$('ul').append(tcopy);
	$('li.add').click(reFunc);
	if (!BindPannelsBool){
		BindPannels();
		BindPannelsBool = true;
	}
	reBind();
	Selectlast();
};
$('li.add').click(reFunc);
reBind();
