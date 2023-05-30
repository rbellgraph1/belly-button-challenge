const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

init();

function optionChanged(id) {
  createChart(id);
  loadDemographics(id);
};

function createChart(id) {
  console.log('creating chart');
  console.log(id);
  d3.json(url).then(function (data) {
    console.log(data);
    //get the index of the id
    var idx = data.names.findIndex(name => name === id);

    // get the data for the id
    let sampleValues = data.samples[idx].sample_values.slice(0, 10);
    let otuIds = data.samples[idx].otu_ids.slice(0, 10).map(otu_id => `OTU ${otu_id}`);
    let otuLabels = data.samples[idx].otu_labels.slice(0, 10);

    let trace1 = {
      x: sampleValues.reverse(),
      y: otuIds,
      name: otuIds,
      text: otuLabels,
      type: 'bar',
      orientation: "h"
    };

    let layout = {
      width: 300,
      height: 400,
      titlefont: { size: 14 },
      font: { size: 14 },
      bargap: 0.25
    };

    Plotly.newPlot('bar', [trace1], layout);

    let trace2 = {
      x: data.samples[idx].otu_ids,
      y: data.samples[idx].sample_values,
      mode: 'markers',
      marker: {
        color: data.samples[idx].otu_ids,
        size: data.samples[idx].sample_values,
          colorscale: "Portland"
        
      },
        text: data.samples[idx].otu_labels,
    };

    let layout2 = {
      title: 'OTU ID',
      showlegend: false,
      height: 600,
        width: 1200
      
    };

    Plotly.newPlot('bubble', [trace2], layout2);

    // Create the Gauge Chart
  });
};

function loadDropdown(names) {
  sel = document.getElementById("selDataset");
  names.forEach(function (name) {
    opt = document.createElement("option");
    opt.value = name;
    opt.innerHTML = name;
    sel.appendChild(opt);
  });
};

function init() {
  d3.json(url).then(function (data) {
    loadDropdown(data.names);
    loadDemographics(data.names[0]);
    createChart(data.names[0]);
  });
};

function loadDemographics(id) {
  d3.json(url).then(function (data) {
    let sample_metadata = data.metadata.filter(value => value.id === +id)[0];
    console.log(sample_metadata);
    sel = document.getElementById("sample-metadata");
    sel.innerHTML = "";
    Object.entries(sample_metadata).forEach(([key, value]) => {
      opt = document.createElement("option");
      opt.innerHTML = `${key}: ${value}`;
      sel.appendChild(opt);
    });
  });
};


