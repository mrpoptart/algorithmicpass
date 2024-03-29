(async function () {
	const allPassChars = {
		U: "ABCDEFGHJKLMNPQRSTUVWXYZ",
		L: "abcdefghjkmnopqrstuvwxyz",
		N: "123456789",
		S: "!@#$%^&*",
		X: "abcdefghjkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789!@#$%^&*"
	};

	async function algoPw(salt) {
		await algorithm(salt)
	}

	async function algorithm(salt) {
		const templates = generateTemplates();
		const domain = getDomain();
		const seed = btoa(await sha1(domain + salt));
		const seedChar = seed.charCodeAt(0);
		const template = templates[seedChar % templates.length];
		let password = "";

		for (let j = 0; j < template.length; j++) {
			let templateChar = template[j];
			let passChars = allPassChars[templateChar];
			let seedChar = seed[j + 1].charCodeAt();
			password += passChars[seedChar % passChars.length];
		}

		if (typeof document === "undefined") {
			console.log(password);
		} else if (document.activeElement && document.activeElement.tagName === "INPUT") {
			document.activeElement.value = password;
		} else {
			await navigator.clipboard.writeText(password);
			prompt(`Algo Password for ${domain}`, password);
		}
	}

	function getDomain() {
		if (typeof document === 'undefined') return 'google.com';
		let i, h, cookie = "algopass_get_top_level_domain=cookie", hostname = document.location.hostname.split(".");
		for (i = hostname.length - 1; i >= 0; i--) {
			h = hostname.slice(i).join(".");
			document.cookie = cookie + ";domain=." + h + ";";
			if (document.cookie.indexOf(cookie) > -1) {
				document.cookie = cookie.split("=")[0] + "=;domain=." + h + ";expires=Thu, 01 Jan 1970 00:00:01 GMT;";
				return h;
			}
		}
	}

	async function sha1(str) {
		const enc = new TextEncoder();
		const hash = await crypto.subtle.digest('SHA-1', enc.encode(str));
		return Array.from(new Uint8Array(hash))
			.map(v => v.toString(16).padStart(2, '0'))
			.join('');
	}

	function generateTemplates() {
		return Array(16).fill(0).map((o,i)=>{
			return 'ULNS'.padStart(i + 4, "X").padEnd(19, 'X') + "L";
		})
	}

	await algoPw('my secret password');

})()