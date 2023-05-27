# Project3_Book_Reviews - ehsan branch
**data_extract.ipynb:
In data_extract.ipynb, we have implemented a procedure to scrape the names of 534 cities from https://aqicn.org/city/all/ using BeautifulSoup. Subsequent cleaning of the data was performed with Regex to ensure uniformity and accuracy.

Once the data was clean, we initiated a request to retrieve data from the api.waqi.info/feed, iterating this process for each city.

After obtaining the data, we saved it to a JSON file. In the final step, we performed another round of cleaning on the JSON file, ensuring that only entries with status: 'ok' remained in our dataset.

This process guarantees that the collected data is of high quality and ready for subsequent analysis or usage.
