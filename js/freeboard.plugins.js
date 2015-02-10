// ┌────────────────────────────────────────────────────────────────────┐ \\
// │ F R E E B O A R D                                                  │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright © 2013 Jim Heising (https://github.com/jheising)         │ \\
// │ Copyright © 2013 Bug Labs, Inc. (http://buglabs.net)               │ \\
// │ Copyright © 2014 Hugo Sequeira (https://github.com/hugocore)       │ \\
// │ Copyright © 2015 Daisuke Tanaka (https://github.com/tanaka0323)    │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT license.                                    │ \\
// └────────────────────────────────────────────────────────────────────┘ \\

(function () {

	var clockDatasource = function (settings, updateCallback) {
		var self = this;
		var currentSettings = settings;
		var timer;

		function stopTimer() {
			if (timer) {
				clearTimeout(timer);
				timer = null;
			}
		}

		function updateTimer() {
			stopTimer();
			timer = setInterval(self.updateNow, currentSettings.refresh * 1000);
		}

		this.updateNow = function () {
			var now = moment().tz(currentSettings.timezone);

			var data = {
				numeric_value: now.unix(),
				full_string_value: now.format("YYYY/MM/DD hh:mm:ss"),
				date_string_value: now.format("YYYY/MM/DD"),
				time_string_value: now.format("hh:mm:ss"),
				date_object: now.toDate()
			};

			updateCallback(data);
		}

		this.onDispose = function () {
			stopTimer();
		}

		this.onSettingsChanged = function (newSettings) {
			currentSettings = newSettings;
			if (_.isUndefined(currentSettings.timezone))
				currentSettings.timezone = "Asia/Tokyo";
			updateTimer();
		}

		updateTimer();
	};

	freeboard.loadDatasourcePlugin({
		type_name: "clock",
		display_name: "時計",
		description: "指定の間隔で更新され、異なるフォーマットで現在の時刻を返します。画面上にタイマーを表示したり、ウィジェットが一定の間隔でリフレッシュさせるために使用することができます。",
		settings: [
			{
				name: "timezone",
				display_name: "タイムゾーン",
				type: "option",
				default_value: "Asia/Tokyo",
				options: [
					{
						name: "(UTC-12:00) 国際日付変更線 西側",
						value: "Etc/GMT+12"
					},
					{
						name: "(UTC-11:00) 協定世界時-11",
						value: "Etc/GMT+11"
					},
					{
						name: "(UTC-10:00) ハワイ",
						value: "Pacific/Honolulu"
					},
					{
						name: "(UTC-09:00) アラスカ",
						value: "America/Anchorage"
					},
					{
						name: "(UTC-08:00) バハカリフォルニア",
						value: "America/Santa_Isabel"
					},
					{
						name: "(UTC-08:00) 太平洋標準時(米国およびカナダ)",
						value: "America/Los_Angeles"
					},
					{
						name: "(UTC-07:00) チワワ、ラパス、マサトラン",
						value: "America/Chihuahua"
					},
					{
						name: "(UTC-07:00) アリゾナ",
						value: "America/Phoenix"
					},
					{
						name: "(UTC-07:00) 山地標準時(米国およびカナダ)",
						value: "America/Denver"
					},
					{
						name: "(UTC-06:00) 中央アメリカ",
						value: "America/Guatemala"
					},
					{
						name: "(UTC-06:00) 中部標準時(米国およびカナダ)",
						value: "America/Chicago"
					},
					{
						name: "(UTC-06:00) サスカチュワン",
						value: "America/Regina"
					},
					{
						name: "(UTC-06:00) グアダラハラ、メキシコシティ、モンテレー",
						value: "America/Mexico_City"
					},
					{
						name: "(UTC-05:00) ボゴタ、リマ、キト",
						value: "America/Bogota"
					},
					{
						name: "(UTC-05:00) インディアナ東部",
						value: "America/Indiana/Indianapolis"
					},
					{
						name: "(UTC-05:00) 東部標準時(米国およびカナダ)",
						value: "America/New_York"
					},
					{
						name: "(UTC-04:30) カラカス",
						value: "America/Caracas"
					},
					{
						name: "(UTC-04:00) 大西洋標準時(カナダ)",
						value: "America/Halifax"
					},
					{
						name: "(UTC-04:00) アスンシオン",
						value: "America/Asuncion"
					},
					{
						name: "(UTC-04:00) ジョージタウン、ラパス、マナウス、サンフアン",
						value: "America/La_Paz"
					},
					{
						name: "(UTC-04:00) クイアバ",
						value: "America/Cuiaba"
					},
					{
						name: "(UTC-04:00) サンチアゴ",
						value: "America/Santiago"
					},
					{
						name: "(UTC-03:30) ニューファンドランド",
						value: "America/St_Johns"
					},
					{
						name: "(UTC-03:00) ブラジリア",
						value: "America/Sao_Paulo"
					},
					{
						name: "(UTC-03:00) グリーンランド",
						value: "America/Godthab"
					},
					{
						name: "(UTC-03:00) カイエンヌ、フォルタレザ",
						value: "America/Cayenne"
					},
					{
						name: "(UTC-03:00) ブエノスアイレス",
						value: "America/Argentina/Buenos_Aires"
					},
					{
						name: "(UTC-03:00) モンテビデオ",
						value: "America/Montevideo"
					},
					{
						name: "(UTC-02:00) 協定世界時-2",
						value: "Etc/GMT+2"
					},
					{
						name: "(UTC-01:00) カーボベルデ諸島",
						value: "America/Cape_Verde"
					},
					{
						name: "(UTC-01:00) アゾレス",
						value: "Atlantic/Azores"
					},
					{
						name: "(UTC+00:00) カサブランカ",
						value: "America/Casablanca"
					},
					{
						name: "(UTC+00:00) モンロビア、レイキャビク",
						value: "Atlantic/Reykjavik"
					},
					{
						name: "(UTC+00:00) ダブリン、エジンバラ、リスボン、ロンドン",
						value: "Europe/London"
					},
					{
						name: "(UTC+00:00) 協定世界時",
						value: "Etc/GMT"
					},
					{
						name: "(UTC+01:00) アムステルダム、ベルリン、ベルン、ローマ、ストックホルム、ウィーン",
						value: "Europe/Berlin"
					},
					{
						name: "(UTC+01:00) ブリュッセル、コペンハーゲン、マドリード、パリ",
						value: "Europe/Paris"
					},
					{
						name: "(UTC+01:00) 西中央アフリカ",
						value: "Africa/Lagos"
					},
					{
						name: "(UTC+01:00) ベオグラード、ブラチスラバ、ブダペスト、リュブリャナ、プラハ",
						value: "Europe/Budapest"
					},
					{
						name: "(UTC+01:00) サラエボ、スコピエ、ワルシャワ、ザグレブ",
						value: "Europe/Warsaw"
					},
					{
						name: "(UTC+01:00) ウィントフック",
						value: "Africa/Windhoek"
					},
					{
						name: "(UTC+02:00) アテネ、ブカレスト、イスタンブール",
						value: "Europe/Istanbul"
					},
					{
						name: "(UTC+02:00) ヘルシンキ、キエフ、リガ、ソフィア、タリン、ビリニュス",
						value: "Europe/Kiev"
					},
					{
						name: "(UTC+02:00) カイロ",
						value: "Africa/Cairo"
					},
					{
						name: "(UTC+02:00) ダマスカス",
						value: "Asia/Damascus"
					},
					{
						name: "(UTC+02:00) アンマン",
						value: "Asia/Amman"
					},
					{
						name: "(UTC+02:00) ハラーレ、プレトリア",
						value: "Africa/Johannesburg"
					},
					{
						name: "(UTC+02:00) エルサレム",
						value: "Asia/Jerusalem"
					},
					{
						name: "(UTC+02:00) ベイルート",
						value: "Asia/Beirut"
					},
					{
						name: "(UTC+03:00) バグダッド",
						value: "Asia/Baghdad"
					},
					{
						name: "(UTC+03:00) ミンスク",
						value: "Europe/Minsk"
					},
					{
						name: "(UTC+03:00) クエート、リヤド",
						value: "Asia/Riyadh"
					},
					{
						name: "(UTC+03:00) ナイロビ",
						value: "Africa/Nairobi"
					},
					{
						name: "(UTC+03:30) テヘラン",
						value: "Asia/Tehran"
					},
					{
						name: "(UTC+04:00) モスクワ、サンクトペテルブルグ、ボルゴグラード",
						value: "Europe/Moscow"
					},
					{
						name: "(UTC+04:00) トビリシ",
						value: "Asia/Tbilisi"
					},
					{
						name: "(UTC+04:00) エレバン",
						value: "Asia/Yerevan"
					},
					{
						name: "(UTC+04:00) アブダビ、マスカット",
						value: "Asia/Dubai"
					},
					{
						name: "(UTC+04:00) バクー",
						value: "Asia/Baku"
					},
					{
						name: "(UTC+04:00) ポートルイス",
						value: "Indian/Mauritius"
					},
					{
						name: "(UTC+04:30) カブール",
						value: "Asia/Kabul"
					},
					{
						name: "(UTC+05:00) タシケント",
						value: "Asia/Tashkent"
					},
					{
						name: "(UTC+05:00) イスラマバード、カラチ",
						value: "Asia/Karachi"
					},
					{
						name: "(UTC+05:30) スリジャヤワルダナプラコッテ",
						value: "Asia/Colombo"
					},
					{
						name: "(UTC+05:30) チェンナイ、コルカタ、ムンバイ、ニューデリー",
						value: "Indian/Kolkata"
					},
					{
						name: "(UTC+05:45) カトマンズ",
						value: "Asia/Kathmandu"
					},
					{
						name: "(UTC+06:00) アスタナ",
						value: "Asia/Almaty"
					},
					{
						name: "(UTC+06:00) ダッカ",
						value: "Asia/Dhaka"
					},
					{
						name: "(UTC+06:00) エカテリンブルグ",
						value: "Asia/Yekaterinburg"
					},
					{
						name: "(UTC+06:30) ヤンゴン(ラングーン)",
						value: "Asia/Rangoon"
					},
					{
						name: "(UTC+07:00) バンコク、ハノイ、ジャカルタ",
						value: "Asia/Bangkok"
					},
					{
						name: "(UTC+07:00) ノヴォシビルスク",
						value: "Asia/Novosibirsk"
					},
					{
						name: "(UTC+08:00) クラスノヤルスク",
						value: "Asia/Krasnoyarsk"
					},
					{
						name: "(UTC+08:00) ウランバートル",
						value: "Asia/Ulaanbaatar"
					},
					{
						name: "(UTC+08:00) 北京、重慶、香港特別行政区、ウルムチ",
						value: "Asia/Shanghai"
					},
					{
						name: "(UTC+08:00) パース",
						value: "Australia/Perth"
					},
					{
						name: "(UTC+08:00) クアラルンプール、シンガポール",
						value: "Asia/Singapore"
					},
					{
						name: "(UTC+08:00) 台北",
						value: "Asia/Taipei"
					},
					{
						name: "(UTC+09:00) イルクーツク",
						value: "Asia/Irkutsk"
					},
					{
						name: "(UTC+09:00) ソウル",
						value: "Asia/Seoul"
					},
					{
						name: "(UTC+09:00) 大阪、札幌、東京",
						value: "Asia/Tokyo"
					},
					{
						name: "(UTC+09:30) ダーウィン",
						value: "Australia/Darwin"
					},
					{
						name: "(UTC+09:30) アデレード",
						value: "Australia/Adelaide"
					},
					{
						name: "(UTC+10:00) ホバート",
						value: "Australia/Hobart"
					},
					{
						name: "(UTC+10:00) ヤクーツク",
						value: "Asia/Yakutsk"
					},
					{
						name: "(UTC+10:00) ブリスベン",
						value: "Australia/Brisbane"
					},
					{
						name: "(UTC+10:00) グアム、ポートモレスビー",
						value: "Pacific/Port_Moresby"
					},
					{
						name: "(UTC+10:00) キャンベラ、メルボルン、シドニー",
						value: "Australia/Sydney"
					},
					{
						name: "(UTC+11:00) ウラジオストク",
						value: "Asia/Vladivostok"
					},
					{
						name: "(UTC+11:00) ソロモン諸島、ニューカレドニア",
						value: "Pacific/Guadalcanal"
					},
					{
						name: "(UTC+12:00) 協定世界時+12",
						value: "Etc/GMT-12"
					},
					{
						name: "(UTC+12:00) フィジー、マーシャル諸島",
						value: "Pacific/Fiji"
					},
					{
						name: "(UTC+12:00) マガダン",
						value: "Asia/Magadan"
					},
					{
						name: "(UTC+12:00) オークランド、ウェリントン",
						value: "Pacific/Auckland"
					},
					{
						name: "(UTC+13:00) ヌクアロファ",
						value: "Pacific/Tongatapu"
					},
					{
						name: "(UTC+13:00) サモア",
						value: "Pacific/Apia"
					}
				]
			},
			{
				name: "refresh",
				display_name: "更新頻度",
				validate: "required,custom[integer],min[1]",
				style: "width:100px",
				type: "number",
				suffix: "秒",
				default_value: 1
			}
		],
		newInstance: function (settings, newInstanceCallback, updateCallback) {
			newInstanceCallback(new clockDatasource(settings, updateCallback));
		}
	});

	var jsonWebSocketDatasource = function(settings, updateCallback)
	{
		var self = this;
		var currentSettings = settings;
		var ws;

		var onOpen = function()
		{
			console.info("WebSocket(%s) Opened", currentSettings.url);
		}

		var onClose = function()
		{
			console.info("WebSocket Closed");
		}

		var onMessage = function(event)
		{
			var data = event.data;

			console.info("WebSocket received %s",data);

			var objdata = JSON.parse(data);

			if(typeof objdata == "object")
			{
				updateCallback(objdata);
			}
			else
			{
				updateCallback(data);
			}

		}

		function createWebSocket()
		{
			if(ws) {
				ws.close();
			}

			var url = currentSettings.url;
			ws = new WebSocket(url);

			ws.onopen = onOpen;
			ws.onclose = onClose;
			ws.onmessage = onMessage;
		}

		createWebSocket();

		this.updateNow = function()
		{
			createWebSocket();
		}

		this.onDispose = function()
		{
			ws.close();
		}

		this.onSettingsChanged = function(newSettings)
		{
			currentSettings = newSettings;

			createWebSocket();
		}
	};

	var jsonDatasource = function (settings, updateCallback) {
		var self = this;
		var updateTimer = null;
		var currentSettings = settings;
		var errorStage = 0; 	// 0 = try standard request
		// 1 = try JSONP
		// 2 = try thingproxy.freeboard.io
		var lockErrorStage = false;

		function updateRefresh(refreshTime) {
			if (updateTimer) {
				clearInterval(updateTimer);
			}

			updateTimer = setInterval(function () {
				self.updateNow();
			}, refreshTime);
		}

		updateRefresh(currentSettings.refresh * 1000);

		this.updateNow = function () {
			if ((errorStage > 1 && !currentSettings.use_thingproxy) || errorStage > 2) // We've tried everything, let's quit
			{
				return; // TODO: Report an error
			}

			var requestURL = currentSettings.url;

			if (errorStage == 2 && currentSettings.use_thingproxy) {
				requestURL = (location.protocol == "https:" ? "https:" : "http:") + "//thingproxy.freeboard.io/fetch/" + encodeURI(currentSettings.url);
			}

			var body = currentSettings.body;

			// Can the body be converted to JSON?
			if (body) {
				try {
					body = JSON.parse(body);
				}
				catch (e) {
				}
			}

			$.ajax({
				url: requestURL,
				dataType: (errorStage == 1) ? "JSONP" : "JSON",
				type: currentSettings.method || "GET",
				data: body,
				beforeSend: function (xhr) {
					try {
						_.each(currentSettings.headers, function (header) {
							var name = header.name;
							var value = header.value;

							if (!_.isUndefined(name) && !_.isUndefined(value)) {
								xhr.setRequestHeader(name, value);
							}
						});
					}
					catch (e) {
					}
				},
				success: function (data) {
					lockErrorStage = true;
					updateCallback(data);
				},
				error: function (xhr, status, error) {
					if (!lockErrorStage) {
						// TODO: Figure out a way to intercept CORS errors only. The error message for CORS errors seems to be a standard 404.
						errorStage++;
						self.updateNow();
					}
				}
			});
		}

		this.onDispose = function () {
			clearInterval(updateTimer);
			updateTimer = null;
		}

		this.onSettingsChanged = function (newSettings) {
			lockErrorStage = false;
			errorStage = 0;

			currentSettings = newSettings;
			updateRefresh(currentSettings.refresh * 1000);
			self.updateNow();
		}
	};

	freeboard.loadDatasourcePlugin({
		type_name: "JSON",
		display_name: "JSON",
		description: "指定のURLからJSONデータを受信します。",
		settings: [
			{
				name: "url",
				display_name: "URL",
				validate: "required,custom[url]",
				type: "text"
			},
			{
				name: "use_thingproxy",
				display_name: "プロキシサーバー試行",
				description: 'まず直接接続し、失敗した場合、JSONP接続を試みます。これも失敗した場合、プロキシサーバーを使用することができます。使用することで多くのAPI接続トラブルを解決できるでしょう。<a href="https://github.com/Freeboard/thingproxy" target="_blank">詳細</a>',
				type: "boolean",
				default_value: true
			},
			{
				name: "refresh",
				display_name: "更新頻度",
				validate: "required,custom[integer],min[1]",
				style: "width:100px",
				type: "number",
				suffix: "秒",
				default_value: 5
			},
			{
				name: "method",
				display_name: "メソッド",
				type: "option",
				style: "width:200px",
				options: [
					{
						name: "GET",
						value: "GET"
					},
					{
						name: "POST",
						value: "POST"
					},
					{
						name: "PUT",
						value: "PUT"
					},
					{
						name: "DELETE",
						value: "DELETE"
					}
				]
			},
			{
				name: "body",
				display_name: "Body",
				type: "json",
				validate: "optional,maxSize[2000]",
				description: "リクエスト本文。通常はPOSTメソッド時に使用される。最大2000文字"
			},
			{
				name: "headers",
				display_name: "Header",
				type: "array",
				settings: [
					{
						name: "name",
						display_name: "名前",
						type: "text",
						validate: "optional,maxSize[500]",
						description: "最大500文字"
					},
					{
						name: "value",
						display_name: "値",
						type: "text",
						validate: "optional,maxSize[500]",
						description: "最大500文字"
					}
				]
			}
		],
		newInstance: function (settings, newInstanceCallback, updateCallback) {
			newInstanceCallback(new jsonDatasource(settings, updateCallback));
		}
	});

	var openWeatherMapDatasource = function (settings, updateCallback) {
		var self = this;
		var updateTimer = null;
		var currentSettings = settings;

		function updateRefresh(refreshTime) {
			if (updateTimer) {
				clearInterval(updateTimer);
			}

			updateTimer = setInterval(function () {
				self.updateNow();
			}, refreshTime);
		}

		function toTitleCase(str) {
			return str.replace(/\w\S*/g, function (txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		}

		updateRefresh(currentSettings.refresh * 1000);

		this.updateNow = function () {
			$.ajax({
				url: "http://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(currentSettings.location) + "&units=" + currentSettings.units,
				dataType: "JSONP",
				success: function (data) {
					// Rejigger our data into something easier to understand
					var newData = {
						place_name: data.name,
						latitude: data.coord.lat,
						longitude: data.coord.lon,
						sunrise: (new Date(data.sys.sunrise * 1000)).toLocaleTimeString(),
						sunset: (new Date(data.sys.sunset * 1000)).toLocaleTimeString(),
						conditions: toTitleCase(data.weather[0].description),
						current_temp: data.main.temp,
						high_temp: data.main.temp_max,
						low_temp: data.main.temp_min,
						pressure: data.main.pressure,
						humidity: data.main.humidity,
						wind_speed: data.wind.speed,
						wind_direction: data.wind.deg
					};

					updateCallback(newData);
				},
				error: function (xhr, status, error) {
				}
			});
		}

		this.onDispose = function () {
			clearInterval(updateTimer);
			updateTimer = null;
		}

		this.onSettingsChanged = function (newSettings) {
			currentSettings = newSettings;
			self.updateNow();
			updateRefresh(currentSettings.refresh * 1000);
		}
	};

	freeboard.loadDatasourcePlugin({
		type_name: "openweathermap",
		display_name: "Open Weather Map API",
		description: "天候や予測履歴を含む各種気象データを受信します。",
		settings: [
			{
				name: "location",
				display_name: "場所",
				validate: "required,maxSize[200]",
				type: "text",
				description: "最大200文字<br>例: London, UK"
			},
			{
				name: "units",
				display_name: "単位",
				style: "width:200px",
				type: "option",
				default_value: "metric",
				options: [
					{
						name: "メトリック",
						value: "metric"
					},
					{
						name: "インペリアル",
						value: "imperial"
					}
				]
			},
			{
				name: "refresh",
				display_name: "更新頻度",
				validate: "required,custom[integer],min[1]",
				style: "width:100px",
				type: "number",
				suffix: "秒",
				default_value: 5
			}
		],
		newInstance: function (settings, newInstanceCallback, updateCallback) {
			newInstanceCallback(new openWeatherMapDatasource(settings, updateCallback));
		}
	});

	freeboard.loadDatasourcePlugin({
		"type_name": "playback",
		"display_name": "Playback",
		"description": "指定された間隔で連続したデータを再生します。オブジェクトの配列を含む有効なJSONファイルを待ち受けします。",
		"settings": [
			{
				name: "datafile",
				display_name: "データファイルURL",
				validate: "required,custom[url]",
				type: "text",
				description: "JSON配列データへのリンク"
			},
			{
				name: "is_jsonp",
				display_name: "JSONP使用",
				type: "boolean"
			},
			{
				name: "loop",
				display_name: "ループ再生",
				type: "boolean",
				description: "巻戻しとループ再生時終了"
			},
			{
				name: "refresh",
				display_name: "更新頻度",
				validate: "required,custom[integer],min[1]",
				style: "width:100px",
				type: "number",
				suffix: "秒",
				default_value: 5
			}
		],
		newInstance: function (settings, newInstanceCallback, updateCallback) {
			newInstanceCallback(new playbackDatasource(settings, updateCallback));
		}
	});

	freeboard.loadDatasourcePlugin({
		type_name  : "JSON WebSocket",
		display_name : "JSON WebSocket",
		description : "ブラウザ内蔵のWebSocket APIを使用しJSON形式のデータを取得します。",
		settings   : [
			{
				name: "url",
				display_name: "DNSホスト名",
				validate: "required,maxSize[1000]",
				type: "text",
				description: "最大1000文字"
			}
		],
		newInstance: function(settings, newInstanceCallback, updateCallback)
		{
			newInstanceCallback( new jsonWebSocketDatasource(settings, updateCallback));
		}
	});

	var nodeJSDatasource = function(settings, updateCallback) {

		var self = this,
			currentSettings = settings,
			url,
			socket,
			newMessageCallback;

		function onNewMessageHandler(message) {
			var objdata = JSON.parse(message);
			if (typeof objdata == "object") {
				updateCallback(objdata);
			} else {
				updateCallback(message);
			}
		}

		function joinRoom(roomName, roomEvent) {
			// Sends request to join the new room
			// (handle event on server-side)
			self.socket.emit(roomEvent, roomName);
			console.info("Joining room '%s' with event '%s'", roomName, roomEvent);
		}

		function discardSocket() {
			// Disconnect datasource websocket
			if (self.socket) {
				self.socket.disconnect();
			}
		}

		function connectToServer(url, rooms) {
			// Establish connection with server
			self.url = url;
			self.socket = io.connect(self.url,{'forceNew':true});

			// Join the rooms
			self.socket.on('connect', function() {
				console.info("Connecting to Node.js at: %s", self.url);
			});

			// Join the rooms
			_.each(rooms, function(roomConfig) {
				var roomName = roomConfig.roomName;
				var roomEvent = roomConfig.roomEvent;

				if (!_.isUndefined(roomName) && !_.isUndefined(roomEvent)) {
					joinRoom(roomName, roomEvent);
				}

			});

			self.socket.on('connect_error', function(object) {
				console.error("It was not possible to connect to Node.js at: %s", self.url);
			});

			self.socket.on('reconnect_error', function(object) {
				console.error("Still was not possible to re-connect to Node.js at: %s", self.url);
			});

			self.socket.on('reconnect_failed', function(object) {
				console.error("Re-connection to Node.js failed at: %s", self.url);
				discardSocket();
			});

		}


		function initializeDataSource() {
			// Reset connection to server
			discardSocket();
			connectToServer(currentSettings.url, currentSettings.rooms);

			// Subscribe to the events
			var newEventName = currentSettings.eventName;
			self.newMessageCallback = onNewMessageHandler;
			_.each(currentSettings.events, function(eventConfig) {
				var event = eventConfig.eventName;
				console.info("Subscribing to event: %s", event);
				self.socket.on(event, function(message) {
					self.newMessageCallback(message);
				});
			});
		}

		this.updateNow = function() {
			// Just seat back, relax and wait for incoming events
			return;
		};

		this.onDispose = function() {
			// Stop responding to messages
			self.newMessageCallback = function(message) {
				return;
			};
			discardSocket();
		};

		this.onSettingsChanged = function(newSettings) {
			currentSettings = newSettings;
			initializeDataSource();
		};

		initializeDataSource();
	};

	freeboard.loadDatasourcePlugin({
		type_name : "node_js",
		display_name : "Node.js (Socket.io)",
		description : "<a href='http://socket.io/', target='_blank'>Socket.io</a>を使用したnode.jsサーバーからデータソースをリアルタイムでストリーミングします。",
		external_scripts : [ "https://cdn.socket.io/socket.io-1.2.1.js" ],
		settings : [
			{
				name: "url",
				display_name: "DNSホスト名",
				validate: "required,maxSize[1000]",
				type: "text",
				description: "最大1000文字 (オプション) カスタム名前空間を使用する場合、URLの最後に名前空間を追加して下さい。<br>例: http://localhost/chat"
			},
			{
				name : "events",
				display_name : "イベント",
				description : "データソースへ追加するイベント名を指定して下さい。",
				type : "array",
				settings : [ {
					name : "eventName",
					display_name : "イベント名",
					validate: "optional,maxSize[100]",
					type: "text"
				} ]
			},
			{
				name : "rooms",
				display_name : "(オプション) ルーム",
				description : "ルームを使用する場合, 追加したいルーム名を指定して下さい。その他の場合は空白のままにしておいて下さい。",
				type : "array",
				settings : [ {
					name : "roomName",
					display_name : "ルーム名",
					validate: "optional,maxSize[100]",
					type: "text"
				}, {
					name : "roomEvent",
					display_name : "ルームに参加するイベント名",
					validate: "optional,maxSize[100]",
					type: "text"
				} ]
			}
		],
		newInstance : function(settings, newInstanceCallback, updateCallback) {
			newInstanceCallback(new nodeJSDatasource(settings, updateCallback));
		}
	});

	var mqttDatasource = function(settings, updateCallback) {

		var self = this;
		var currentSettings = settings;
		var client;
		var dispose = false;
		var CONNECTION_DELAY = 1000;

		function onConnect(frame) {
			console.info("MQTT Connected to %s", currentSettings.url);
			self.client.subscribe(_.isUndefined(currentSettings.topic) ? "" : currentSettings.topic);
		}

		function onConnectionLost(responseObject) {
			console.info("MQTT ConnectionLost %s %s", currentSettings.url, responseObject.errorMessage);
			if (dispose == false && currentSettings.reconnect == true) {
				_.delay(function() {
					connectToServer();
				}, CONNECTION_DELAY);
			}
		}

		function onConnectFailure(error) {
			self.client = null;
			console.error("MQTT Failed Connect to %s", currentSettings.url);
		}

		function onMessageArrived(message) {
			console.info("MQTT Received %s from %s", message,  currentSettings.url);

			var objdata = JSON.parse(message.payloadString);
			if (typeof objdata == "object") {
				updateCallback(objdata);
			} else {
				updateCallback(message.payloadString);
			}
		}

		function discardSocket() {
			// Disconnect datasource MQTT
			if (self.client) {
				self.client.disconnect();
				self.client = null;
			}
		}

		function connectToServer() {

			try {
				discardSocket();

				self.client = new Paho.MQTT.Client(
					_.isUndefined(currentSettings.url) ? "" : currentSettings.url,
					_.isUndefined(currentSettings.port) ? "" : currentSettings.port,
					_.isUndefined(currentSettings.clientID) ? "" : currentSettings.clientID);
				self.client.onConnect = onConnect;
				self.client.onMessageArrived = onMessageArrived;
				self.client.onConnectionLost = onConnectionLost;
				self.client.connect({
					userName: _.isUndefined(currentSettings.username) ? "" : currentSettings.username,
					password: _.isUndefined(currentSettings.password) ? "" : currentSettings.password,
					onSuccess: onConnect,
					onFailure: onConnectFailure
				});
			} catch (e) {
				console.error(e);
			}
		}


		function initializeDataSource() {
			connectToServer();
		}

		this.updateNow = function() {
			// Just seat back, relax and wait for incoming events
			return;
		};

		this.onDispose = function() {
			dispose = true;
			discardSocket();
		};

		this.onSettingsChanged = function(newSettings) {
			currentSettings = newSettings;
			discardSocket();
		};

		initializeDataSource();
	};

	freeboard.loadDatasourcePlugin({
		type_name : "mqtt",
		display_name : "MQTT over Websocket",
		description : "<a href='http://mqtt.org/', target='_blank'>MQTT</a>プロトコルをWebSocketを介し使用し、MQTTブローカーサーバーからデータソースをリアルタイムで取得します。",
		external_scripts : [ "plugins/thirdparty/mqttws31.js" ],
		settings : [
			{
				name : "url",
				display_name : "DNSホスト名",
				validate: "required,maxSize[1000]",
				type: "text",
				description: "最大1000文字<br>MQTTブローカーサーバーのDNSホスト名を設定して下さい。<br>例: location.hostname"
			},
			{
				name : "port",
				display_name : "ポート番号",
				validate: "required,custom[integer],min[1]",
				type: "number",
				style: "width:100px",
				default_value: 8080
			},
			{
				name : "clientID",
				display_name : "クライアントID",
				validate: "required,maxSize[23]",
				type: "text",
				description: "最大23文字<br>任意のクライアントID文字列",
				default_value: "SensorCorpus"
			},
			{
				name : "topic",
				display_name : "トピック",
				validate: "required,maxSize[500]",
				type: "text",
				description: "最大500文字<br>購読するトピック名を設定して下さい。<br>例: my/topic",
				default_value: ""
			},
			{
				name : "username",
				display_name : "(オプション) ユーザー名",
				validate: "optional,maxSize[100]",
				type: "text",
				description: "最大100文字<br>必要ない場合は空白。"
			},
			{
				name : "password",
				display_name : "(オプション) パスワード",
				validate: "optional,maxSize[100]",
				type: "text",
				description: "最大100文字<br>必要ない場合は空白。"
			},
			{
				name : "reconnect",
				display_name : "自動再接続",
				type: "boolean",
				description : "接続が切れた場合、自動的に再接続します。",
				default_value: true
			}
		],
		newInstance : function(settings, newInstanceCallback, updateCallback) {
			newInstanceCallback(new mqttDatasource(settings, updateCallback));
		}
	})
}());
// ┌────────────────────────────────────────────────────────────────────┐ \\
// │ F R E E B O A R D                                                  │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright © 2013 Jim Heising (https://github.com/jheising)         │ \\
// │ Copyright © 2013 Bug Labs, Inc. (http://buglabs.net)               │ \\
// │ Copyright © 2015 Daisuke Tanaka (https://github.com/tanaka0323)    │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT license.                                    │ \\
// └────────────────────────────────────────────────────────────────────┘ \\

(function () {
	var SPARKLINE_HISTORY_LENGTH = 100;
	var SPARKLINE_COLORS = ["#FF9900", "#FFFFFF", "#B3B4B4", "#6B6B6B", "#28DE28", "#13F7F9", "#E6EE18", "#C41204", "#CA3CB8", "#0B1CFB"];

	function easeTransitionText(newValue, textElement, duration) {

		var currentValue = $(textElement).text();

		if (currentValue == newValue)
			return;

		if ($.isNumeric(newValue) && $.isNumeric(currentValue)) {
			var numParts = newValue.toString().split('.');
			var endingPrecision = 0;

			if (numParts.length > 1) {
				endingPrecision = numParts[1].length;
			}

			numParts = currentValue.toString().split('.');
			var startingPrecision = 0;

			if (numParts.length > 1) {
				startingPrecision = numParts[1].length;
			}

			jQuery({transitionValue: Number(currentValue), precisionValue: startingPrecision}).animate({transitionValue: Number(newValue), precisionValue: endingPrecision}, {
				duration: duration,
				step: function () {
					$(textElement).text(this.transitionValue.toFixed(this.precisionValue));
				},
				done: function () {
					$(textElement).text(newValue);
				}
			});
		}
		else {
			$(textElement).text(newValue);
		}
	}

	function addValueToSparkline(element, value) {
		var values = $(element).data().values;
		var valueMin = $(element).data().valueMin;
		var valueMax = $(element).data().valueMax;
		if (!values) {
			values = [];
			valueMin = undefined;
			valueMax = undefined;
		}

		var collateValues = function(val, plotIndex) {
			if(!values[plotIndex]) {
				values[plotIndex] = [];
			}
			if (values[plotIndex].length >= SPARKLINE_HISTORY_LENGTH) {
				values[plotIndex].shift();
			}
			values[plotIndex].push(Number(val));

			if(valueMin === undefined || val < valueMin) {
				valueMin = val;
			}
			if(valueMax === undefined || val > valueMax) {
				valueMax = val;
			}
		}

		if(_.isArray(value)) {
			_.each(value, collateValues);
		} else {
			collateValues(value, 0);
		}
		$(element).data().values = values;
		$(element).data().valueMin = valueMin;
		$(element).data().valueMax = valueMax;

		var composite = false;
		_.each(values, function(valueArray, valueIndex) {
			$(element).sparkline(valueArray, {
				type: "line",
				composite: composite,
				height: "100%",
				width: "100%",
				fillColor: false,
				lineColor: SPARKLINE_COLORS[valueIndex % SPARKLINE_COLORS.length],
				lineWidth: 2,
				spotRadius: 3,
				spotColor: false,
				minSpotColor: "#78AB49",
				maxSpotColor: "#78AB49",
				highlightSpotColor: "#9D3926",
				highlightLineColor: "#9D3926",
				chartRangeMin: valueMin,
				chartRangeMax: valueMax
			});
			composite = true;
		});
	}

	var valueStyle = freeboard.getStyleString("values");

	freeboard.addStyle('.widget-big-text', valueStyle + "font-size:75px;");

	freeboard.addStyle('.tw-display', 'width: 100%; height:100%; display:table; table-layout:fixed;');

	freeboard.addStyle('.tw-tr',
		'display:table-row;');

	freeboard.addStyle('.tw-tg',
		'display:table-row-group;');

	freeboard.addStyle('.tw-tc',
		'display:table-caption;');

	freeboard.addStyle('.tw-td',
		'display:table-cell;');

	freeboard.addStyle('.tw-value',
		valueStyle +
		'overflow: hidden;' +
		'display: inline-block;' +
		'text-overflow: ellipsis;');

	freeboard.addStyle('.tw-unit',
		'display: inline-block;' +
		'padding-left: 10px;' +
		'padding-bottom: 1.1em;' +
		'vertical-align: bottom;');

	freeboard.addStyle('.tw-value-wrapper',
		'position: relative;' +
		'vertical-align: middle;' +
		'height:100%;');

	freeboard.addStyle('.tw-sparkline',
		'height:20px;');

	var textWidget = function (settings) {

		var self = this;

		var currentSettings = settings;
		var displayElement = $('<div class="tw-display"></div>');
		var titleElement = $('<h2 class="section-title tw-title tw-td"></h2>');
		var valueElement = $('<div class="tw-value"></div>');
		var unitsElement = $('<div class="tw-unit"></div>');
		var sparklineElement = $('<div class="tw-sparkline tw-td"></div>');

		function updateValueSizing()
		{
			if(!_.isUndefined(currentSettings.units) && currentSettings.units != "") // If we're displaying our units
			{
				valueElement.css("max-width", (displayElement.innerWidth() - unitsElement.outerWidth(true)) + "px");
			}
			else
			{
				valueElement.css("max-width", "100%");
			}
		}

		this.render = function (element) {
			$(element).empty();

			$(displayElement)
				.append($('<div class="tw-tr"></div>').append(titleElement))
				.append($('<div class="tw-tr"></div>').append($('<div class="tw-value-wrapper tw-td"></div>').append(valueElement).append(unitsElement)))
				.append($('<div class="tw-tr"></div>').append(sparklineElement));

			$(element).append(displayElement);

			updateValueSizing();
		}

		this.onSettingsChanged = function (newSettings) {
			currentSettings = newSettings;

			var shouldDisplayTitle = (!_.isUndefined(newSettings.title) && newSettings.title != "");
			var shouldDisplayUnits = (!_.isUndefined(newSettings.units) && newSettings.units != "");

			if(newSettings.sparkline)
			{
				sparklineElement.attr("style", null);
			}
			else
			{
				delete sparklineElement.data().values;
				sparklineElement.empty();
				sparklineElement.hide();
			}

			if(shouldDisplayTitle)
			{
				titleElement.html((_.isUndefined(newSettings.title) ? "" : newSettings.title));
				titleElement.attr("style", null);
			}
			else
			{
				titleElement.empty();
				titleElement.hide();
			}

			if(shouldDisplayUnits)
			{
				unitsElement.html((_.isUndefined(newSettings.units) ? "" : newSettings.units));
				unitsElement.attr("style", null);
			}
			else
			{
				unitsElement.empty();
				unitsElement.hide();
			}

			var valueFontSize = 30;

			if(newSettings.size == "big")
			{
				valueFontSize = 75;

				if(newSettings.sparkline)
				{
					valueFontSize = 60;
				}
			}

			valueElement.css({"font-size" : valueFontSize + "px"});

			updateValueSizing();
		}

		this.onSizeChanged = function()
		{
			updateValueSizing();
		}

		this.onCalculatedValueChanged = function (settingName, newValue) {
			if (settingName == "value") {

				if (currentSettings.animate) {
					easeTransitionText(newValue, valueElement, 500);
				}
				else {
					valueElement.text(newValue);
				}

				if (currentSettings.sparkline) {
					addValueToSparkline(sparklineElement, newValue);
				}
			}
		}

		this.onDispose = function () {

		}

		this.getHeight = function () {
			if (currentSettings.size == "big" || currentSettings.sparkline) {
				return 2;
			}
			else {
				return 1;
			}
		}

		this.onSettingsChanged(settings);
	};

	freeboard.loadWidgetPlugin({
		type_name: "text_widget",
		display_name: "テキスト",
		"external_scripts" : [
			"plugins/thirdparty/jquery.sparkline.min.js"
		],
		settings: [
			{
				name: "title",
				display_name: "タイトル",
				validate: "optional,maxSize[100]",
				type: "text",
				description: "最大100文字"
			},
			{
				name: "size",
				display_name: "サイズ",
				type: "option",
				options: [
					{
						name: "レギュラー",
						value: "regular"
					},
					{
						name: "ビッグ",
						value: "big"
					}
				]
			},
			{
				name: "value",
				display_name: "値",
				validate: "optional,maxSize[2000]",
				type: "calculated",
				description: "最大2000文字"
			},
			{
				name: "sparkline",
				display_name: "スパークラインを含む",
				type: "boolean"
			},
			{
				name: "animate",
				display_name: "値変化アニメーション",
				type: "boolean",
				default_value: true
			},
			{
				name: "units",
				display_name: "単位",
				validate: "optional,maxSize[20]",
				type: "text",
				style: "width:150px",
				description: "最大20文字"
			}
		],
		newInstance: function (settings, newInstanceCallback) {
			newInstanceCallback(new textWidget(settings));
		}
	});

	var gaugeID = 0;
	freeboard.addStyle('.gauge-widget-wrapper', "width: 100%;text-align: center;");
	freeboard.addStyle('.gauge-widget', "width:280px;height:214px;display:inline-block;");

	var gaugeWidget = function (settings) {
		var self = this;

		var thisGaugeID = "gauge-" + gaugeID++;
		var titleElement = $('<h2 class="section-title"></h2>');
		var wrapperElement = $('<div class="gauge-widget-wrapper"></div>');
		var gaugeElement = $('<div class="gauge-widget" id="' + thisGaugeID + '"></div>');

		var gaugeObject;
		var rendered = false;

		var currentSettings = settings;

		function createGauge() {
			if (!rendered) {
				return;
			}

			currentSettings.shape = parseInt(currentSettings.shape);

			gaugeElement.empty();

			var valueStyle = freeboard.getStyleObject("values");

			gaugeObject = new JustGage({
				id: thisGaugeID,
				value: (_.isUndefined(currentSettings.min_value) ? 0 : currentSettings.min_value),
				min: (_.isUndefined(currentSettings.min_value) ? 0 : currentSettings.min_value),
				max: (_.isUndefined(currentSettings.max_value) ? 0 : currentSettings.max_value),
				label: currentSettings.units,
				showInnerShadow: false,
				shape: currentSettings.shape,
				levelColors: [ currentSettings.gauge_lower_color, currentSettings.gauge_mid_color, currentSettings.gauge_upper_color ],
				gaugeWidthScale: currentSettings.gauge_widthscale/100.0,
				gaugeColor: currentSettings.gauge_color,
				labelFontFamily: valueStyle['font-family-light'],
				labelFontColor: currentSettings.value_fontcolor,
				valueFontColor: currentSettings.value_fontcolor
			});
		}

		this.render = function (element) {
			rendered = true;
			$(element).append(titleElement).append(wrapperElement.append(gaugeElement));

			// for justgauge redraw bug.
			var timerID = setTimeout(function() {
				createGauge();
				clearTimeout(timerID);
			}, 500);
		}

		this.onSettingsChanged = function (newSettings) {
			if (newSettings.min_value != currentSettings.min_value ||
				newSettings.max_value != currentSettings.max_value ||
				newSettings.units != currentSettings.units ||
				newSettings.shape != currentSettings.shape ||
				newSettings.gauge_widthscale != currentSettings.gauge_widthscale ||
				newSettings.value_fontcolor != currentSettings.value_fontcolor ||
				newSettings.gauge_upper_color != currentSettings.gauge_upper_color ||
				newSettings.gauge_mid_color != currentSettings.gauge_mid_color ||
				newSettings.gauge_lower_color != currentSettings.gauge_lower_color ||
				newSettings.gauge_color != currentSettings.gauge_color) {
				currentSettings = newSettings;
				createGauge();
			}
			else {
				currentSettings = newSettings;
			}

			titleElement.html(newSettings.title);
		}

		this.onCalculatedValueChanged = function (settingName, newValue) {
			if (!_.isUndefined(gaugeObject)) {
				gaugeObject.refresh(Number(newValue));
			}
		}

		this.onDispose = function () {
		}

		this.getHeight = function () {
			return 4;
		}

		this.onSettingsChanged(settings);
	};

	freeboard.loadWidgetPlugin({
		type_name: "gauge",
		display_name: "ゲージ",
		"external_scripts" : [
			"plugins/thirdparty/raphael.2.1.0.min.js",
			"plugins/thirdparty/justgage.min.js"
		],
		settings: [
			{
				name: "title",
				display_name: "タイトル",
				validate: "optional,maxSize[100]",
				type: "text",
				description: "最大100文字"
			},
			{
				name: "value",
				display_name: "値",
				validate: "optional,maxSize[2000]",
				type: "calculated",
				description: "最大2000文字"
			},
			{
				name: "shape",
				display_name: "型",
				type: "option",
				options: [
					{
						name: "ハーフ",
						value: 0
					},
					{
						name: "ファン",
						value: 1
					},
					{
						name: "ドーナッツ",
						value: 2
					}
				]
			},
			{
				name: "units",
				display_name: "単位",
				validate: "optional,maxSize[20]",
				style: "width:150px",
				type: "text",
				description: "最大20文字"
			},
			{
				name: "value_fontcolor",
				display_name: "値フォント色",
				type: "color",
				validate: "required,custom[hexcolor]",
				default_value: "#d3d4d4",
				description: "デフォルト色: #d3d4d4"
			},
			{
				name: "gauge_upper_color",
				display_name: "ゲージ色 Upper",
				type: "color",
				validate: "required,custom[hexcolor]",
				default_value: "#ff0000",
				description: "デフォルト色: #ff0000"
			},
			{
				name: "gauge_mid_color",
				display_name: "ゲージ色 Mid",
				type: "color",
				validate: "required,custom[hexcolor]",
				default_value: "#f9c802",
				description: "デフォルト色: #f9c802"
			},
			{
				name: "gauge_lower_color",
				display_name: "ゲージ色 Lower",
				type: "color",
				validate: "required,custom[hexcolor]",
				default_value: "#a9d70b",
				description: "デフォルト色: #a9d70b"
			},
			{
				name: "gauge_color",
				display_name: "ゲージ背景色",
				type: "color",
				validate: "required,custom[hexcolor]",
				default_value: "#edebeb",
				description: "デフォルト色: #edebeb"
			},
			{
				name: "gauge_widthscale",
				display_name: "ゲージ太さ",
				type: "number",
				style: "width:100px",
				validate: "required,custom[integer],min[0],max[200]",
				default_value: 100,
				description: "0から200まで"
			},
			{
				name: "min_value",
				display_name: "最小値",
				type: "number",
				style: "width:100px",
				validate: "required,custom[number],min[-100000000],max[100000000]",
				default_value: 0,
				description: "数値のみ"
			},
			{
				name: "max_value",
				display_name: "最大値",
				type: "number",
				style: "width:100px",
				validate: "required,custom[number],min[-100000000],max[100000000]",
				default_value: 100,
				description: "最小値以上"
			}
		],
		newInstance: function (settings, newInstanceCallback) {
			newInstanceCallback(new gaugeWidget(settings));
		}
	});

	freeboard.addStyle('.sparkline', "width:100%;height: 75px;");
	var sparklineWidget = function (settings) {
		var self = this;

		var titleElement = $('<h2 class="section-title"></h2>');
		var sparklineElement = $('<div class="sparkline"></div>');

		this.render = function (element) {
			$(element).append(titleElement).append(sparklineElement);
		}

		this.onSettingsChanged = function (newSettings) {
			titleElement.html((_.isUndefined(newSettings.title) ? "" : newSettings.title));
		}

		this.onCalculatedValueChanged = function (settingName, newValue) {
			addValueToSparkline(sparklineElement, newValue);
		}

		this.onDispose = function () {
		}

		this.getHeight = function () {
			return 2;
		}

		this.onSettingsChanged(settings);
	};

	freeboard.loadWidgetPlugin({
		type_name: "sparkline",
		display_name: "スパークラインチャート",
		"external_scripts" : [
			"plugins/thirdparty/jquery.sparkline.min.js"
		],
		settings: [
			{
				name: "title",
				display_name: "タイトル",
				validate: "optional,maxSize[100]",
				type: "text",
				description: "最大100文字"
			},
			{
				name: "value",
				display_name: "値",
				validate: "optional,maxSize[500]",
				type: "calculated",
				description: "最大500文字",
				multi_input: true
			}
		],
		newInstance: function (settings, newInstanceCallback) {
			newInstanceCallback(new sparklineWidget(settings));
		}
	});

	freeboard.addStyle('.pointer-widget-wrapper', "width:100%; height:214px; text-align:center;");
	freeboard.addStyle('.pointer-widget', "width:280px; height:100%; display: inline-block;");
	freeboard.addStyle('.pointer-value', "position:absolute; height:93px; margin:auto; top:0px; left:0px; bottom:0px; width:100%; text-align:center;");

	var pointerWidget = function (settings) {
		var self = this;
		var paper;
		var strokeWidth = 3;
		var circle = null;
		var triangle = null;
		var width, height;
		var currentValue = 0;

		var titleElement = $('<h2 class="section-title"></h2>');
		var widgetwrapperElement = $('<div class="pointer-widget-wrapper"></div>');
		var widgetElement = $('<div class="pointer-widget"></div>');
		var valueElement = $('<div class="pointer-value"></div>');
		var valueDiv = $('<div class="widget-big-text"></div>');
		var unitsDiv = $('<div></div>');

		var currentSettings = settings;

		function polygonPath(points) {
			if (!points || points.length < 2)
				return [];
			var path = []; //will use path object type
			path.push(['m', points[0], points[1]]);
			for (var i = 2; i < points.length; i += 2) {
				path.push(['l', points[i], points[i + 1]]);
			}
			path.push(['z']);
			return path;
		}

		this.render = function (element) {
			$(element).append(titleElement);
			$(element).append(widgetwrapperElement.append(widgetElement).append(valueElement.append(valueDiv).append(unitsDiv)));

			width = widgetElement.width();
			height = widgetElement.height();

			var radius = Math.min(width, height) / 2 - strokeWidth * 2;

			paper = Raphael(widgetElement[0], width, height);
			circle = paper.circle(width / 2, height / 2, radius);
			circle.attr("stroke", currentSettings.circle_color);
			circle.attr("stroke-width", strokeWidth);

			triangle = paper.path(polygonPath([width / 2, (height / 2) - radius + strokeWidth, 15, 20, -30, 0]));
			triangle.attr("stroke-width", 0);
			triangle.attr("fill", "#fff");
		}

		this.onSettingsChanged = function (newSettings) {
			currentSettings = newSettings;

			if (circle) {
				circle.attr("stroke", newSettings.circle_color);
			}
			if (triangle) {
				triangle.attr("fill", newSettings.pointer_color);
			}

			titleElement.html(newSettings.title);
			unitsDiv.html(newSettings.units);
		}

		this.onCalculatedValueChanged = function (settingName, newValue) {
			if (settingName == "direction") {
				if (!_.isUndefined(triangle)) {
					var direction = "r";

					var oppositeCurrent = currentValue + 180;

					if (oppositeCurrent < newValue) {
						//direction = "l";
					}

					triangle.animate({transform: "r" + newValue + "," + (width / 2) + "," + (height / 2)}, 250, "bounce");
				}

				currentValue = newValue;
			}
			else if (settingName == "value_text") {
				valueDiv.html(newValue);
			}
		}

		this.onDispose = function () {
		}

		this.getHeight = function () {
			return 4;
		}

		this.onSettingsChanged(settings);
	};

	freeboard.loadWidgetPlugin({
		type_name: "pointer",
		display_name: "ポインタ",
		"external_scripts" : [
			"plugins/thirdparty/raphael.2.1.0.min.js"
		],
		settings: [
			{
				name: "title",
				display_name: "タイトル",
				validate: "optional,maxSize[100]",
				type: "text",
				description: "最大100文字"
			},
			{
				name: "direction",
				display_name: "方向",
				validate: "optional,maxSize[2000]",
				type: "calculated",
				description: "最大2000文字<br>角度を入力して下さい。"
			},
			{
				name: "value_text",
				display_name: "値テキスト",
				validate: "optional,maxSize[2000]",
				type: "calculated",
				description: "最大2000文字"
			},
			{
				name: "units",
				display_name: "単位",
				validate: "optional,maxSize[20]",
				style: "width:150px",
				type: "text",
				description: "最大20文字"
			},
			{
				name: "circle_color",
				display_name: "サークル色",
				validate: "required,custom[hexcolor]",
				type: "color",
				default_value: "#ff9900",
				description: "デフォルト色: #ff9900"
			},
			{
				name: "pointer_color",
				display_name: "ポインタ色",
				validate: "required,custom[hexcolor]",
				type: "color",
				default_value: "#fff",
				description: "デフォルト色: #fff"
			}
		],
		newInstance: function (settings, newInstanceCallback) {
			newInstanceCallback(new pointerWidget(settings));
		}
	});

	var pictureWidget = function(settings)
	{
		var self = this;
		var widgetElement;
		var timer;
		var imageURL;

		function stopTimer()
		{
			if(timer)
			{
				clearInterval(timer);
				timer = null;
			}
		}

		function updateImage()
		{
			if(widgetElement && imageURL)
			{
				var cacheBreakerURL = imageURL + (imageURL.indexOf("?") == -1 ? "?" : "&") + Date.now();

				$(widgetElement).css({
					"background-image" :  "url(" + cacheBreakerURL + ")"
				});
			}
		}

		this.render = function(element)
		{
			$(element).css({
				width : "100%",
				height: "100%",
				"background-size" : "cover",
				"background-position" : "center"
			});

			widgetElement = element;
		}

		this.onSettingsChanged = function(newSettings)
		{
			stopTimer();

			if(newSettings.refresh && newSettings.refresh > 0)
			{
				timer = setInterval(updateImage, Number(newSettings.refresh) * 1000);
			}
		}

		this.onCalculatedValueChanged = function(settingName, newValue)
		{
			if(settingName == "src")
			{
				imageURL = newValue;
			}

			updateImage();
		}

		this.onDispose = function()
		{
			stopTimer();
		}

		this.getHeight = function()
		{
			return 4;
		}

		this.onSettingsChanged(settings);
	};

	freeboard.loadWidgetPlugin({
		type_name: "picture",
		display_name: "画像",
		fill_size: true,
		settings: [
			{
				name: "src",
				display_name: "画像URL",
				validate: "optional,maxSize[2000]",
				type: "calculated",
				description: "最大2000文字"
			},
			{
				type: "number",
				display_name: "更新頻度",
				validate: "optional,custom[integer],min[1]",
				style: "width:100px",
				name: "number",
				suffix: "秒",
				description:"更新する必要がない場合は空白のまま"
			}
		],
		newInstance: function (settings, newInstanceCallback) {
			newInstanceCallback(new pictureWidget(settings));
		}
	});

	freeboard.addStyle('.indicator-light', "border-radius:50%;width:22px;height:22px;border:2px solid #3d3d3d;margin-top:5px;float:left;background-color:#222;margin-right:10px;");
	freeboard.addStyle('.indicator-light.on', "background-color:#FFC773;box-shadow: 0px 0px 15px #FF9900;border-color:#FDF1DF;");
	freeboard.addStyle('.indicator-text', "margin-top:10px;");
	var indicatorWidget = function (settings) {
		var self = this;
		var titleElement = $('<h2 class="section-title"></h2>');
		var stateElement = $('<div class="indicator-text"></div>');
		var indicatorElement = $('<div class="indicator-light"></div>');
		var currentSettings = settings;
		var isOn = false;

		function updateState() {
			indicatorElement.toggleClass("on", isOn);

			if (isOn) {
				stateElement.text((_.isUndefined(currentSettings.on_text) ? "" : currentSettings.on_text));
			}
			else {
				stateElement.text((_.isUndefined(currentSettings.off_text) ? "" : currentSettings.off_text));
			}
		}

		this.render = function (element) {
			$(element).append(titleElement).append(indicatorElement).append(stateElement);
		}

		this.onSettingsChanged = function (newSettings) {
			currentSettings = newSettings;
			titleElement.html((_.isUndefined(newSettings.title) ? "" : newSettings.title));
			updateState();
		}

		this.onCalculatedValueChanged = function (settingName, newValue) {
			if (settingName == "value") {
				isOn = Boolean(newValue);
			}

			updateState();
		}

		this.onDispose = function () {
		}

		this.getHeight = function () {
			return 1;
		}

		this.onSettingsChanged(settings);
	};

	freeboard.loadWidgetPlugin({
		type_name: "indicator",
		display_name: "インジケータライト",
		settings: [
			{
				name: "title",
				display_name: "タイトル",
				validate: "optional,maxSize[100]",
				type: "text",
				description: "最大100文字"
			},
			{
				name: "value",
				display_name: "値",
				validate: "optional,maxSize[2000]",
				type: "calculated",
				description: "最大2000文字"
			},
			{
				name: "on_text",
				display_name: "ON時テキスト",
				validate: "optional,maxSize[500]",
				type: "calculated",
				description: "最大500文字"
			},
			{
				name: "off_text",
				display_name: "OFF時テキスト",
				validate: "optional,maxSize[500]",
				type: "calculated",
				description: "最大500文字"
			}
		],
		newInstance: function (settings, newInstanceCallback) {
			newInstanceCallback(new indicatorWidget(settings));
		}
	});

	freeboard.addStyle('.gm-style-cc a', "text-shadow:none;");

	var googleMapWidget = function (settings) {
		var self = this;
		var currentSettings = settings;
		var map;
		var marker;
		var mapElement = $('<div></div>')
		var currentPosition = {};

		function updatePosition() {
			if (map && marker && currentPosition.lat && currentPosition.lon) {
				var newLatLon = new google.maps.LatLng(currentPosition.lat, currentPosition.lon);
				marker.setPosition(newLatLon);
				map.panTo(newLatLon);
			}
		}

		function setBlocks(blocks) {
			if (_.isUndefined(mapElement) || _.isUndefined(blocks))
				return;
			var height = 60 * blocks;
			mapElement.css({
				"height": height + "px",
				"width": "100%"
			});
		}

		function createWidget() {
			if (_.isUndefined(mapElement))
				return;

			function initializeMap() {
				var mapOptions = {
					zoom: 13,
					center: new google.maps.LatLng(37.235, -115.811111),
					disableDefaultUI: true,
					draggable: false
				};

				map = new google.maps.Map(mapElement[0], mapOptions);

				google.maps.event.addDomListener(mapElement[0], 'mouseenter', function (e) {
					e.cancelBubble = true;
					if (!map.hover) {
						map.hover = true;
						map.setOptions({zoomControl: true});
					}
				});

				google.maps.event.addDomListener(mapElement[0], 'mouseleave', function (e) {
					if (map.hover) {
						map.setOptions({zoomControl: false});
						map.hover = false;
					}
				});

				marker = new google.maps.Marker({map: map});

				// map fitting to container
				mapElement.resize(_.debounce(function() {
					google.maps.event.trigger(mapElement[0], 'resize');
					updatePosition();
				}, 500));

				updatePosition();
			}

			if (window.google && window.google.maps) {
				initializeMap();
			} else {
				window.gmap_initialize = initializeMap;
				head.js("https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=gmap_initialize");
			}
		}

		this.render = function (element) {
			$(element).append(mapElement);
			setBlocks(currentSettings.blocks);
			createWidget();
		}

		this.onSettingsChanged = function (newSettings) {
			if (_.isNull(map)) {
				currentSettings = newSettings;
				return;
			}
			if (newSettings.blocks != currentSettings.blocks)
				setBlocks(newSettings.blocks);
			currentSettings = newSettings;
		}

		this.onCalculatedValueChanged = function (settingName, newValue) {
			if (settingName == "lat")
				currentPosition.lat = newValue;
			else if (settingName == "lon")
				currentPosition.lon = newValue;

			updatePosition();
		}

		this.onDispose = function () {
			// for memoryleak
			map = null;
			marker = null;
		}

		this.getHeight = function () {
			return currentSettings.blocks;
		}

		this.onSettingsChanged(settings);
	};

	freeboard.loadWidgetPlugin({
		type_name: "google_map",
		display_name: "Google Map",
		fill_size: true,
		settings: [
			{
				name: "lat",
				display_name: "緯度",
				validate: "optional,maxSize[2000]",
				type: "calculated",
				description: "最大2000文字"
			},
			{
				name: "lon",
				display_name: "経度",
				validate: "optional,maxSize[2000]",
				type: "calculated",
				description: "最大2000文字"
			},
			{
				name: "blocks",
				display_name: "高さ (ブロック数)",
				validate: "required,custom[integer],min[4],max[20]",
				type: "number",
				style: "width:100px",
				default_value: 4,
				description: "1ブロック60ピクセル。20ブロックまで"
			}
		],
		newInstance: function (settings, newInstanceCallback) {
			newInstanceCallback(new googleMapWidget(settings));
		}
	});

	freeboard.addStyle('.html-widget', "white-space:normal;width:100%;height:100%");

	var htmlWidget = function (settings) {
		var self = this;
		var htmlElement = $('<div class="html-widget"></div>');
		var currentSettings = settings;

		this.render = function (element) {
			$(element).append(htmlElement);
		}

		this.onSettingsChanged = function (newSettings) {
			currentSettings = newSettings;
		}

		this.onCalculatedValueChanged = function (settingName, newValue) {
			if (settingName == "html") {
				htmlElement.html(newValue);
			}
		}

		this.onDispose = function () {
		}

		this.getHeight = function () {
			return Number(currentSettings.height);
		}

		this.onSettingsChanged(settings);
	};

	freeboard.loadWidgetPlugin({
		"type_name": "html",
		"display_name": "HTML",
		"fill_size": true,
		"settings": [
			{
				name: "html",
				display_name: "HTML",
				validate: "optional,maxSize[2000]",
				type: "calculated",
				description: "最大2000文字<br>HTML文字列かjavascriptが使用できます。"
			},
			{
				name: "height",
				display_name: "ブロック高さ",
				validate: "required,custom[integer],min[3],max[20]",
				style: "width:100px",
				type: "number",
				default_value: 4,
				description: "1ブロック60ピクセル。20ブロックまで"
			}
		],
		newInstance: function (settings, newInstanceCallback) {
			newInstanceCallback(new htmlWidget(settings));
		}
	});
}());

// # c3js Freeboard Plugin
//
// Copyright © 2015 Daisuke Tanaka.(https://github.com/tanaka0323)
// Licensed under the MIT license.
//
// -------------------

(function() {

	freeboard.loadWidgetPlugin({
		type_name: "c3js",
		display_name: "C3チャート",
		"external_scripts" : [
			"http://d3js.org/d3.v3.min.js",
			"plugins/thirdparty/c3.min.js"
		],
		settings: [
			{
				name: "title",
				display_name: "タイトル",
				validate: "optional,maxSize[100]",
				type: "text",
				description: "最大100文字"
			},
			{
				name: "blocks",
				display_name: "高さ (ブロック数)",
				validate: "required,custom[integer],min[2],max[20]",
				type: "number",
				style: "width:100px",
				default_value: 4,
				description: "1ブロック60ピクセル。20ブロックまで"
			},
			{
				name: "value",
				display_name: "値",
				validate: "optional,maxSize[5000]",
				type: "calculated",
				description: "最大5000文字"
			},
			{
				name: "options",
				display_name: "チャートオプション",
				validate: "optional,maxSize[5000]",
				type: "json",
				default_value: '{\n\
	"data": {\n\
		"type": "line"\n\
	}\n\
}',
				description: "最大5000文字<br>JSON形式文字列。 参考URL: <a href='http://c3js.org/' target='_blank'>http://c3js.org/</a>"
			}
		],

		newInstance: function (settings, newInstanceCallback) {
			newInstanceCallback(new c3jsWidget(settings));
		}
	});

	var c3jsWidget = function (settings) {
		var self = this;
		var currentID = _.uniqueId("c3js_");
		var titleElement = $('<h2 class="section-title"></h2>');
		var chartElement = $('<div id="' + currentID + '"></div>');
		var currentSettings;
		var chart;
		var chartdata;

		function setTitle(title) {
			if (_.isUndefined(title))
				return;
			titleElement.html(title);
		}

		function setBlocks(blocks) {
			if (_.isUndefined(blocks))
				return;
			var height = 60 * blocks - titleElement.outerHeight() - 7;
			chartElement.css({
				"max-height": height + "px",
				"height": height + "px",
				"width": "100%"
			});
		}

		function createWidget(data, chartsettings) {

			var options;

			// No need for the first load
			data = _.omit(data, '_op');

			Function.prototype.toJSON = Function.prototype.toString;

			if (!_.isUndefined(chartsettings.options)) {
				try {
					options = JSON.parse(chartsettings.options, function(k,v) {
						var ret;
						var str = v.toString();
						if (str.indexOf('function') === 0)
							ret = eval('('+v+')');
						else if (str.indexOf('d3.') === 0)
							ret = eval('('+v+')');
						else
							ret = v;
						return ret;
					});
				} catch (e) {
					alert("チャートオプションが不正です。 " + e);
					console.error(e);
					return;
				}
			}

			if (!_.isUndefined(chart)) {
				chartElement.resize(null);
				chart.destroy();
				chart = null;
			}

			var bind = {
				bindto: '#' + currentID,
			};
			options = _.merge(bind, _.merge(data, options));

			try {
				chart = c3.generate(options);
				// svg chart fit to container
				chartElement.resize(_.debounce(function() {
					chart.resize();
				}, 500));
			} catch (e) {
				console.error(e);
				return;
			}
		}

		function plotData(data) {
			if (_.isUndefined(chart))
				return;

			var op = data._op;
			data = _.omit(data, '_op');

			try {
				switch (op) {
					case 'load':
						chart.load(data);
						break;
					case 'unload':
						chart.unload(data);
						break;
					case 'groups':
						chart.groups(data);
						break;
					case 'flow':
						chart.flow(data);
						break;
					case 'data.names':
						chart.data.names(data);
						break;
					case 'data.colors':
						chart.data.colors(data);
						break;
					case 'axis.labels':
						chart.axis.labels(data);
						break;
					case 'axis.max':
						chart.axis.max(data);
						break;
					case 'axis.min':
						chart.axis.min(data);
						break;
					case 'axis.range':
						chart.axis.range(data);
						break;
					case 'xgrids':
						if (!_.isUndefined(data.xgrids))
							chart.xgrids(data.xgrids);
						break;
					case 'xgrids.add':
						if (!_.isUndefined(data.xgrids))
							chart.xgrids.add(data.xgrids);
						break;
					case 'xgrids.remove':
						if (!_.isUndefined(data.xgrids))
							chart.xgrids.remove(data.xgrids);
						else
							chart.xgrids.remove();
						break;
					case 'transform':
						if (!_.isUndefined(data.type)) {
							if (!_.isUndefined(data.name))
								chart.transform(data.type, data.name);
							else
								chart.transform(data.type);
						}
						break;
					default:
						chart.load(data);
						break;
				}
			} catch (e) {
				console.error(e);
			}
		}

		this.render = function (element) {
			$(element).append(titleElement).append(chartElement);
			setTitle(currentSettings.title);
			setBlocks(currentSettings.blocks);
		}

		this.onSettingsChanged = function (newSettings) {
			if (titleElement.outerHeight() == 0) {
				currentSettings = newSettings;
				return;
			}
			setTitle(newSettings.title);
			setBlocks(newSettings.blocks);
			if (newSettings.options != currentSettings.options)
				createWidget(chartdata, newSettings);
			currentSettings = newSettings;
		}

		this.onCalculatedValueChanged = function (settingName, newValue) {
			if (!_.isObject(newValue))
				return;

			if (_.isUndefined(chart))
				createWidget(newValue, currentSettings);
			else
				plotData(newValue);

			chartdata = newValue;
		}

		this.onDispose = function () {
			if (!_.isUndefined(chart)) {
				chart.destroy();
				chart = null;
			}
		}

		this.getHeight = function () {
			return currentSettings.blocks;
		}

		this.onSettingsChanged(settings);
	};
}());
