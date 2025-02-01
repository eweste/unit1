//By Ethan Westerkamp
//Script creates a table ported to html which shows population, sizes of cities and has a flashing color effect along with a click event

//creates the initilization function called at the end
function initialize(){
    cities(); 
	debugAjax();
};

//creates the main table structure and populates it
function cities(){
    //define an array of objects for cities and population
    var cityPop = [
        { 
            city: 'Madison',
            population: 233209
        },
        {
            city: 'Milwaukee',
            population: 594833
        },
        {
            city: 'Green Bay',
            population: 104057
        },
        {
            city: 'Superior',
            population: 27244
        }
    ];

    //creates the table structure
    var table = document.createElement("table");

    //create the header row
    var headerRow = document.createElement("tr");
    //inputs the City and Population column names sequentially
    headerRow.insertAdjacentHTML("beforeend","<th>City</th><th>Population</th>")

    //adds a row to the header
    table.appendChild(headerRow);

    //populates the tables of the next rows
    for (var i = 0; i < cityPop.length; i++){
        console.log("Hello World"); //debug log

        //creates a row, tr, then adds each element sequentially as 'td'
        var tr = document.createElement("tr");
        var city = document.createElement("td");
        city.innerHTML = cityPop[i].city;
        tr.appendChild(city);
        var pop = document.createElement("td");  
        pop.innerHTML = cityPop[i].population;    
        tr.appendChild(pop);
        //adds the row to the table
        table.appendChild(tr);
        };
        //places the table into the mydiv div in html
    document.querySelector("#mydiv").appendChild(table);
    addColumns(cityPop);//calls the addColumns func and puts the cityPop from this func into it
    addEvents();//activates the addEvents func
};

//adds a column for city size
function addColumns(cityPop){//cityPop is not the same as the cities() cityPop var
    
    //selects all rows in the table and inserts city size based on conditions
    document.querySelectorAll("tr").forEach(function(row, i){
		console.log("Hello World")//debug log
    
        if (i == 0){ // if the row is the header, [0]

    		row.insertAdjacentHTML('beforeend', '<th>City Size</th>');

    	} else {
			console.log(cityPop[i-1])//debug log
    		var citySize;//empty element
            //changes var based on conditions
    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';

    		} else if (cityPop[i-1].population < 500000){
    			citySize = 'Medium';

    		} else {
    			citySize = 'Large';
    		};
            //inserts into the row
			row.insertAdjacentHTML('beforeend', citySize);
			
		};
			
    	})
};

//event func
function addEvents(){
    //selects the table and associates mouseover event
	document.querySelector("table").addEventListener("mouseover", function(){
		//incomplete string var to be modified, creates a value output as rgb value as rgb(255,255,255)
		var color = "rgb(";

		for (var i=0; i<3; i++){
			console.log('aaa')//debug log
            //random value to get the 3 rgb values
			var random = Math.round(Math.random() * 255);

			color += random;
            //separates each value
			if (i<2){
				color += ",";
			//once 3 values have been added
			} else {
				color += ")";
		};
        //makes the table style color equal to the random color generated
		document.querySelector("table").style.color = color;
		console.log('ava')//debug log
	}});
    //click function
	function clickme(){

		alert('Hey, you clicked me!');
	};
    //associated the event with the table if it is clicked
	document.querySelector("table").addEventListener("click", clickme)
};

//starts the script when the page loads

//function to be called in debugAjac() accepts a response which is then placed with a line break
function debugCallback(response){
	document.querySelector("#mydiv").insertAdjacentHTML('beforeend', '<br>GeoJSON data: <br>' + JSON.stringify(response))//makes the json contents into a string
};

//main data fetch func
function debugAjax(){
	
	var myData;//empty var
	
	fetch("data/MegaCities.geojson")//takes data from MegaCities json
		.then(function(response){//after data has been loaded, callback with the response to return as a json
			return response.json();
		})
		.then(function(response){//takes the json converted respons
			myData = response;//adds this data as the myData var
			console.log(myData);//debug log
			debugCallback(myData)//calls the function to add the data to the html
		})

	
};


//starts the script when the page loads
window.onload = initialize();
