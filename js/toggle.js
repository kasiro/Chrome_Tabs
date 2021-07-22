var menuToggle = document.querySelector('.toggle');
var navigation = document.querySelector('.navigation');
var inBlock = document.querySelector('.in');
menuToggle.onclick = () => {
	menuToggle.classList.toggle('active');
	navigation.classList.toggle('active');
	inBlock.classList.toggle('active');
};