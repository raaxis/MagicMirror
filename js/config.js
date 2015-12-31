var config = {
    lang: 'de',
    time: {
        timeFormat: 24
    },
    weather: {
        //change weather params here:
        //units: metric or imperial
        params: {
            q: 'Duren,Germany',
            units: 'metric',
            // if you want a different lang for the weather that what is set above, change it here
            lang: 'de',
            APPID: '0fcae02c79583033094f60d08580a2e1'
        }
    },
    compliments: {
        interval: 30000,
        fadeInterval: 4000,
        morning: [
        ],
        afternoon: [
        ],
        evening: [
        ]
    },
    calendar: {
        maximumEntries: 10,
        url: ""
    },
    news: {
        feed: 'http://www.heise.de/newsticker/heise-atom.xml'
    }
    news2: {
        feed: 'http://www.spiegel.de/schlagzeilen/index.rss'
    }
}
