import React from "react";
import { useFetch } from "./hooks/useFetch";
// import { csv } from "d3-fetch";
import { Vega, VegaLite } from 'react-vega';

const viewHeight = 400;
const viewWidth = 600;


const App = () => {
    // Adding data to application 
    const [avocados, loading] = useFetch(
        "https://raw.githubusercontent.com/alycianguyenn/avocado-eda/main/avocado.csv"
      );

    console.log(avocados);

    const visOneSpec = {
        title: "How has the number of avocados sold changed throughout the years?",
        width: viewWidth,
        height: viewHeight,
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
          },
          color: {
            value: "#242a33"
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
            title: "What is the most popular size of avocado?",
            description: "A simple bar chart",
            width: viewWidth,
            height: viewHeight,
            mark: "bar",
            encoding: {
              x: {"field": "size", "type": "nominal", "axis": {"labelAngle": 0}},
              y: {
                field: "count", 
                type: "quantitative",
                title: "Number of avocados sold"
              },
              color: {
                value: "#242a33"
              }
            },
            data: { name: 'table' },
            "config": {}
    }

    const visThreeSpec = {
        title: "What type of avocado was sold most?",
        description: "A simple bar chart",
        width: viewWidth,
        height: viewHeight,
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
            title: "Number of avocados sold",
          },
          color: {
            value: "#242a33"
          }
        }
      }
    
    const visFourSpec =  {
        title: "How does the number of avocados sold change throughout a year?",
        width: viewWidth,
        height: viewHeight,
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
          },
          color: {
            value: "#242a33"
          }
        }
      }

      const visFiveSpec = {
        title: "How has price changed over time?",
        width: viewWidth,
        height: viewHeight,
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
          },
          color: {
            value: "#242a33"
          }
        }
      }

    // VIS #6 DATA TRANSFORMATION 

    // const yearGroupedData = avocados.reduce((result, currentValue) => {
    //     (result[currentValue.year] = result[currentValue.year] || []).push(
    //       currentValue
    //     );
    //     // console.log(result);
    //     return result;
    //   }, {});

    // console.log("new data   ", yearGroupedData);

    // // // // returns array with year counts for each size
    // // // // 0: small
    // // // // 1: large
    // // // // 2: xlarge
//     const getYearCountInfo = (yearChoice) => {
//       grouped_data = yearGroupedData[yearChoice];
//       sum_small_year = Math.round(grouped_data.reduce((a,v) =>  a = a + parseFloat(v[4046]) , 0 ));
//       sum_large_year = Math.round(grouped_data.reduce((a,v) =>  a = a + parseFloat(v[4225]) , 0 ));
//       sum_xLarge_year = Math.round(grouped_data.reduce((a,v) =>  a = a + parseFloat(v[4770]) , 0 ));
//       yearData = [sum_small_year, sum_large_year, sum_xLarge_year];
//       return yearData;
//     }

//     yearDataFuncTest_2015 = getYearCountInfo(2015);
//     console.log("2015 function test   ", yearDataFuncTest_2015);

//     yearDataFuncTest_2016 = getYearCountInfo(2016);
//     console.log("2016 function test   ", yearDataFuncTest_2016);

//     yearDataFuncTest_2017 = getYearCountInfo(2017);
//     console.log("2017 function test   ", yearDataFuncTest_2017);

//     yearDataFuncTest_2018 = getYearCountInfo(2018);
//     console.log("2018 function test   ", yearDataFuncTest_2018);

//     const sizeOverTimeData = {
//         table: [
//             { 
//               size: "small", 
//               count: yearDataFuncTest_2015[0],
//               year: 2015 
//             },
//             { 
//               size: "large", 
//               count: yearDataFuncTest_2015[1],
//               year: 2015 
//             },
//             { 
//               size: "x-large", 
//               count: yearDataFuncTest_2015[2],
//               year: 2015 
//             },
//             { 
//               size: "small", 
//               count: yearDataFuncTest_2016[0],
//               year: 2016 
//             },
//             { 
//               size: "large", 
//               count: yearDataFuncTest_2016[1],
//               year: 2016
//             },
//             { 
//               size: "x-large", 
//               count: yearDataFuncTest_2016[2],
//               year: 2016 
//             },
//             { 
//               size: "small", 
//               count: yearDataFuncTest_2017[0],
//               year: 2017 
//             },
//             { 
//               size: "large", 
//               count: yearDataFuncTest_2017[1],
//               year: 2017 
//             },
//             { 
//               size: "x-large", 
//               count: yearDataFuncTest_2017[2],
//               year: 2017 
//             },
//             { 
//               size: "small", 
//               count: yearDataFuncTest_2018[0],
//               year: 2018 
//             },
//             { 
//               size: "large", 
//               count: yearDataFuncTest_2018[1],
//               year: 2018 
//             },
//             { 
//               size: "x-large", 
//               count: yearDataFuncTest_2018[2],
//               year: 2018 
//             }
//         ],
//     }

