## Task 

1) Create MongoDB using the csv files. One collection per file. **Define database schema**. Data is given in [Here](https://drive.google.com/open?id=1-ohP6l1eTJEj566rgGRy4vAed7Hnwk0Q)

2) Create end-point to add new entry

	Input format
	
	```
	{
		"movie_id" : String,
		"title" : String,
		.
		.
		.
		"budget" : Number,
		"genres" : Array,
		"homepage" : Array,
		.
		.
		.
		"vote_average" : Number,
		"vote_count" : Number
	}
	```

3) Create end-pont which populates profit earned by production house **in a given year**. Here profit is calculated as [**Revenue - Budget**].

	Output format

	```
	{
		"<name of production_company_1>" : <profit_1>,
		"<name of production_company_2>" : <profit_2>,
		.
		.
		.
		"<name of production_company_n>" : <profit_n>
	}
	Note: Assume, Revenue and Budget are ditributed equaly over all production companies for a given movie.
	```
