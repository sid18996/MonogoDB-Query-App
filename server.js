const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const bodyParser = require("body-parser");
var _ = require('lodash');
var db

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

const csvFilePath1='tmdb_5000_credits.csv'
const csvFilePath2='tmdb_5000_movies.csv'
const csv=require('csvtojson')

MongoClient.connect('mongodb://localhost:27017/mydb',  { useNewUrlParser: true },(err, client) => {
	if (err) return console.log(err)
  	db = client.db('mydb') 
	/** Task-1 
		end-point: http://127.0.0.1:3000/addDataThroughFile
	**/ 
  	app.post('/addDataThroughFile', function (req, res) {
		csv()
		.fromFile(csvFilePath1)
		.then((jsonObj)=>{
			for(var i = 0;i<jsonObj.length;i++)
		    {
		    	jsonObj[i].cast = JSON.parse(jsonObj[i].cast)
		    	jsonObj[i].crew = JSON.parse(jsonObj[i].crew)
		    }
		    	db.collection("movieCastCrew").insertMany(jsonObj, function(err, res) {
				    if (err) throw err;
				    console.log("Number of documents inserted: " + res.insertedCount);
				  });
		})

		csv()
		.fromFile(csvFilePath2)
		.then((jsonObj)=>{
			for(var i = 0;i<jsonObj.length;i++)
		    {
		    	jsonObj[i].genres = JSON.parse(jsonObj[i].genres)
		    	jsonObj[i].keywords = JSON.parse(jsonObj[i].keywords)
		    	jsonObj[i].production_companies = JSON.parse(jsonObj[i].production_companies)
		    	jsonObj[i].production_countries = JSON.parse(jsonObj[i].production_countries)
		    	jsonObj[i].spoken_languages = JSON.parse(jsonObj[i].spoken_languages)
		    }
		    db.collection("movieInfo").insertMany(jsonObj, function(err, res) {
			    if (err) throw err;
			    console.log("Number of documents inserted: " + res.insertedCount);
			  });	
		})	    

	})
	/** Task-2 
		end-point: http://127.0.0.1:3000/addData
	**/ 
	app.post('/addData', function (req, res) {
		data = req.body
		// console.log(data)
		var newObj1 = {}
		var newObj2 = {}
		_.forEach(data,  function(value, key) {
		  if(key == 'movie_id')
		  {
		  	console.log('Hello')
		  	newObj1['movie_id'] = value
		  	newObj2['id'] = value
		  }
		  if(key == 'title')
		  {
		  	newObj1['title']  = value
		  	newObj2['title']  = value
		  }
		  if(key == 'cast')
		  {
		  	newObj1['cast'] = value
		  }
		  if(key == 'crew')
		  {
		  	newObj1['crew'] = value
		  }
		  if(key == 'budget')
		  {
		  	newObj2['budget'] = value
		  }
		  if(key == 'genres')
		  {
		  	newObj2['genres'] = value
		  }
		  if(key == 'homepage')
		  {
		  	newObj2['homepage'] = value
		  }
		  if(key == 'keywords')
		  {
		  	newObj2['keywords'] = value
		  }
		  if(key == 'original_language')
		  {
		  	newObj2['original_language'] = value
		  }
		  if(key == 'original_title')
		  {
		  	newObj2['original_title'] = value
		  }
		  if(key == 'overview')
		  {
		  	newObj2['overview'] = value
		  }
		  if(key == 'popularity')
		  {
		  	newObj2['popularity'] = value
		  }
		  if(key == 'production_companies')
		  {
		  	newObj2['production_companies'] = value
		  }
		  if(key == 'production_countries')
		  {
		  	newObj2['production_countries'] = value
		  }
		  if(key == 'release_date')
		  {
		  	newObj2['release_date'] = value
		  }
		  if(key == 'revenu')
		  {
		  	newObj2['revenu'] = value
		  }
		  if(key == 'runtime')
		  {
		  	newObj2['runtime'] = value
		  }
		  if(key == 'spoken_languages')
		  {
		  	newObj2['spoken_languages'] = value
		  }
		  if(key == 'status')
		  {
		  	newObj2['status'] = value
		  }
		  if(key == 'tagline')
		  {
		  	newObj2['tagline'] = value
		  }
		  if(key == 'title')
		  {
		  	newObj2['title'] = value
		  }
		  if(key == 'vote_average')
		  {
		  	newObj2['vote_average'] = value
		  }
		  if(key == 'vote_count')
		  {
		  	newObj2['vote_count'] = value
		  }

		});
		db.collection("newObj1").insertOne(newObj1, function(err, res) {
		    if (err) throw err;
		    console.log("Number of documents inserted: " + res.insertedCount);
		  });
		db.collection("newCol2").insertOne(newObj2, function(err, res) {
		    if (err) throw err;
		    console.log("Number of documents inserted: " + res.insertedCount);
		    console.log(newObj2)
		  });

	  res.send('File Added to database successfily')
	})

	/** Task-3 
		end-point: http://127.0.0.1:3000/getProfit
	**/ 
	app.post('/getProfit', function (req, res) {
		data = req.body
		var year = data.year
		var query = { release_date: new RegExp(year) };
		db.collection("movieInfo").find(query).toArray(function(err, result) {
		    if (err) throw err;
		    movieProfit = []
		    companyProfit = []
		    _.forEach(result, function(rest){
		    	id = rest.id
		    	companyCount = rest.production_companies.length
		    	profit = (parseInt(rest.revenue) - parseInt(rest.budget))/companyCount	
		    	movieProfit.push({movie_id : id, movieProfitPerCompany : profit})
		    	_.forEach(rest.production_companies, function(rst){
		    	name = rst.name
		    	obj = {name : rst.name, profit : 0}
		    	companyProfit.push(obj)	
		    });
		  });
		  companyProfit = Array.from(new Set(companyProfit))  
		  
		   _.forEach(movieProfit, function(rest){
		   		var movie 
		   		_.forEach(result, function(rest1){
			   		if(rest1.id == rest.movie_id)
			   		{
			   			movie = rest1
			   		}
		   		})
		   		_.forEach(movie.production_companies, function(rest2){

		   			_.forEach(companyProfit, function(rest3){
		   				if (rest2.name == rest3.name)
		   				{
		   					rest3.profit = rest3.profit + rest.movieProfitPerCompany
		   				}
		   			})
		   			
		   		})
		   	})
		   
			res.send(companyProfit)
		})
	})


	app.listen(3000, function() {
	console.log('listening on 3000')
	})
})





