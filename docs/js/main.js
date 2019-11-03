class Storage {
	static get Local() {
		return {
			get(key) {
				return JSON.parse(localStorage.getItem(key))
			},
			set(key, value) {
				value = JSON.stringify(value)
				localStorage.setItem(key, value)
				return value
			}
		}
	}
	static get Session() {
		return {
			get(key) {
				return JSON.parse(sessionStorage.getItem(key))
			},
			set(key, value) {
				value = JSON.stringify(value)
				sessionStorage.setItem(key, value)
				return value
			}
		}
	}
	static get Cookie() {
		return {
			get(key) {
				var name = key + "=";
				var decodedCookie = decodeURIComponent(document.cookie);
				var ca = decodedCookie.split(';');
				for (var i = 0; i < ca.length; i++) {
					var c = ca[i];
					while (c.charAt(0) == ' ') {
						c = c.substring(1);
					}
					if (c.indexOf(name) == 0) {
						return c.substring(name.length, c.length);
					}
				}
				return undefined;
			},
			set(key, value, exdays) {
				var d = new Date();
				d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
				var expires = "expires=" + d.toUTCString();
				document.cookie = key + "=" + value + ";" + expires + ";path=/";
			}
		}
	}
}

function api(query, params){
	return new Promise((resolve, reject) => {
		let paramz = ""
		for (let param in params) {
			paramz += param + "=" + params[param] + "&"
		}
		paramz = paramz.slice(0, -1)
		fetch(`/${query}?${paramz}`)
			.then(fet => {
				fet.json().then(json => resolve(json))
			})
	})
}

// Get and save new date of visit
const lastVisit = new Date(Storage.Local.get('lastVisit') || null)
Storage.Local.set('lastVisit', new Date())

// Add badge for new articles
$("time[data-update]").each(function (el) {
	if (new Date($(this).attr('datetime')).getTime() > lastVisit.getTime()) $(this).prepend('<span class="badge badge-primary">Nowość</span> ')
});

