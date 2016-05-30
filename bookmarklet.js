javascript:(function () {
	var salt = 'my secret password';

	function algorithm() {
		var seed = btoa(sha1(getDomain() + salt));
		seedChar = seed.charCodeAt(0);
		var out = {};
		for (var i in templates) {
			var template = templates[i][seedChar % templates[i].length];
			var password = "";
			for (var j = 0; j < template.length; j++) {
				var templateChar = template[j];
				var passChars = allPassChars[templateChar];
				var seedChar = seed[j + 1].charCodeAt();
				password += passChars[seedChar % passChars.length]
			}
			out[i] = password
		}
		showPrompt(out)
	}

	function showPrompt(obj) {
		var d = document.createElement("div");
		document.body.appendChild(d);
		d.style.background = "rgba(255, 255, 255, 0.5)";
		d.style.position = "fixed";
		d.style.top = "0";
		d.style.left = "0";
		d.style.width = "100%";
		d.style.height = "100%";
		d.style.zIndex = 1e6;
		d.style.fontFamily = 'sans-serif';
		d.addEventListener("click", function () {
			document.body.removeChild(d)
		});
		var c = document.createElement("div");
		d.appendChild(c);
		c.style.position = "relative";
		c.style.height = (window.innerHeight - 100) + "px";
		c.style.width = (window.innerWidth - 100) + "px";
		c.style.left = "0";
		c.style.top = "0";
		c.style.margin = "50px";
		c.style.background = "#FFF";
		c.style.border = "solid 1px #333";
		c.style.overflowY = "scroll";
		c.addEventListener("click", function (e) {
			e.preventDefault();
			e.stopImmediatePropagation()
		});
		var h = document.createElement("h1");
		c.appendChild(h);
		h.innerHTML = "Passwords:";
		h.style.width = "100%";
		h.style.textAlign = "center";
		for (var i in obj) {
			var p = document.createElement("p");
			c.appendChild(p);
			p.innerHTML += i + ":<br><input onClick='this.select();' type='text' value='" + obj[i] + "'>";
			p.style.top = "54px";
			p.style.width = "100%";
			p.style.textAlign = "center";
		}
		document.onkeydown = function (event) {
			event = event || window.event;
			var isEscape = false;
			if ("key" in event) {
				isEscape = event.key == "Escape"
			} else {
				isEscape = event.keyCode == 27
			}
			if (isEscape) {
				document.body.removeChild(d)
			}
		}
	}

	var templates = {
		max: [
			"anoxxxxxxxxxxxxxxxxx",
			"axxxxxxxxxxxxxxxxxno"
		],
		"long": [
			"CvcvnoCvcvCvcv",
			"CvcvCvcvnoCvcv",
			"CvcvCvcvCvcvno",
			"CvccnoCvcvCvcv",
			"CvccCvcvnoCvcv",
			"CvccCvcvCvcvno",
			"CvcvnoCvccCvcv",
			"CvcvCvccnoCvcv",
			"CvcvCvccCvcvno",
			"CvcvnoCvcvCvcc",
			"CvcvCvcvnoCvcc",
			"CvcvCvcvCvccno",
			"CvccnoCvccCvcv",
			"CvccCvccnoCvcv",
			"CvccCvccCvcvno",
			"CvcvnoCvccCvcc",
			"CvcvCvccnoCvcc",
			"CvcvCvccCvccno",
			"CvccnoCvcvCvcc",
			"CvccCvcvnoCvcc",
			"CvccCvcvCvccno"
		],
		medium: [
			"CvcnoCvc",
			"CvcCvcno"
		],
		"short": [
			"Cvcn"
		],
		basic: [
			"aaanaaan",
			"aannaaan",
			"aaannaaa"
		],
		pin: [
			"nnnn"
		]
	};
	var allPassChars = {
		V: "AEIOU",
		C: "BCDFGHJKLMNPQRSTVWXYZ",
		v: "aeiou",
		c: "bcdfghjklmnpqrstvwxyz",
		A: "AEIOUBCDFGHJKLMNPQRSTVWXYZ",
		a: "AEIOUaeiouBCDFGHJKLMNPQRSTVWXYZbcdfghjklmnpqrstvwxyz",
		n: "0123456789",
		o: "@&%?,=[]_:-+*$#!'^~;()/.",
		x: "AEIOUaeiouBCDFGHJKLMNPQRSTVWXYZbcdfghjklmnpqrstvwxyz0123456789!@#$%^&*()"
	};

	function getDomain() {
		var i, h, cookie = "algopass_get_top_level_domain=cookie", hostname = document.location.hostname.split(".");
		for (i = hostname.length - 1; i >= 0; i--) {
			h = hostname.slice(i).join(".");
			document.cookie = cookie + ";domain=." + h + ";";
			if (document.cookie.indexOf(cookie) > -1) {
				document.cookie = cookie.split("=")[0] + "=;domain=." + h + ";expires=Thu, 01 Jan 1970 00:00:01 GMT;";
				return h
			}
		}
	}

	function sha1(string) {
		return Sha1.hash(string)
	}

	var Sha1 = {};
	Sha1.hash = function (msg) {
		msg = msg.utf8Encode();
		var K = [1518500249, 1859775393, 2400959708, 3395469782];
		msg += String.fromCharCode(128);
		var l = msg.length / 4 + 2;
		var N = Math.ceil(l / 16);
		var M = new Array(N);
		for (var i = 0; i < N; i++) {
			M[i] = new Array(16);
			for (var j = 0; j < 16; j++) {
				M[i][j] = msg.charCodeAt(i * 64 + j * 4) << 24 | msg.charCodeAt(i * 64 + j * 4 + 1) << 16 | msg.charCodeAt(i * 64 + j * 4 + 2) << 8 | msg.charCodeAt(i * 64 + j * 4 + 3)
			}
		}
		M[N - 1][14] = (msg.length - 1) * 8 / Math.pow(2, 32);
		M[N - 1][14] = Math.floor(M[N - 1][14]);
		M[N - 1][15] = (msg.length - 1) * 8 & 4294967295;
		var H0 = 1732584193;
		var H1 = 4023233417;
		var H2 = 2562383102;
		var H3 = 271733878;
		var H4 = 3285377520;
		var W = new Array(80);
		var a, b, c, d, e;
		for (var i = 0; i < N; i++) {
			for (var t = 0; t < 16; t++)W[t] = M[i][t];
			for (var t = 16; t < 80; t++)W[t] = Sha1.ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
			a = H0;
			b = H1;
			c = H2;
			d = H3;
			e = H4;
			for (var t = 0; t < 80; t++) {
				var s = Math.floor(t / 20);
				var T = Sha1.ROTL(a, 5) + Sha1.f(s, b, c, d) + e + K[s] + W[t] & 4294967295;
				e = d;
				d = c;
				c = Sha1.ROTL(b, 30);
				b = a;
				a = T
			}
			H0 = H0 + a & 4294967295;
			H1 = H1 + b & 4294967295;
			H2 = H2 + c & 4294967295;
			H3 = H3 + d & 4294967295;
			H4 = H4 + e & 4294967295
		}
		return Sha1.toHexStr(H0) + Sha1.toHexStr(H1) + Sha1.toHexStr(H2) + Sha1.toHexStr(H3) + Sha1.toHexStr(H4)
	};
	Sha1.f = function (s, x, y, z) {
		switch (s) {
			case 0:
				return x & y ^ ~x & z;
			case 1:
				return x ^ y ^ z;
			case 2:
				return x & y ^ x & z ^ y & z;
			case 3:
				return x ^ y ^ z
		}
	};
	Sha1.ROTL = function (x, n) {
		return x << n | x >>> 32 - n
	};
	Sha1.toHexStr = function (n) {
		var s = "", v;
		for (var i = 7; i >= 0; i--) {
			v = n >>> i * 4 & 15;
			s += v.toString(16)
		}
		return s
	};
	if (typeof String.prototype.utf8Encode == "undefined") {
		String.prototype.utf8Encode = function () {
			return unescape(encodeURIComponent(this))
		}
	}
	if (typeof String.prototype.utf8Decode == "undefined") {
		String.prototype.utf8Decode = function () {
			try {
				return decodeURIComponent(escape(this))
			} catch (e) {
				return this
			}
		}
	}

	if (!document.body) {
		window.onload = algorithm;
	} else {
		algorithm();
	}
})();