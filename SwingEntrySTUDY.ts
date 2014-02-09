# SWINGENTRY
# WGRIFFITH2 (C) 2014

input len1 = 252;
input len2 = 42;

# RSI SR
def NetChgAvg = WildersAverage(close - close[1], 14);
def TotChgAvg = WildersAverage(AbsValue(close - close[1]), 14);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;
def RSI = round(50 * (ChgRatio + 1),numberOfDigits = 0);

def rsi_low1 = 
Round(Lowest(RSI, LENGTH = len1), numberOfDigits = 0);
def rsi_high1 = 
Round(Highest(RSI, LENGTH = len1), numberOfDigits = 0);

def rsi_low2 = 
Round(Lowest(RSI, LENGTH = len2), numberOfDigits = 0);
def rsi_high2 = 
Round(Highest(RSI, LENGTH = len2), numberOfDigits = 0);

plot GAPPINGBULL =
OPEN > HIGH[1]
and (RSI[1] - rsi_low2[1] <= 1
or RSI[2] - rsi_low2[2] <= 1)
and rsi_high2 - RSI > 1;

plot CONFIRMEDBULL = 
CLOSE > OHLC4[1]
and RSI[1] <= 30
and (RSI[1] - rsi_low1[1] <= 1);

GAPPINGBULL.SetDefaultColor(CreateColor(0, 255, 0));
GAPPINGBULL.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
CONFIRMEDBULL.SetDefaultColor(CreateColor(128, 128, 128));
CONFIRMEDBULL.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);