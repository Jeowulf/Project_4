##TODOs:
* Change models so that we are not using so many nested references. The .populate and .deepPopulate is most likely causing performance issues.

* Change what the buy/sell stock is returning so that it updates entire portfolio and don't have to call the getPortfolio method right after. This ties in with all the nested referencs
