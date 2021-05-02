import React from "react";
import { useFetch } from "./hooks/useFetch";
// import { csv } from "d3-fetch";
import { Vega, VegaLite } from 'react-vega';

const viewHeight = 500;
const viewWidth = 500;


const App = () => {
    // Adding data to application 
    const [avocados, loading] = useFetch(
        "https://raw.githubusercontent.com/alycianguyenn/avocado-eda/main/avocado.csv"
      );

    console.log(avocados);
    // csv('https://raw.githubusercontent.com/alycianguyenn/avocado-eda/main/avocado.csv')
    //     .then(data => console.log(data));

    // price data
    getDataTest = avocados.map((d) => {
        return +d.AveragePrice;
    });

    // DATA TRANSFORMATION FOR VIS # 1 ---- How has the number of avocados sold changed throughout the years?
    // yearData = avocados.map((d) => {
    //     return +d.year;
    // });

    // // volume data 
    // volumeData = avocados.map((d) => {
    //     return +d["Total Volume"];
    // });
    const visOneSpec = {
        // "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        title: "How has the number of avocados sold changed throughout the years?",
        width: 500,
        height: 500,
        description: "Avocado sales over the years",
        data: {"url": "https://raw.githubusercontent.com/alycianguyenn/avocado-eda/main/avocado.csv"},
        mark: "line",
        encoding: {
          x: {
            field: "Date", 
            timeUnit: "year",
            type: "temporal",
            axis: {tickCount: "year"}
          },
          y: {
            aggregate: "sum", 
            field: "Total Volume",
            title: "Number of avocados sold"
          }
        }
      }

    // DATA TRANSFORMATION FOR VIS # 2 ---- What is the most popular size of avocado?

    small_sum = Math.round(avocados.reduce((a,v) =>  a = a + parseFloat(v[4046]) , 0 ));
    // console.log("small sum    ", small_sum);
    large_sum = Math.round(avocados.reduce((a,v) =>  a = a + parseFloat(v[4225]) , 0 ));
    // console.log("large sum    ", large_sum);
    x_large_sum = Math.round(avocados.reduce((a,v) =>  a = a + parseFloat(v[4770]) , 0 ));
    // console.log("x_large_sum    ", x_large_sum);

    const sizeData = {
        table: [
            { size: "small", count: small_sum },
            { size: "large", count: large_sum},
            { size: "extra large", count: x_large_sum}
        ],
    }

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

    // DATA TRANSFORMATION + SPEC FOR VIS # 3 ---- What type of avocado was sold most from 2015-2017?
    // need types of avocado (type column)
    const visThreeSpec = {
        title: "What type of avocado was sold most?",
        description: "A simple bar chart with embedded data.",
        width: 500,
        height: 500,
        data: {"url": "https://raw.githubusercontent.com/alycianguyenn/avocado-eda/main/avocado.csv"},
        mark: "bar",
        encoding: {
          x: {
            field: "type", 
            type: "nominal", 
            axis: {labelAngle: 0},
            title: "Type"
          },
          y: {
            aggregate: "sum",
            field: "Total Volume", 
            type: "quantitative",
            title: "Number of Avocados Sold"
          }
        }
      }
    
    const visFourSpec =  {
        // "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        title: "How does the number of avocados sold change throughout a year?",
        width: 500,
        height: 500,
        description: "Avocado sales over a year",
        data: {"url": "https://raw.githubusercontent.com/alycianguyenn/avocado-eda/main/avocado.csv"},
        mark: "line",
        encoding: {
          x: {
            field: "Date", 
            timeUnit: "month",
            type: "temporal",
            axis: {tickCount: "month"}
          },
          y: {
            aggregate: "sum", 
            field: "Total Volume",
            title: "Number of avocados sold"
          }
        }
      }

      const visFiveSpec = {
        title: "How has price affected the number of avocados sold?",
        width: 500,
        height: 500,
        description: "Avocado prices over the years",
        data: {url: "https://raw.githubusercontent.com/alycianguyenn/avocado-eda/main/avocado.csv"},
        mark: "line",
        encoding: {
          x: {
            field: "Date", 
            timeUnit: "year",
            type: "temporal",
            axis: {tickCount: "year"}
          },
          y: {
            aggregate: "average", 
            field: "AveragePrice",
            title: "Average Price for a Single Avocado (dollars)"
          }
        }
      }

    // stacked area chart with sizes data transformation
   
    const groupBy = () => {
      return avocados.reduce((result, currentValue) => {
        (result[currentValue.year] = result[currentValue.year] || []).push(
          currentValue
        );
        // console.log(result);
        return result;
      }, {});
    };

    const groupedByYear = groupBy();
    console.log(groupedByYear);

    // // // returns array with year counts for each size
    // // // 0: small
    // // // 1: large
    // // // 2: xlarge
    const getYearCountInfo = (yearChoice) => {
      // yearData = [];
      grouped_data = groupedByYear[yearChoice];
      sum_small_year = Math.round(grouped_data.reduce((a,v) =>  a = a + parseFloat(v[4046]) , 0 ));
      sum_large_year = Math.round(grouped_data.reduce((a,v) =>  a = a + parseFloat(v[4225]) , 0 ));
      sum_xLarge_year = Math.round(grouped_data.reduce((a,v) =>  a = a + parseFloat(v[4770]) , 0 ));
      yearData = [sum_small_year, sum_large_year, sum_xLarge_year];
      return yearData;
    }

    yearDataFuncTest_2015 = getYearCountInfo(2015);
    console.log("2015 function test   ", yearDataFuncTest_2015);

    yearDataFuncTest_2016 = getYearCountInfo(2016);
    console.log("2016 function test   ", yearDataFuncTest_2016);

    yearDataFuncTest_2017 = getYearCountInfo(2017);
    console.log("2017 function test   ", yearDataFuncTest_2017);

    yearDataFuncTest_2018 = getYearCountInfo(2018);
    console.log("2018 function test   ", yearDataFuncTest_2018);

    const sizeOverTimeData = {
        table: [
            { 
              size: "small", 
              count: yearDataFuncTest_2015[0],
              year: 2015 
            },
            { 
              size: "large", 
              count: yearDataFuncTest_2015[1],
              year: 2015 
            },
            { 
              size: "x-large", 
              count: yearDataFuncTest_2015[2],
              year: 2015 
            },
            { 
              size: "small", 
              count: yearDataFuncTest_2016[0],
              year: 2016 
            },
            { 
              size: "large", 
              count: yearDataFuncTest_2016[1],
              year: 2016
            },
            { 
              size: "x-large", 
              count: yearDataFuncTest_2016[2],
              year: 2016 
            },
            { 
              size: "small", 
              count: yearDataFuncTest_2017[0],
              year: 2017 
            },
            { 
              size: "large", 
              count: yearDataFuncTest_2017[1],
              year: 2017 
            },
            { 
              size: "x-large", 
              count: yearDataFuncTest_2017[2],
              year: 2017 
            },
            { 
              size: "small", 
              count: yearDataFuncTest_2018[0],
              year: 2018 
            },
            { 
              size: "large", 
              count: yearDataFuncTest_2018[1],
              year: 2018 
            },
            { 
              size: "x-large", 
              count: yearDataFuncTest_2018[2],
              year: 2018 
            }
        ],
    }

    console.log("size over time   ", sizeOverTimeData);

    const visSixSpec = {
      title: "How have the number of sold avocados changed between the different sizes of avocados?",
      description: "Stacked area chart showing how the sales for the sizes of avocados have changed",
      width: viewWidth,
      height: viewHeight,
      mark: "area",
      encoding: {
        x: {"field": "year"},
        y: {
          "aggregate": "sum",
          "field": "count", 
          "title": "Number of avocados sold"
        }, 
        color: {
          "field": "size", 
          "scale": {"scheme": "greys"}
        }
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
                <h3>Initial Analysis Questions:</h3>
                <ul>
                    <li>How has the number of avocados sold changed throughout the years?</li>
                    <li>What is the most popular size of avocado?</li> 
                    <li>What type of avocado was sold most?</li>
                </ul>
            </div>
            <div>
            {/* vis start */}
                {/* VIS #1 */}
                <h4>How has the number of avocados sold changed throughout the years?</h4>
                <VegaLite spec={visOneSpec}  />
            </div>
            <div>
                {/* VIS #2 */}
                <h4>What is the most popular size of avocado?</h4>
                <VegaLite spec={visTwoSpec} data={sizeData} />
            </div>
            <div>
                {/* VIS #3 */}
                <h4>What type of avocado was sold most?</h4>
                <VegaLite spec={visThreeSpec} />
            </div>
            <div>
                <h3>Add-On Questions:</h3>
                <ul>
                    <li>How does the number of avocados sold change throughout a year?</li>
                    <li>How has price affected the number of avocados sold? For the types of avocados?</li> 
                    <li>What type of avocados is most popular in each region?</li>
                    <li>How have the number of sold avocados changed between the different sizes of avocados?</li>
                    <li>How has the number sold for the types of avocados changed throughout the years?</li>
                </ul>
            </div>
            <div>
                <h4>How does the number of avocados sold change throughout a year?</h4>
                <p>
                    This question stemmed from curiosity from the question from vis #1: <span className="font-italic">
                    How has the number of avocados sold changed throughout the years?</span>
                </p>
                <p>
                    Looking at the result from the initial analysis question, it seems like the sales for the Hass 
                    avocados have decreased over time from 2015-2018. I think that the drop could be due to the fact that there
                    are less data points for 2018, but for exploration I will continue my thought process.
                    The visualization for this used "year" as the temporal time measurement from the 
                    <span className="font-weight-bold">Date</span> attribute, which made me think about another time 
                    measurement: month. So, I think that analyzing the graph for month could show trends that imply there 
                    are more avocado sales throughout seasons.
                </p>
                {/* VIS #4 */}
                <VegaLite spec={visFourSpec} />
                <p>
                    After observing this graph, it seems that my suspicions about seasons could be correct, since a quick
                    Google search showed that January - March are the seasons when avocados "taste best", and the graph presents
                    that there are the highest avocado sales in January - March!
                </p>
            </div>
            <div>
                <h4>How has price affected the number of avocados sold? For the sizes of avocados?</h4>
                <p>
                    Another question following the results from the question from vis #1: <span className="font-italic">
                    How has the number of avocados sold changed throughout the years?</span>
                </p>
                <p>
                    Seeing the decline over time in sales for Hass avocados from 2015-2018, it immediately made me wonder if this 
                    could be due to an increase in price. So, first it made me think that I had to validate whether or not an average
                    price has increased over time.
                </p>
                {/* VIS #5 */}
                <VegaLite spec={visFiveSpec} />
                <p>
                    Although this visualization did not play to my assumption, I think it's interesting how the price actually 
                    seemed to fluctuate throughout the years. Now I think I want to check the relationship
                    between price and sales for avocados. I assume that since we've seen that sales have decreased over time,
                    there should be a negative slope. 
                </p>
                 {/* VIS #6 */}
                {/* scatter plot? */}
                <p className="py-5">FILL IN LATER THIS IS BROKEN</p>
                <p>
                    Although this visualization showed a negative change over time and a negative relationship, I think that the
                    prices being averaged is generalizing the price attribute too much, and price could be swayed by the how 
                    big an avocado is- namely the size of the avocado. So, this leads me to another follow up question:
                </p>
                <h5 className="py-2">How has price affected the number of avocados sold for the different sizes of avocados?</h5>
                    {/* VIS #7 */}
                    {/* scatter with color? */}
                <p className="py-5">FILL IN LATER THIS IS BROKEN</p>
            </div>
            <div>
                <h4>What type of avocados is most popular in each region?</h4>
                <p className="py-5">maybe do top 10 places for this and do stacked area?</p>
                <h4>Where are there the most sales for avocados?</h4>
                <p className="py-5">maybe do top 10 places for this and do stacked area?</p>
            </div>
            <div>
                <h4>How have the number of sold avocados changed between the different sizes of avocados?</h4>
                <p className="py-2">
                  After analyzing how small and large avocados have been the most popular and observing how with the 
                  data I have, the sales for avocados have declined from 2015 to 2018, I wanted to also see the change 
                  in sales for avocados over time. This stacked area chart is meant to reveal if small and large avocados
                  have always been relatively equal in the number of sales.
                </p>
                <VegaLite spec={visSixSpec} data={sizeOverTimeData} />
            </div>
            <div>
                <h4>How has the number sold for the types of avocados changed throughout the years?</h4>
                <p className="py-5">FILL IN LATER - MAYBE LINE CHART WITH DIFFERENT COLORS</p>
            </div>
        </div>
    ); 
};

export default App;
