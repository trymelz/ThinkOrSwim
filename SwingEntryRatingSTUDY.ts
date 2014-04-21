# SWINGENTRYRATING
# WGRIFFITH2 (C) 2014

declare lower;

# STOCHASTICSLOW
def KPERIOD = 14;
def DPERIOD = 3;
def FASTLINE = Round(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD));
def SLOWLINE = Round(SimpleMovingAvg(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD), LENGTH = DPERIOD));

# MACD
def MACD = MACDHistogram("FAST LENGTH" = 5, "SLOW LENGTH" = 35, "MACD LENGTH" = 5);

# OSCILLATOR TEST
def GREENPRICE = MACD >= 0 and FASTLINE >= SLOWLINE;
def REDPRICE = MACD < 0 and FASTLINE < SLOWLINE;

# RSI
def NetChgAvg = WildersAverage(close - close[1], 14);
def TotChgAvg = WildersAverage(AbsValue(close - close[1]), 14);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;
def RSI = round(50 * (ChgRatio + 1), numberOfDigits = 0);

def RSISMA = round(SimpleMovingAvg(price = RSI, length = 12),0);

plot RATING =

if
!Redprice
and !GreenPrice[1]
and close >= close[1]
and RSI <= 60
and RSI >= RSISMA
and lowest(FASTLINE[1],2) < 20
then 1

else if
!GreenPrice
and !RedPrice[1]
and close <= close[1]
and RSI >= 40
and RSI <= RSISMA
and highest(FASTLINE[1],2) > 80
then -1

else 0;