//     console.log("size over time   ", sizeOverTimeData);

//     const visSixSpec = {
//       title: "How have the number of sold avocados changed between the different sizes of avocados?",
//       description: "Stacked area chart showing how the sales for the sizes of avocados have changed",
//       width: viewWidth,
//       height: viewHeight,
//       mark: "area",
//       encoding: {
//         x: {
//           field: "year"
//         },
//         y: {
//           aggregate: "sum",
//           field: "count", 
//           title: "Number of avocados sold"
//         }, 
//         color: {
//           field: "size", 
//           scale: {"scheme": "greys"}
//         }
//       },
//       data: { name: 'table' },
//       "config": {}
// }

const visSevenSpec = {
  title: "How has the number sold for the types of avocados changed throughout the years?",
  width: viewWidth,
  height: viewHeight,
  description: "Stacked area chart showing change in sales for different types of avocados",
  data: {"url": "https://raw.githubusercontent.com/alycianguyenn/avocado-eda/main/avocado.csv"},
  mark: {
    type: "bar",
    width: { band: 0.7 }
  },
    encoding: {
      x: {
        field: "Date",
        timeUnit: "year",
        axis: {tickCount: "year"}
      },
      y: {
        aggregate: "sum",
        field: "Total Volume", 
        type: "quantitative",
        title: "Number of avocados sold"
      },
      color: {
        field: "type", 
        type: "nominal",
        scale: {"scheme": "greys"}
      }
    }
  }

const visEightSpec = {
  width: viewWidth,
  height: viewHeight,
  title: "Where are there the most sales for avocados?",
  data: {"url": "https://raw.githubusercontent.com/alycianguyenn/avocado-eda/main/avocado.csv"},
  mark: "area",
  transform: [
    {
      window:[{
        op: "rank",
        as: "rank"
      }],
      sort: [{
        field: "Total Volume",
        order: "descending"
      }]
    },
    {
      filter: "datum.rank <= 10"
    }
  ],
  encoding: {
    x: {
      timeUnit: "year", 
      field: "Date",
      axis: {
        tickCount: "year"
      } 
    },
    y: {
      aggregate: "sum", 
      field: "Total Volume",
      title: "Number of avocados sold",
      sort: {
        field: "Total Volume", 
        op: "sum",
        order: "descending"
      }
    },
    color: {
      field: "region",
      scale: {
        scheme: "category20b"
      }
    }
  }
}

