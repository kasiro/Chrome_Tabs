$$ = (query) => {
	return document.querySelectorAll(query);
};
setTimeout(() => {
	let arrow = $$('.bar .arrow')[0];
	$(arrow).click(() => {
		let prev = SiteHistory[SiteHistory.length - 2].path;
		let cure = SiteHistory[SiteHistory.length - 1].path;
		if (cure !== prev){
			console.log(prev, cure);
			ToBack(cure, prev);
		}
	});
}, 1350);