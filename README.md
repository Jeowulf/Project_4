# MarketMental

**Market Mental** is an app built on the MEAN Stack that provides users with the ability to engage in a fantasy stock trading game and evaluate metrics that are provided through the use of external APIs in order to make stock purchasing decisions.

You can access the website [Here]
(http://marketmental.herokuapp.com/).

##External APIs

One of the driving factors that influenced the design of the application was the use of external APIs and the potential relevnce of existing DATA when making stock purchasing decisions.  The APIs in use and their functionality are as follows:

**Twitter Sentiment Analysis**
uses the Twitter API to search for key words, positive and negative, and then from those words evaluate a score assessing the current sentiment on the social media platform in regards to the company being queried.  

That score may or may not be found to correlate with a stock's success, but nevertheless is an invitation for users to interpret as they see fit.  The score is provided numerically, and if users are seeking additional information they click a button to populate a word cloud which displays words in size order based on recurrence.  Word cloud courtesy of Dragnipur and can be found at his github [here]
(https://github.com/Dragnipur/tiny-angular-wordcloud).

**YahooFinanceAPI**
is an extremely useful API that has relevenat stock data available in multiple forms that allows developers to retrieve current stock data as well as retrieve and present historical stock data in order to perceive a stock's performance over time.  

The library we used to assist with this available [here] 
(https://github.com/pilwon/node-yahoo-finance).  

The main chart used to interpret the stock data is one of many available at [NVD3.org] (NVD3.org). 

#The Game
The user signs up for an account and is immeidately given $10,000 in a fantasy cash wallet to spend on stocks online.  From here the user can create a porfolio, browse, purchase and sell stocks, and attempt to grow overall portfolio value by making smart stock decisions that will reflect real-life stock fluctuations.  All transactions, buying and selling, are accessed a $20.00 standard fee in order to reflect real-life practices and encourage smart investing.  If you cannot afford the fee the game is over.

Users are only allowed to invest in stock offered through the game's from stock inventory.  Though it is likely this inventory will grow over time, the project's focus on the potential correlation between twitter talk (public sentiment) and stock performance deemed most relevant large companies that have an active twitter presence.  