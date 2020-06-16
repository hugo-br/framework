var win = null;

		function legalWindow(mypage, myname, w, h, scroll, pos) {
			w = w || 320;
			h = h || 193;
				
			if (pos == "random") {
				var LeftPosition = (screen.width) ? Math.floor(Math.random() * (screen.width - w)) : 100;
				var TopPosition = (screen.height) ? Math.floor(Math.random() * ((screen.height - h) - 75)) : 100;
			}
			if (pos == "center") {
				var LeftPosition = (screen.width) ? (screen.width - w) / 2 : 100;
				 var TopPosition = (screen.height) ? (screen.height - h) / 2 : 100;
			} else if ((pos != "center" && pos != "random") || pos == null) {
				var LeftPosition = 0;
				var TopPosition = 20
			}
			
			var settings = 'width=' + w + ',height=' + h + ',top=' + TopPosition + ',left=' + LeftPosition + ',scrollbars=' + scroll
				+
				',location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no';
			win = window.open(mypage, myname, settings);
		}