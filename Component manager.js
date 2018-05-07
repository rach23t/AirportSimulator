ON_TIME = 0, BOARDING = 1, TAKE_OFF = 2, DELAYED = -1;

stateList = [["Alaska",["Anchorage","Fairbanks","Juneau","Sitka","Ketchikan"]],["California",["Los Angeles","San Diego","San Jose","Fresno" ]],["Colorado",["Denver","Colorado Springs","Aurora", "Fort Collins", "Lakewood"]],["Florida",["Jacksonville", "Miami","Tampa", "St. Petersburg","Orlando"]],["Hawaii",["Honolulu","Pearl City","Hilo","Kailua", "Waipahu"]],["Nevada",["Las Vegas", "Henderson", "North Las Vegas", "Reno", "Sunrise Manor"]],["New York",["New York","Buffalo","Rochester","Yonkers", "Syracuse"]],["North Carolina",["Charlotte","Raleigh","Greensboro","Winston-Salem","Durham"]],["Oklahoma",["Oklahoma City","Tulsa","Norman","Broken Arrow","Lawton"]],["Pennsylvania",["Philadelphia","Pittsburgh","Allentown","Erie", "Reading"]],["Tennessee",["Memphis","Nashville","Knoxville","Chattanooga","Clarksville"]],["Texas",["Houston","San Antonio","Dallas","Austin","Fort Worth"]],["Utah",["Salt Lake City","West Valley City","Provo","West Jordan","Orem"]]];

airportClock = new timeSetter(); //clock for planes

planes = [];

function destinationChooser() //since two object need this, I just made it into it's own function
{
	var sIdx = getRandomInteger(0, stateList.length -1);//random state
	var cityList = stateList[sIdx][1];
	var cIdx = getRandomInteger(0, cityList.length -1);//random city in that state.
	return [cityList[cIdx], stateList[sIdx][0]]
}

function timeSetter()
{
	this.hour = 7
	this.minute = 0;
	this.currentTime = "";
	var me = this;
	this.display = function()
	{
		if(me.minute < 10)
			me.currentTime = me.hour + ":" + "0" + me.minute
		else
			me.currentTime = me.hour + ":" + me.minute
	}
	this.timeChange = function()
	{
		me.minute++;
		if(me.minute == 60)
		{
			me.hour++;
			me.minute = 0;
		}
		if(me.hour == 24)
		{
			me.hour = 0;
		}
		me.display();
	}
	this.timeInterval = setInterval(me.timeChange, 1000);
}

function airplaneMaker(t) //t is how often the plane's status will update in seconds
{
	var me = this;
	this.timer = 0;
	this.timerAdv = t;
	this.destination = destinationChooser();
	this.statusA = 0;//because the word status is used by javaScript for something else
	this.statusChanger = function()
	{
		var delayed = 0;
		if (me.statusA == 0 || me.statusA == -1)
		{
			delayed = getRandomInteger(1, 3);//one in 3 chance of being delayed
			if(delayed == 1)// if it is delayed, make it's status DELAYED and stop
			{
				me.statusA = -1;
			}
		}
		if(me.statusA != -1 || delayed > 1 )//if not delayed, advance one step
		{
			if (me.statusA == -1)
			{
				me.statusA = 0;
				
			}
			me.statusA++;
		}
	}
	var mint = Math.round(t*2) + airportClock.minute; //couldn't come up with a better name
	if(mint >= 60)
	{
		mint = mint-60;
		var hout = airportClock.hour + 1;
	}
	else
	{
		var hout = airportClock.hour;
	}
	if(mint<10)
		this.departureTime = hout + ":0" + mint;
	else
		this.departureTime = hout + ":" + mint;
	this.seats = getRandomInteger(50, 100);
}
function peopleMaker()
{
	this.partySize = getRandomInteger(1,4);
	this.destination = destinationChooser();
}


