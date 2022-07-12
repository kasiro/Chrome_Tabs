// add active class in selected list item

let SiteHistory = [];
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

let hasOneSelect = () => $$('.list.active').length > 0;

let getIconFromHash = (hash) => {
	return SiteHistory.filter(HisElement => {
		if (HisElement.path == hash) return HisElement.icon;
	})[0].icon;
};

let ToBack = (fromHash, ToHash) => {
	let icons = {
		'New_Tab': 'browsers-outline'
	};
	let icon = icons.hasOwnProperty(ToHash) ? icons[ToHash] : getIconFromHash(ToHash);
	if (typeof icon !== 'undefined'){
		console.log('icon is:', icon);
	} else {
		console.log('[ERROR][icon is]:', getIconFromHash(ToHash));
	}
	$('.'+ToHash).css('display', 'block');
	$('.'+fromHash).css('display', 'none');
	$('li.active').find('a').attr('href', '#'+ToHash);
	$('li.active').find('.title').html(ToHash);
	$('li.active').find('.icon').append(`<ion-icon name="${icon}"></ion-icon>`);
	$('li.active').find('.icon ion-icon')[0].remove();
	if ($('.in .'+ToHash).length == 0){
		$('.in').append(`<div class="${ToHash}" style="display: none;"></div>`);
	}
	document.location.hash = '#'+ToHash;
	$('input').val('path/'+ToHash);
	// $('li.active').click();
};

let setActive = (tabId) => {
	let tabs = $$('.list');
	tabs.forEach((tab, tabSelectId) => {
		// const selectTitle = $(tab).find('a .title').text();
		if (tabId == tabSelectId){
			$(tab).click();
		}
	});
};

let reBind = (stop = false) => {
	var titles = {
		'grid': 'main menu',
		'profile': 'my page'
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
			$('.in .'+hash+'[style="display: block;"]').css('display', 'none');
			setTimeout(() => {
				if (list[i+1] !== undefined){
					list[i+1].click();
					list[i+1].click();
				} else {
					setTimeout(() => {
						let d = 1;
						while (!hasOneSelect() && d <= 10) {
							setActive(i-1);
							d++;
						}
					}, 30);
				}
				setTimeout(() => {
					Li_el.remove();
				}, 11);
			}, 10);
		});
		Li_el.onclick = () => {
			let hash = Li_el.querySelector('a').hash.substr(1);
			let icons = Li_el.querySelectorAll('a .icon').length > 1;
			let icon = false;
			if (icons){
				let Iicon = Li_el.querySelectorAll('a .icon')[1];
				icon = Iicon.querySelector('ion-icon').getAttribute('name');
				// console.log(icon);
				// console.log(Li_el.querySelectorAll('a .icon'));
			} else {
				icon = Li_el.querySelector('a .icon ion-icon').getAttribute('name');
			}
			$('input').val('path/'+hash);
			// SiteHistory.push({
			// 	path: hash,
			// 	tabicon: icon
			// });
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
			SiteHistory.push({
				path: name,
				icon: icon
			});
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
