      
var {DeckGL, GeoJsonLayer, H3HexagonLayer, _GlobeView, SimpleMeshLayer, H3ClusterLayer} = deck;
var DATA = './data/insol_points_res2_3_1.csv'; 
var c10 = 30; 
var c20 = 20;
var c30 = 15; 
var c40 = 10;
var c50 = 5;
var OPTIONS = ['resolution'];
var COUNTRIES = './data/ne_50m_admin_0_countries.geojson'
const EARTH_RADIUS_METERS = 6.3e6;
const COLOR_RANGE = [
  [106, 4, 15],
  [157, 2, 8],
  [208, 0, 0],
  [220, 47, 2],
  [232, 93, 4],
  [244, 140, 6],
];

function getcolor (d, c1, c2, c3, c4, c5, n) { 
    if (n == 1){
      var k = d.jan
    }
    if (n == 2){
      var k = d.feb
    }
    if (n == 3){
      var k = d.mar
    }
    if (n == 4){
      var k = d.apr
    }
    if (n == 5){
      var k = d.may
    }
    if (n == 6){
      var k = d.jun
    }
    if (n == 7){
      var k = d.jul
    }
    if (n == 8){
      var k = d.aug
    }
    if (n == 9){
      var k = d.sep
    }
    if (n == 10){
      var k = d.oct
    }
    if (n == 11){
      var k = d.nov
    }
    if (n == 12){
      var k = d.dec
    }

    if (k > c1) {
      return COLOR_RANGE[0];
    }
    else if (k > c2) {
      return COLOR_RANGE[1];
    } 
    else if (k > c3) {
      return COLOR_RANGE[2];
    }
    else if (k > c4) {
      return COLOR_RANGE[3];
    } 
    else if (k > c5) {
      return COLOR_RANGE[4];
    } else {
      return COLOR_RANGE[5];
  };
};

function getval (d, n) {
  if (n == 1){
    var ctr = document.getElementById("counter")
    ctr.innerHTML = Math.round(Number(d.jan, 2));
    return Number(d.jan)
  }
  if (n == 2){
    var ctr = document.getElementById("counter")
    ctr.innerHTML = Math.round(Number(d.feb));
    return Number(d.feb)
  }
  if (n == 3){
    var ctr = document.getElementById("counter")
    ctr.innerHTML = Math.round(Number(d.mar));
    return Number(d.mar)
  }
  if (n == 4){
    var ctr = document.getElementById("counter")
    ctr.innerHTML = Math.round(Number(d.apr));
    return Number(d.apr)
  }
  if (n == 5){
    var ctr = document.getElementById("counter")
    ctr.innerHTML = Math.round(Number(d.may));
    return Number(d.may)
  }
  if (n == 6){
    var ctr = document.getElementById("counter")
    ctr.innerHTML = Math.round(Number(d.jun));
    return Number(d.jun)
  }
  if (n == 7){
    var ctr = document.getElementById("counter")
    ctr.innerHTML = Math.round(Number(d.jul));
    return Number(d.jul)
  }
  if (n == 8){
    var ctr = document.getElementById("counter")
    ctr.innerHTML = Math.round(Number(d.aug));
    return Number(d.aug)
  }
  if (n == 9){
    var ctr = document.getElementById("counter")
    ctr.innerHTML = Math.round(Number(d.sep));
    return Number(d.sep)
  }
  if (n == 10){
    var ctr = document.getElementById("counter")
    ctr.innerHTML = Math.round(Number(d.oct));
    return Number(d.oct)
  }
  if (n == 11){
    var ctr = document.getElementById("counter")
    ctr.innerHTML = Math.round(Number(d.nov));
    return Number(d.nov)
  }
  if (n == 12){
    var ctr = document.getElementById("counter")
    ctr.innerHTML = Math.round(Number(d.dec));
    return Number(d.dec)
  }
};

function render (DATA, c1, c2, c3, c4, c5, n) {
  return new deck.H3HexagonLayer({
      id: 'H3HexagonLayer',
      data: d3.csv(DATA),
      elevationScale: 20,
      extruded: true,
      filled: true,
      getFillColor: d => getcolor (d, c1, c2, c3, c4, c5, n),
      getHexagon: d => d.hex,
      getLineColor: [0, 0, 0],
      getLineWidth: 1,
      stroked: true,
      wireframe: false,
      opacity: 1,
      pickable: true,
      onClick: d => console.log(getval(d.object, n)),
      autoHighlight: true,
      highlightColor: [255, 218, 112],
    }); 
  
};

let globe = new deck.SimpleMeshLayer({
    id: 'earth-sphere',
    data: [0],
    mesh: new luma.SphereGeometry({radius: EARTH_RADIUS_METERS, nlat: 18, nlong: 36}),
    coordinateSystem: deck.COORDINATE_SYSTEM.CARTESIAN,
    getPosition: [0, 0, 0],
    getColor: [0, 49, 82] 
  });

let countries = new deck.GeoJsonLayer({
    id: 'earth-land-layer',
    data: COUNTRIES,
    stroked: false,
    filled: true,
    opacity: 0.3,
    getFillColor: [71, 72, 74]
  });

let mydeckgl = new DeckGL({
  views: new _GlobeView(),
  initialViewState: {
    longitude: 55,
    latitude: 37,
    zoom: 0,
  },
  mapStyle: {
    version: 8,
    sources: {},
    layers: [
      {
        id: 'background',
        type: 'background',
        paint: { 'background-color': '#111' }
      }
    ]
  },
  controller: true, 
  layers: [globe, countries, render(DATA, c10, c20, c30, c40, c50, 1)],
});


    const range = document.getElementById("range");

    range.addEventListener("change", () => {
      var month = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
      const val = parseInt(range.value);
      var value = Number(val);

      var c1 = c10;
      var c2 = c20;
      var c3 = c30;
      var c4 = c40;
      var c5 = c50;

      var n = Number(value);
      mydeckgl.setProps({ 
          layers: [globe, countries, render(DATA, c1, c2, c3, c4, c5, n)],
        });
      document.getElementById("monthtext").innerText = month[val - 1];
    });


    const changeEvent = new Event("change");
    const timer = (ms) => new Promise((res) => setTimeout(res, ms));
    let pause
    const play = async () => {
      pause = false
      document.getElementById("play").style.display = "none"
      document.getElementById("pause").style.display = "block"
      range.disabled = true
      for (let i = range.value; i < 13; i++) {
        if (pause) {
          break
        }
        range.value = i;
        range.dispatchEvent(changeEvent);
        await timer(800); 
      }
      range.disabled = false
      document.getElementById("play").style.display = "block"
      document.getElementById("pause").style.display = "none"
    };
    document.getElementById("play").addEventListener("click", play);
    document.getElementById("pause").addEventListener("click", () => pause = true);

document.getElementById('size').innerHTML = 183;  
document.getElementById("monthtext").innerText = "январь";
document.getElementById('c1').innerHTML = ' > 25 kWh per cell';  
document.getElementById('c2').innerHTML = ' > 20 kWh per cell';  
document.getElementById('c3').innerHTML = ' > 15 kWh per cell';  
document.getElementById('c4').innerHTML = ' > 10 kWh per cell';  
document.getElementById('c5').innerHTML = ' > 5 kWh per cell';  
document.getElementById('c6').innerHTML = ' < 5 kWh per cell';  
