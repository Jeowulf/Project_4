A web app built on the MEAN stack, incorporating Material design and D3 visualization.  MarketMental is designed to be a fun way to interact with and step into the world of the stock market.  It uses data from the Twitter and Yahoo Finance APIs to allow users to discover the potential for correlations in the way the public sentiment views limelight companies and stock values and trends for the companies themselves.  The user creates a fantasy portfolio and makes investments (with fake money) and is able to see the data of their success or failures over time courtesy of dynamic and engaging D3 visualization.




##TODOs:
* Change models so that we are not using so many nested references. The .populate and .deepPopulate is most likely causing performance issues.

* Change what the buy/sell stock is returning so that it updates entire portfolio and don't have to call the getPortfolio method right after. This ties in with all the nested referencs

* What is slower - calling another .populate or another AJAX call?
