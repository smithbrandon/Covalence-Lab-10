var library = (function() {
  var d = new Date();
	var dbl = function(num){
				if(num < 10){
					return String('0' + num);
				}
				return String(num);
	}
  var year = Number(d.getFullYear());
	var names = ['January','February','March','April','May','June','July','August','September','October','November','December'];	
	var dayofweek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	var ordinals = function(num){
		var dig = num.toString()[num.toString().length - 1];
		if(dig == 1 && num != 11){
			return 'st';
		}else if (dig == 2 && num != 12){
			return 'nd';	
		}else if (dig == 3 && num != 13){
			return 'rd';
		}else{
			return 'th';
		}
		
	}
	var ap = function(hours){
		if(hours >= 12){
					return 'PM';
				}
				return 'AM';
	}
	var oneDay = 24*60*60*1000;
	var oneWeek = oneDay*7;


	return {
	TimeStamp: (function(){
			 return {
		UnixTimestamp: function(){
			return String((d.getTime()/1000)).split('.')[0];
		},
		UnixMillisecond: function(){
			
			return String(new Date().getTime());
		}
	  }
	})(),
	
	Local: (function(){
	  return {
		Time: (function() {
		  return {
	  	    WithSeconds: function(){
						return d.getHours()%12 + ':' + dbl(d.getMinutes()) + ":" + dbl(d.getSeconds()) + " " + ap(d.getHours());
					},
	   	    WithOutSeconds: function() {
						return d.getHours()%12 + ':' + dbl(d.getMinutes()) + " " + ap(d.getHours());
					 }
		  }
		})(),
		MDY: (function(){
	  	  return {
		    Numeral: function(){
					return d.getMonth()+1 + "/" + dbl(d.getDate()) + "/" + d.getFullYear();
				},
			Name: function(){
					return names[d.getMonth()] + " " + dbl(d.getDate())+", " + d.getFullYear();
			}
		  }
		  })(),
		}
	})(),
	Second: (function(){
		return{
			Second: function(){
				return String(d.getSeconds());
			},
			DblDigit: function(){
				return dbl(d.getSeconds());
			}
		}
	})(),
	Minute: (function(){
		return{
			Minute: function(){
				return String(d.getMinutes());
			},
			DblDigit: function(){
				return dbl(d.getMinutes());
			}
		}
	})(),
	Hour: (function(){
		return {
			TwentyFourHour: function() {
				return String(d.getHours());
			},
			TwelveHour: function() {
				return String(d.getHours()%12);
			},
			AMPM: (function() {
				return {
					UpperCase: function(){
						return ap(d.getHours()).toUpperCase();
					},
					LowerCase: function(){
						return ap(d.getHours()).toLowerCase();
					}
				}
			})()
		}
	})(),
	Week: (function(){
		return {
			DayOfWeek: function(){
				return dayofweek[d.getDay()];
			},
			AbrDayOfWeek: function(){
				return dayofweek[d.getDay()].substring(0,3);
			},
			FirstTwoOfWeek: function(){
				return dayofweek[d.getDay()].substring(0,2);
			},
			WeekOfYear: function(){
					var start = new Date(d.getFullYear(),0);
					var diff = d.getTime() - start.getTime();
					return String(Math.ceil(diff/oneWeek));
			}
		}
	})(),
	Month: (function(){
		return {
			DateOfMonth: (function(){
				return {
					Numeral: function(){
						return String(d.getDate());
					},
					Ordinal: function(){
						return String(d.getDate() + ordinals(d.getDate()));
					},
					DateDblDigit: function(){
						return dbl(d.getDate());
					}
				}
			})(),
			MonthNumber: function(){
				return String(d.getMonth() + 1);
			},
			MonthNumberDblDigit: function(){
				return dbl(d.getMonth() + 1);
			},
			AbrOfCurrentMonth: function(){
				return names[d.getMonth()].substring(0,3);
			},
			CurrentMonth: function(){
				return names[d.getMonth()];
			}
		}
	})(),
	Year: (function(){
		return {
			DayOfYear: (function(){
				return {
					Numeral: function(){
						var thisYear = new Date(d.getFullYear(),0);
						return  String(Math.ceil((d.getTime() - thisYear.getTime())/oneDay));
					},
					Ordinal: function(){
						var thisYear = new Date(d.getFullYear(),0);
						var num = Math.ceil((d.getTime() - thisYear.getTime())/oneDay);
						return num + ordinals(num);
					}
				}
			})(),
			YearFull: function(){
				return d.getFullYear().toString();
			},
			YearAbr: function(){
				return d.getFullYear().toString().substring(2);
			}
		}
	})(),
	Defaults: function(){
		//2017-06-12T15:47:22'
		return d.getFullYear() + '-' + dbl(d.getMonth()+1) + '-' + dbl(d.getDate())+"T"+dbl(d.getHours())+":"+dbl(d.getMinutes())+":"+dbl(Math.ceil(d.getSeconds()));
	}
  }
})();