// A lot of this code is from the original feedToJson function that was included with this project
// The new code allows for multiple feeds to be used but a bunch of variables and such have literally been copied and pasted into this code and some help from here: http://jsfiddle.net/BDK46/
// The original version can be found here: http://airshp.com/2011/jquery-plugin-feed-to-json/
var news2 = {
	feed: config.news2.feed || null,
	news2Location: '.news2',
	news2Items: [],
	seenNewsItem: [],
	_yqURL: 'http://query.yahooapis.com/v1/public/yql',
	_yqlQS: '?format=json&q=select%20*%20from%20rss%20where%20url%3D',
	_cacheBuster: Math.floor((new Date().getTime()) / 1200 / 1000),
	_failedAttempts: 0,
	fetchInterval: config.news2.fetchInterval || 60000,
	updateInterval: config.news2.interval || 5500,
	fadeInterval: 2000,
	intervalId: null,
	fetchNewsIntervalId: null
}

/**
 * Creates the query string that will be used to grab a converted RSS feed into a JSON object via Yahoo
 * @param  {string} feed The original location of the RSS feed
 * @return {string}      The new location of the RSS feed provided by Yahoo
 */
news2.buildQueryString = function (feed) {

	return this._yqURL + this._yqlQS + '\'' + encodeURIComponent(feed) + '\'';

}

/**
 * Fetches the news2 for each feed provided in the config file
 */
news2.fetchNews = function () {

	// Reset the news2 feed
	this.news2Items = [];

	this.feed.forEach(function (_curr) {

		var _yqUrlString = this.buildQueryString(_curr);
		this.fetchFeed(_yqUrlString);

	}.bind(this));

}

/**
 * Runs a GET request to Yahoo's service
 * @param  {string} yqUrl The URL being used to grab the RSS feed (in JSON format)
 */
news2.fetchFeed = function (yqUrl) {

	$.ajax({
		type: 'GET',
		datatype:'jsonp',
		url: yqUrl,
		success: function (data) {

			if (data.query.count > 0) {
				this.parseFeed(data.query.results.item);
			} else {
				console.error('No feed results for: ' + yqUrl);
			}

		}.bind(this),
		error: function () {
			// non-specific error message that should be updated
			console.error('No feed results for: ' + yqUrl);
		}
	});

}

/**
 * Parses each item in a single news2 feed
 * @param  {Object} data The news2 feed that was returned by Yahoo
 * @return {boolean}      Confirms that the feed was parsed correctly
 */
news2.parseFeed = function (data) {

	var _rssItems = [];

	for (var i = 0, count = data.length; i < count; i++) {

		_rssItems.push(data[i].title);

	}

	this.news2Items = this.news2Items.concat(_rssItems);

	return true;

}

/**
 * Loops through each available and unseen news2 feed after it has been retrieved from Yahoo and shows it on the screen
 * When all news2 titles have been exhausted, the list resets and randomly chooses from the original set of items
 * @return {boolean} Confirms that there is a list of news2 items to loop through and that one has been shown on the screen
 */
news2.showNews = function () {

	// If all items have been seen, swap seen to unseen
	if (this.news2Items.length === 0 && this.seenNewsItem.length !== 0) {

		if (this._failedAttempts === 20) {
			console.error('Failed to show a news2 story 20 times, stopping any attempts');
			return false;
		}

		this._failedAttempts++;

		setTimeout(function () {
			this.showNews();
		}.bind(this), 3000);

	} else if (this.news2Items.length === 0 && this.seenNewsItem.length !== 0) {
		this.news2Items = this.seenNewsItem.splice(0);
	}

	var _location = Math.floor(Math.random() * this.news2Items.length);

	var _item = news2.news2Items.splice(_location, 1)[0];

	this.seenNewsItem.push(_item);

	$(this.news2Location).updateWithText(_item, this.fadeInterval);

	return true;

}

news2.init = function () {

	if (this.feed === null || (this.feed instanceof Array === false && typeof this.feed !== 'string')) {
		return false;
	} else if (typeof this.feed === 'string') {
		this.feed = [this.feed];
	}

	this.fetchNews();
	this.showNews();

	this.fetchNewsIntervalId = setInterval(function () {
		this.fetchNews()
	}.bind(this), this.fetchInterval)

	this.intervalId = setInterval(function () {
		this.showNews();
	}.bind(this), this.updateInterval);

}
