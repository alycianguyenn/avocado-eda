import React from "react";
import { useFetch } from "./hooks/useFetch";
// import { csv } from "d3-fetch";
import { VegaLite } from 'react-vega';

const viewHeight = 500;
const viewWidth = 500;


const App = () => {
    // Adding data to application 
    const [data, loading] = useFetch(
        "https://raw.githubusercontent.com/alycianguyenn/avocado-eda/main/avocado.csv"
      );

    console.log(data);
    // csv('https://raw.githubusercontent.com/alycianguyenn/avocado-eda/main/avocado.csv')
    //     .then(data => console.log(data));

    // price data
    getDataTest = data.map((d) => {
        return +d.AveragePrice;
    });

    // year data 
    yearData = data.map((d) => {
        return +d.year;
    });

    // volume data 
    volumeData = data.map((d) => {
        return +d["Total Volume"];
    });

    // DATA TRANSFORMATION FOR VIS # 1 ---- How has the number of avocados sold changed throughout the years?
    

    // DATA TRANSFORMATION FOR VIS # 2 ---- What is the most popular size of avocado?

    small_sum = Math.round(data.reduce((a,v) =>  a = a + parseFloat(v[4046]) , 0 ));
    // console.log("small sum    ", small_sum);
    large_sum = Math.round(data.reduce((a,v) =>  a = a + parseFloat(v[4225]) , 0 ));
    // console.log("large sum    ", large_sum);
    x_large_sum = Math.round(data.reduce((a,v) =>  a = a + parseFloat(v[4770]) , 0 ));
    // console.log("x_large_sum    ", x_large_sum);

    const sizeData = {
        table: [
            { size: "small", count: small_sum },
            { size: "large", count: large_sum},
            { size: "extra large", count: x_large_sum}
        ],
    }

    // console.log("size data  " ,sizeData);
    // console.log("year    ", yearData);
    // console.log("volume?    ", volumeData);

    const visTwoSpec = {
            // $schema: "https://vega.github.io/schema/vega-lite/v5.json",
            title: "What is the most popular size of avocado?",
            description: "A simple bar chart with embedded data.",
            width: viewWidth,
            height: viewHeight,
            mark: "bar",
            encoding: {
              x: {"field": "size", "type": "nominal", "axis": {"labelAngle": 0}},
              y: {"field": "count", "type": "quantitative"}
            },
            data: { name: 'table' },
            "config": {}
    }

    return (
        <div className="w-75 px-sm-5 py-5">
            <h1>Assignment 2: Avocado Data Exploratory Analysis</h1>
            <h2>Alycia Nguyen - INFO 474 - Spring 2021</h2>
            <span>
                Reference: 
                <a href="https://www.kaggle.com/neuromusic/avocado-prices"> Avocado Dataset</a>
            </span>
            <h3>Avocado Dataset Overview:</h3>
            <p> 
                This dataset provides records for Hass avocado sales from 2015 - 1018. Being an avocado lover, 
                I was undoubtedly interested in this dataset. I thought it would be interesting to analyze aspects 
                such as how prices can affect the sales for avocados, the distribution of avocado sales throughout 
                different regions, how sales could change over time, etc. Overall, the dataset provides many 
                measurements and categories that make it a fantastic source for exploration! The most significant 
                attributes that caught my eye during my first impression of the dataset are:
            </p>
            <ul>
                <li>
                    <span className="font-weight-bold">4046</span>, <span className="font-weight-bold">4225</span> and 
                    <span className="font-weight-bold"> 4770</span>: These 3 variables in the dataset each represent a 
                    quantitative value for the number of avocados sold with the respective Product Lookup Code (PLU). 
                    4046 is associated with small avocados, 4225 with large avocados, and 4770 with extra large avocados.
                </li>
                <li>
                    <span className="font-weight-bold">Type:</span> Nominal / categorical variable refering to whether the 
                    avocados sold were organic or conventional.
                </li>
                <li>
                    <span className="font-weight-bold">Region</span>: This identifies a location for where avocados were sold.
                </li>
            </ul>
            <div>
                <h3>Analysis Questions:</h3>
                <ul>
                    <li>How has the number of avocados sold changed throughout the years?</li>
                    <li>What is the most popular size of avocado?</li>
                    <li>What type of avocado was sold most from 2015-2018?</li>
                </ul>
            </div>
            <div>
            {/* vis start */}
                {/* VIS #1 */}
                <h4>How has the number of avocados sold changed throughout the years?</h4>
            </div>
            <div>
                {/* VIS #2 */}
                <h4>What is the most popular size of avocado?</h4>
                <VegaLite spec={visTwoSpec} data={sizeData} />
            </div>
            <div>
                {/* VIS #3 */}
                <h4>What type of avocado was sold most from 2015-2018?</h4>
            </div>
        </div>
    ); 
};

export default App;
