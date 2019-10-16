const $ = selector => document.querySelector(selector);

window.onload = () => {
	document.querySelectorAll('.navList>li').forEach(el => {
		el.onclick = function (e) {
			if(e.target.parentElement == el) this.classList.toggle('elActive')
		}
	})
};
