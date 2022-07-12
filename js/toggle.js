let menuToggle = document.querySelector('.toggle');
let navigation = document.querySelector('.navigation');
let inBlock = document.querySelector('.in');
menuToggle.onclick = () => {
	menuToggle.classList.toggle('active');
	navigation.classList.toggle('active');
	inBlock.classList.toggle('active');
};