const visNineSpec = {
  title: "How does price affect the number of avocados sold? For the different types of avocados?",
  description: "Scatter plot of price vs avocados sold (considering type)",
  width: viewWidth,
  height: viewHeight,
  data: {"url": "https://raw.githubusercontent.com/alycianguyenn/avocado-eda/main/avocado.csv"},
  mark: "circle",
  encoding: {
    x: {
      field: "AveragePrice", 
      type: "quantitative",
      title:"Price"
      },
    y: {
      field: "Total Volume", 
      type: "quantitative",
      title: "Number of avocados sold"
      },
    color: {
      field: "type",
      scale: {
        scheme: "greys"
      }
    }
  }
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
                {/* VIS #1 */}
                <h4>How has the number of avocados sold changed throughout the years?</h4>
                <VegaLite spec={visOneSpec}  />
                <div> Variables used:
                  <ul>
                    <li>
                      <span className="font-weight-bold">Date</span>: x-axis
                    </li>
                    <li>
                    <span className="font-weight-bold">Total Volume</span>: y-axis -- sum of total volumes was used 
                    </li>
                  </ul>
                </div>
            </div>
            <div>
                {/* VIS #2 */}
                <h4>What is the most popular size of avocado?</h4>
                <VegaLite spec={visTwoSpec} data={sizeData} />
                <div> Variables used:
                  <ul>
                    <li>
                      <span className="font-weight-bold">4046, 4225 and 4770</span>: x-axis
                    </li>
                    <li>
                    <span className="font-weight-bold">Total Volume</span>: y-axis -- sum of total volumes was used 
                    </li>
                  </ul>
                </div>
            </div>
            <div>
                {/* VIS #3 */}
                <h4>What type of avocado was sold most?</h4>
                <VegaLite spec={visThreeSpec} />
                <div> Variables used:
                  <ul>
                    <li>
                      <span className="font-weight-bold">type</span>: x-axis -- conventional or organic
                    </li>
                    <li>
                    <span className="font-weight-bold">Total Volume</span>: y-axis -- sum of total volumes was used 
                    </li>
                  </ul>
                </div>
            </div>
            <div>
                <h3>Add-On Questions:</h3>
                <ul>
                    <li>How does the number of avocados sold change throughout a year?</li>
                    <li>How has price changed over time?</li>
                    <li>How has price affected the number of avocados sold? For the types of avocados?</li> 
                    <li>Where are there the most sales for avocados?</li>
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
                    <span className="font-weight-bold">Date</span>  attribute, which made me think about another time 
                    measurement: month. So, I think that analyzing the graph for month could show trends that imply there 
                    are more avocado sales throughout seasons.
                </p>
                {/* VIS #4 */}
                <VegaLite spec={visFourSpec} />
                <div> Variables used:
                  <ul>
                    <li>
                      <span className="font-weight-bold">Date</span>: x-axis -- as month
                    </li>
                    <li>
                    <span className="font-weight-bold">Total Volume</span>: y-axis -- sum of total volumes was used 
                    </li>
                  </ul>
                </div>
                <p>
                    After observing this graph, it seems that my suspicions about seasons could be correct, since a quick
                    Google search showed that January - March are the seasons when avocados "taste best", and the graph presents
                    that there are the highest avocado sales in January - March!
                </p>
            </div>
            <div>
                <h4>How has price changed over time?</h4>
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
                <div> Variables used:
                  <ul>
                    <li>
                      <span className="font-weight-bold">Date</span>: x-axis -- as year
                    </li>
                    <li>
                    <span className="font-weight-bold">AveragePrice</span>: y-axis -- in dollars 
                    </li>
                  </ul>
                </div>
                <p>
                    Although this visualization did not play to my assumption, I think it's interesting how the price actually 
                    seemed to fluctuate throughout the years. Now I think I want to check the relationship
                    between price and sales for avocados. I assume that since we've seen that sales have decreased over time,
                    there should be a negative slope. 
                </p>
                <h4>How does price affect the number of avocados sold? For the different types of avocados?</h4>
                <p>
                  In addition to checking the relationship between price and the number of avocados sold, I thought that 
                  it would be interesting to see the relationship with the types of avocados as well, especially since
                  organic avocados tend to be more expensive.
                </p>
                {/* VIS #9 */}
                <VegaLite spec={visNineSpec} />
                <div> Variables used:
                  <ul>
                    <li>
                      <span className="font-weight-bold">AveragePrice</span>: x-axis -- as dollars
                    </li>
                    <li>
                      <span className="font-weight-bold">Total Volume</span>: y-axis -- sum of total volumes was used 
                    </li>
                    <li>
                      <span className="font-weight-bold">type</span>: as color category 
                    </li>
                  </ul>
                </div>
            </div>
            <div>
                <h4>Where are there the most sales for avocados?</h4>
                <p className="py-2">
                  It's very interesting to see where things come from. Inspired by the other questions considering
                  total number of avocados sold and another attribute, this question is in attempt to analyze sales over time 
                  for different regions. Due to how there are so many regions, only the top 10 regions will be used here. The
                  top 10 regions will be calculated as the ones where the most sales for avocados come from.
                </p>
                {/* VIS #8 */}
                <VegaLite spec={visEightSpec} />
                <div> Variables used:
                  <ul>
                    <li>
                      <span className="font-weight-bold">Date</span>: x-axis -- as year
                    </li>
                    <li>
                      <span className="font-weight-bold">Total Volume</span>: y-axis -- sum of total volumes was used 
                    </li>
                    <li>
                      <span className="font-weight-bold">region</span>: as color cateogory -- only for top 10 regions
                    </li>
                  </ul>
                </div>
            </div>
            <div>
                <h4>How have the number of sold avocados changed between the different sizes of avocados?</h4>
                <p className="py-2">
                  After analyzing how small and large avocados have been the most popular and observing how with the 
                  data I have, the sales for avocados have declined from 2015 to 2018, I wanted to also see the change 
                  in sales for avocados over time. This stacked area chart is meant to reveal if small and large avocados
                  have always been relatively equal in the number of sales.
                </p>
                <span className="font-weight-bold py-5">
                  THIS ENTIRE VIS HAS BEEN COMMENTED OUT BECAUSE IT BROKE EVERYTHING DURING BUILD : ( NOT SURE WHY THOUGH 
                  BECAUSE ALL IT DID WAS THROW A WARNING DURING NPM START : (
                </span>
                {/* VIS #6 */}
                {/* <VegaLite spec={visSixSpec} data={sizeOverTimeData} /> */}
                <div> Variables used:
                  <ul>
                    <li>
                      <span className="font-weight-bold">Date</span>: x-axis -- as year
                    </li>
                    <li>
                      <span className="font-weight-bold">Total Volume</span>: y-axis -- sum of total volumes was used 
                    </li>
                    <li>
                      <span className="font-weight-bold">4046, 4225 and 4770</span>: as color category -- different sizes (small, large, x-large) 
                    </li>
                  </ul>
                </div>
            </div>
            <div>
                <h4>How has the number sold for the types of avocados changed throughout the years?</h4>
                <p className="py-2">
                  In addition to seeing how the sales for different sizes of avocados have changed, 
                  I also wanted to see how the sales for the different types of avocados have changed, to
                  see if there was a time when organic avocados had a noticeably high number of sales. 
                </p>
                {/* VIS #7 */}
                <VegaLite spec={visSevenSpec}/>
                <div> Variables used:
                  <ul>
                    <li>
                      <span className="font-weight-bold">Date</span>: x-axis -- as year
                    </li>
                    <li>
                      <span className="font-weight-bold">Total Volume</span>: y-axis -- sum of total volumes was used 
                    </li>
                    <li>
                      <span className="font-weight-bold">type</span>: as color cateogry  
                    </li>
                  </ul>
                </div>
            </div>
            <h3>Write-Up</h3>
            <span className="font-italic">Please note that all of the specifics about my analysis process explanation 
            have been outlined and explained throughout this page in the little paragraph blurbs.</span>
            <p>
            Overall, my analysis process was largely focused on the variable <span className="font-weight-bold">Total Volume</span> 
            because the dataset was intended to provide a lot of information about sales for avocados. While Total Volume was an 
            attribute that identified a number total of sales for avocados for a particular record, other variables seemed to further 
            break that number down. An example is with the column attributes <span className="font-weight-bold">4046</span>, 
            <span className="font-weight-bold">4225</span> and  <span className="font-weight-bold">4770</span>, which are all attributes 
            that further break down this Total Volume value into sales of different sizes of avocados. In summary, everything 
            kind of complimented this Total Volume value, so I made sure to use Total Volume a lot in my visualizations and exploration to guide
            my curiosity.  
            </p>
            <div>
              The following is the full list of questions I performed visualizations for: 
              <ul>
                <li>How has the number of avocados sold changed throughout the years?</li>
                <li>What is the most popular size of avocado?</li>
                <li>What type of avocado was sold most?</li>
                <li>How does the number of avocados sold change throughout a year?</li>
                <li>How has price changed over time?</li>
                <li>How has price affected the number of avocados sold? For the different types of avocados?</li>
                <li>Where are there the most sales for avocados?</li>
                <li>
                  How have the number of sold avocados changed between the different sizes of avocados? - this 
                  question has been removed due to weird errors during build : (
                </li>
                <li>How has the number sold for the types of avocados changed throughout the years?</li>
              </ul>
            </div>
            <p>Now, I will go into some major considerations and actions I took while creating my visualizations.</p>
            <p>
            For the 3 initial analysis questions, I wanted to keep the visualizations as simple as possible, to leave 
            room for additional analysis. Hence, the use of line charts and bar charts. Generally, I wanted to use the 
            line chart because it is straightforward in its approach to showing change over time, and with the bar charts, 
            I thought it is a good way to simply breakdown and compare categories. For the second visualization 
            (What is the most popular size of avocado?), there were data transformations I performed because the values 
            for the different avocado sales were all in different columns. I made this transformation in React 
            and created a new variable that held an object. The calculations consisted of summing up all of the sales 
            indicated by the variables <span className="font-weight-bold">4046</span>, <span className="font-weight-bold">4225</span> 
            and <span className="font-weight-bold">4770</span> individually, and then placing those count values into 
            different JSON-formatted objects, along with the respective size (small, large or extra-large). 
            </p>
            <p>
            For the add-on questions, I used this as an opportunity to both elaborate on visualizations made for the 
            initial analysis questions and gain new insights. For the first add-on question (How does the number of 
            avocados sold change throughout a year?), I used a line chart. I did this because line charts typically are 
            sufficient to show change over time, and because the initial analysis used one, I chose to use one here as well. 
            The only difference is this time, the x-axis <span className="font-weight-bold">Date</span> attribute was 
            adjusted to have tick marks for months. For another add-on question (How has price affected the number 
            of avocados sold? For the different types of avocados?), I used a scatter plot because I wanted to 
            look at the relationship between price and avocados sold. I added a color categorization with type because 
            I thought it would also help to identify a reason why organic avocados achieve less sales. For the question 
            “Where are there the most sales for avocados?”, I decided to only use the top 10 regions to make a stacked 
            area chart easier to read. I define top 10 by the 10 regions that had the highest number of avocados sold. 
            To achieve this, I had to perform a data transformation in Vega-lite, in which I had to sort and rank by 
            the summed up <span className="font-weight-bold">Total Volume</span>(number of avocados sold) for each 
            <span className="font-weight-bold">region</span>. I also chose to include a temporal aspect with Date to 
            show change over time. A last data transformation I will discuss is for the question “How have the number 
            of sold avocados changed between the different sizes of avocados?”. 
            <span className="font-weight-light"> Please note that this question has been removed due to weird errors 
            during build : ( </span> This required a lot of data transformation 
            because the numbers for avocados sold are in 3 different columns: <span className="font-weight-bold">4046</span>, 
            <span className="font-weight-bold">4225</span> and <span className="font-weight-bold">4770</span>. I did this 
            transformation in React, and created a JSON-formatted object that first grouped data from all 3 of these 
            columns into years (2015-2018), then summed up Total Volume to get the total number of avocados sold for a 
            given size in a given year.
            </p>
            <p>
            Overall, I learned that Hass sells many avocados. Despite how my visualizations show that there was a 
            decline in 2018, I am confident that is because there is less data for that year. With the sizes for avocados, 
            it seems that the small and large avocados will continue to be the most popular. For the types of avocados, 
            it seems that the conventional avocado will continue to be the most popular avocado type bought, but this 
            may be due to how organic avocados tend to be more expensive.
            </p>
            <h3>Feedback Incorporation</h3>
            <h4>Feedback recieved:</h4>
            <ul>
              <li>Consider making the first bar plot logarithmic on the y-axis to help differentiate the 2 bar charts 
                used in a couple of the intitial questions visualizations</li>
              <li>Consider making most visualizations in greyscale to help with clarity</li>
              <li>Have more consistent naming conventions throughout the visualizations </li>
            </ul>
            <h4>Updates made:</h4>
            <ul>
              <li>Made most of my visualizations in greyscale - I believe that this helped to simplify the look of my 
                visualizations and made it easier to look at</li>
              <li>Tried out making the y-axis logarithmic on the y-axis, but I thought that the way it was currently 
                is more straightforward for an individual to understand, so I left it the same</li>
              <li>Made all of my naming conventions the same (especially for the label in place of Total Volume)</li>
            </ul>
            <span className="text-uppercase font-weight-bold">for images of visualizations, please refer to the
            src/img folder on my github</span>
        </div>
    ); 
};

export default App;
