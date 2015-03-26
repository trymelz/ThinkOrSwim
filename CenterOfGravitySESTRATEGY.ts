# CenterOfGravity
# DREWGRIFFITH15 (C) 2015

input price = close;
input COGlength = 10;
input rsi_length = 2;
input rsi_target = 25;
input kperiod = 5;
input ExtremeValue = 2.6;
input dollar_amt = 5000;

def MoneyWave = STOCHASTICSLOW("K PERIOD" = KPERIOD);

# Hurst Osc or COG
def displacement = (-COGlength / 2) + 1;

def dPrice = price[displacement];

def CMA = if !IsNaN(dPrice) then Average(dPrice, AbsValue(COGlength)) else
CMA[1] + (CMA[1] - CMA[2]);

def HurstOsc = ((100 * price / CMA) - 100);

# RSI
def NETCHGAVG = WildersAverage(price - price[1], RSI_LENGTH);
def TOTCHGAVG = WildersAverage(AbsValue(price - price[1]), RSI_LENGTH);
def CHGRATIO = if TOTCHGAVG != 0 then NETCHGAVG / TOTCHGAVG else 0;
def RSI = Round(50 * (CHGRATIO + 1), NUMBEROFDIGITS = 0);

def entry = HurstOsc > ExtremeValue and MoneyWave >= 80 and Close <= MovAvgExponential(length = 300);

def target = RSI <= rsi_target;

DEF SHARES = ROUND(dollar_amt / CLOSE);

#LONG POSITION:
AddOrder(condition = ENTRY is true, TRADESIZE = SHARES, TICKCOLOR = GetColor(0), ARROWCOLOR = GetColor(0), NAME = "SE", price = close()[0], type = OrderType.SELL_TO_OPEN);
ADDORDER(OrderType.BUY_TO_CLOSE, target IS TRUE, TRADESIZE = SHARES, TICKCOLOR = GETCOLOR(1), ARROWCOLOR = GETCOLOR(1), NAME = "SX", PRICE = Close());

##################################################
