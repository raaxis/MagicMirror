<html>
<head>
	<title>Magic Mirror</title>
	<style type="text/css">
		<?php include('css/main.css') ?>
	</style>
	<link rel="stylesheet" type="text/css" href="css/weather-icons.css">
	<script type="text/javascript">
		var gitHash = '<?php echo trim(`git rev-parse HEAD`) ?>';
	</script>
	<meta name="google" value="notranslate" />
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
</head>
<body>

	<div class="top left">
		<div class="date small"></div>
		<div class="time"></div>
		<div class="calendar xxsmall"></div>
	</div>
	
	<div class="top right">
		<div class="windsun small"></div>
		<div class="temp"></div>
		<div class="forecast small"></div>
	</div>
	
	<div class="top center-fromtop-hor">
		<div class="news medium"></div>
	</div>
	
	<div class="top center-hor">
		<div class="news2 small"></div>
	</div>

<canvas id='world' style="display: block;background-color: #000000;"></canvas>

<script src="js/jquery.js"></script>
<script src="js/jquery.feedToJSON.js"></script>
<script src="js/ical_parser.js"></script>
<script src="js/moment-with-locales.min.js"></script>
<script src="js/config.js"></script>
<script src="js/rrule.js"></script>
<script src="js/version/version.js" type="text/javascript"></script>
<script src="js/calendar/calendar.js" type="text/javascript"></script>
<script src="js/compliments/compliments.js" type="text/javascript"></script>
<script src="js/weather/weather.js" type="text/javascript"></script>
<script src="js/time/time.js" type="text/javascript"></script>
<script src="js/news/news.js" type="text/javascript"></script>
<script src="js/news/news2.js" type="text/javascript"></script>
<script src="js/main.js?nocache=<?php echo md5(microtime()) ?>"></script>
<script src="js/saver.js"></script>
<!-- <script src="js/socket.io.min.js"></script> -->

</body>
</html>
