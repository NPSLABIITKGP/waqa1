let array = [];
let markers = {};
let counter = 0;
// const ACCESS_TOKEN = ;

const ACCESS_TOKEN = document.getElementById('map1').getAttribute('data-access-token');

window.addEventListener("load", () => {
    // mapboxgl.accessToken = ;
    
    mapboxgl.accessToken = ACCESS_TOKEN;

    let map = new mapboxgl.Map({
            container: 'map1',
            // style: 'mapbox://styles/mapbox/satellite-streets-v11',
            style: 'mapbox://styles/mapbox/satellite-streets-v12',
            // center: [77.1025, 28.7041],
            center: [79.0882, 21.1458],
            zoom: 3
        });    

    map.on('style.load', () => {
        map.on('click', (e) => {                
            var coordinates = e.lngLat;
            add_form(coordinates.lat, coordinates.lng, counter);
            //popup        
            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                            '<button type="button" class="bg-success remove" style="width: 50px;" onclick="open_form('+ counter +')">Open</button>'
                        );

            const temp = new mapboxgl.Marker()
                            .setLngLat(coordinates)
                            .setPopup(popup)
                            .addTo(map);
            markers[counter] = temp;
            for (var marker in markers) {
                markers[marker].getElement().addEventListener('mouseenter', () => markers[marker].togglePopup());
            }
            counter++;
        });      
        function onMouseMove(e) {
            const canvas = map.getCanvas();
            const node = document.querySelector('#map-popup');            
            if (e) {
                canvas.style.cursor = 'pointer';
                //Reverse Geocoding
                async function fetchAddressJSON() {
                    const response = await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/'
                        + e.lngLat.lng + ', ' + e.lngLat.lat
                        + '.json?access_token=' + ACCESS_TOKEN);
                    const address = await response.json();
                    // console.log(address);
                    return address;
                }              

                fetchAddressJSON().then(address => 
                    node.textContent = address.features[1].place_name
                );
                
                node.style.left = `${e.originalEvent.clientX}px`;
                node.style.top = `${e.originalEvent.clientY}px`;
                node.style.display = 'block';
                // console.log('in');
            }
            else {
                node.textContent = '';
                node.style.display = 'none'
            }
        }
        map.on('mousemove', onMouseMove);
    });
    
});

function propagate(counter) {
    $('div.dropdown').off().on('click', function (event) {
        event.stopPropagation();
    });
}

//Add form in top
function add_form(latitude, longitude, counter) {
    array[counter] = [];
    // const ACCESS_TOKEN;

    const ACCESS_TOKEN = document.getElementById('map1').getAttribute('data-access-token');

    let parent = document.getElementById('parent');
    let dialog = document.createElement('dialog');
    html =  '<button class="btn btn-secondary dropdown-toggle" onclick="propagate('+ counter +')" id="dropdown-'+ counter +'" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" \
                aria-expanded="false">\
                Loading...\
            </button>\
            <ul class="dropdown-menu list" id="dropdownul-'+ counter +'" aria-labelledby="dropdownMenuButton1">\
                <li>\
                    <div class="row mt-3">\
                        <div class="col">\
                            <label>Latitude</label>\
                            <input type="number" class="form-control" id="lat'+ counter +'" name="latitude'+ counter +'" value='+ latitude +'>\
                        </div>\
                    </div>\
                </li>\
                <li>\
                    <div class="row mt-3">\
                        <div class="col">\
                            <label>Longitude</label>\
                            <input type="number" class="form-control" id="lng'+ counter +'" name="longitude'+ counter +'" value='+ longitude +'>\
                        </div>\
                    </div>\
                </li>\
                <li>\
                    <div class="row mt-3">\
                        <div class="col">\
                            <label>Sampling Date</label>\
                            <input type="date" name="date'+ counter +'" class="form-control">\
                        </div>\
                    </div>\
                </li>\
                <li>\
                    <div class="d-flex justify-content-between mt-3" id=parameter-'+ counter +'>\
                        <select class="form-select form-select-sm w-50" onchange="add_param('+ counter +')" id="select-'+ counter +'" aria-label=".form-select-sm example">\
                            <option selected disabled value="Select Parameter...">Select Parameter...</option>\
                            <option value="ph">pH</option>\
                            <option value="turbidity">Turbidity</option>\
                            <option value="temperature">Temperature</option>\
                            <option value="electrical_conductivity">Electrical Conductivity</option>\
                            <option value="hardness">Total Hardness</option>\
                            <option value="alkalinity">Total Alkalinity</option>\
                            <option value="total_dissolved_solids">Total Dissolved Solids</option>\
                            <option value="dissolved_oxygen">Dissolved Oxygen</option>\
                            <option value="biological_oxygen_demand">Biological Oxygen Demand</option>\
                            <option value="chemical_oxygen_demand">Chemical Oxygen Demand</option>\
                            <option  disabled value="Cations..." style="background-color:rgba(90, 3, 3, 0.621);color:white;font-weight:800;" >Cations...</option>\
                            <option value="sodiumion">Na+</option>\
                            <option value="calciumion">Ca+2</option>\
                            <option value="magnesiumion">Mg+2</option>\
                            <option value="potassiumion">K+</option>\
                            <option  disabled value="Anions..." style="background-color:rgba(90, 3, 3, 0.621);color:white;font-weight:800;" >Anions...</option>\
                            <option value="ammonium">Ammonium</option>\
                            <option value="chloride">Chloride</option>\
                            <option value="carbonate">Carbonate</option>\
                            <option value="bicarbonate">Bicarbonate</option>\
                            <option value="sulfate">Sulfate</option>\
                            <option value="nitrate">Nitrate</option>\
                            <option value="nitrite">Nitrite</option>\
                            <option value="fluoride">Fluoride</option>\
                            <option value="phosphate">Phosphate</option>\
                        </select>\
                    </div>\
                </li>\
                <li>\
                    <button type="button" class="bg-primary close mt-3" id="close-'+ counter +'" onclick="close_form('+ counter +')">\
                        Save\
                    </button>\
                </li>\
            </ul>\
            <button type="button" class="bg-danger remove" id="remove-'+ counter +'" onclick="remove_form('+ counter +')">\
                Delete\
            </button>';
    dialog.innerHTML = html;

    let buttonsInfo = [
        { id: 'drinkingAnalysis', text: 'Drinking' },
        { id: 'irrigationAnalysis', text: 'Irrigation' },
        { id: 'bothAnalysis', text: 'Both' },
    ];
    
    let buttonsContainer = document.getElementById('analysisButtons');
    
    if (!buttonsContainer) {
        buttonsContainer = document.createElement('div');
        buttonsContainer.id = 'analysisButtons';
    
        buttonsInfo.forEach(info => {
            let button = document.createElement('button');
            button.setAttribute('id', info.id);
            button.textContent = info.text;
            button.style.border = 'none';
            button.addEventListener('click', function() {
                let form = document.getElementById('parent');
                if(info.id === 'drinkingAnalysis') {
                    form.action = '/output2';
                } else if(info.id === 'irrigationAnalysis') {
                    form.action = '/output3';
                } else if(info.id === 'bothAnalysis') {
                    form.action = '/output';
                }
                form.submit();
            });
            buttonsContainer.appendChild(button);
        });
    
        if(document.querySelectorAll('dialog').length === 0){
            parent.appendChild(dialog);
        }
        parent.appendChild(buttonsContainer);
    } 
    else {
        if(document.querySelectorAll('dialog').length > 0) {
            parent.insertBefore(dialog, buttonsContainer);
        } else {
            parent.appendChild(dialog);
        }
    }
    
    const lat = document.getElementById(`lat${counter}`).value;
    const lng = document.getElementById(`lng${counter}`).value;
    const addr = document.getElementById(`dropdown-${counter}`);

    // Reverse Geocoding
    async function fetchAddressJSON() {
        try {
            const response = await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/'
                + lng + ', ' + lat
                + '.json?access_token=' + ACCESS_TOKEN);
            
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const address = await response.json();
            // console.log('Fetched Address:', address.features[1]);
            return address;
        } catch (error) {
            console.error('Geocoding failed:', error);
        }
    }

    fetchAddressJSON().then(address => {
        if (address && address.features && address.features.length > 1) {
            addr.innerHTML = address.features[1].place_name;
            // console.log('Fetched Address:', address.features[1].place_name);
        } else {
            console.log('Address not found');
        }
    }).catch(error => {
        console.error('Error fetching address:', error);
    });

    dialog.show();
}

function open_form(count) {
    console.log('open');
    document.getElementById(`close-${count}`).parentElement.parentElement.parentElement.showModal();
} 

function close_form(count) {
    document.getElementById(`close-${count}`).parentElement.parentElement.parentElement.close();
}

 //Remove form
function remove_form(count) {
    document.getElementById(`remove-${count}`)?.parentElement?.remove();
    markers[count].remove();
    delete markers[count];
    if (document.querySelectorAll('dialog').length === 0) {
        document.getElementById('analysisButtons').remove();
        counter = 0;
    }
}

function add_param(count) {
    var unit;
    var value;
    var attrib;
    var select = document.getElementById(`select-${count}`).value;
    if (select != 'Select Parameter...' && array[count].indexOf(select) == -1) {
        var parent = document.getElementById(`dropdownul-${count}`);
        var li = document.createElement("li");
        var div = document.createElement("DIV");
        div.setAttribute('class', "row mt-3");
        if (select === 'ph') {
            value = 8.6;
            div.setAttribute('id', `ph${count}`);
            attrib = "acid";
            unit = '';
        }
        else if (select == 'turbidity') {
            value = 3.68;
            div.setAttribute('id', `turbidity${count}`);
            attrib = 'turb';
            unit = ' (in NTU)';
        }
        else if (select == 'temperature') {
            value = 11.85;
            div.setAttribute('id', `temperature${count}`);
            attrib = 'temp';
            unit = ' (in &deg;C)';
        }
        else if (select == 'electrical_conductivity') {
            value = 447;
            div.setAttribute('id', `electrical_conductivity${count}`);
            attrib = 'ec';
            unit = ' (in μS/cm)';
        }
        else if (select == "hardness") {
            value = 94.19;
            div.setAttribute('id', `hardness${count}`);
            attrib = 'hard';
            unit = ' (in mg/l)';
        }
        else if (select == "alkalinity") {
            value = 28.92;
            div.setAttribute('id', `alkalinity${count}`);
            attrib = 'base';
            unit = ' (in mg/l)';
        }
        else if (select == "total_dissolved_solids") {
            value = 500;
            div.setAttribute('id', `total_dissolved_solids${count}`);
            attrib = 'base';
            unit = ' (in mg/l)';
        }
        else if (select == "dissolved_oxygen") {
            value = 9.39;
            div.setAttribute('id', `dissolved_oxygen${count}`);
            attrib = 'o2';
            unit = ' (in mg/l)';
        }
        else if (select == "biological_oxygen_demand") {
            value = 5.89;
            div.setAttribute('id', `biological_oxygen_demand${count}`);
            attrib = 'bod';
            unit = ' (in mg/l)';
        }
        else if (select == "chemical_oxygen_demand") {
            value = 7.67;
            div.setAttribute('id', `chemical_oxygen_demand${count}`);
            attrib = 'cod';
            unit = ' (in mg/l)';
        }
        else if (select == "ammonium") {
            value = 0.085;
            div.setAttribute('id', `ammonium${count}`);
            attrib = 'nh4';
            unit = ' (in mg/l)';
        }
        else if (select == "chloride") {
            value = 50;
            div.setAttribute('id', `chloride${count}`);
            attrib = 'cl';
            unit = ' (in mg/l)';
        }
        else if (select == "carbonate") {
            value = 50;
            div.setAttribute('id', `carbonate${count}`);
            attrib = 'co4';
            unit = ' (in mg/l)';
        }
        else if (select == "bicarbonate") {
            value = 8.3;
            div.setAttribute('id', `bicarbonate${count}`);
            attrib = 'hco3';
            unit = ' (in mg/l)';
        }
        else if (select == "sulfate") {
            value = 50;
            div.setAttribute('id', `sulfate${count}`);
            attrib = 'so4';
            unit = ' (in mg/l)';
        }
        else if (select == "nitrate") {
            value = 0.34;
            div.setAttribute('id', `nitrate${count}`);
            attrib = 'no3';
            unit = ' (in mg/l)';
        }
        else if (select == "nitrite") {
            value = 0.007;
            div.setAttribute('id', `nitrite${count}`);
            attrib = 'no2';
            unit = ' (in mg/l)';
        }
        else if (select == "phosphate") {
            value = 0.062;
            div.setAttribute('id', `phosphate${count}`);
            attrib = 'po4';
            unit = ' (in mg/l)';
        }
        else if (select == "fluoride") {
            value = 0.1;
            div.setAttribute('id', `fluoride${count}`);
            attrib = 'f';
            unit = ' (in mg/l)';
        }  
        else if (select == "sodiumion") {
            value = 0.1;
            div.setAttribute('id', `sodiumion${count}`);
            attrib = 'na';
            unit = ' (in meq/l)';
        }  
        else if (select == "calciumion") {
            value = 0.1;
            div.setAttribute('id', `calciumion${count}`);
            attrib = 'ca';
            unit = ' (in meq/l)';
        }   
        else if (select == "magnesiumion") {
            value = 0.1;
            div.setAttribute('id', `magnesiumion${count}`);
            attrib = 'mg';
            unit = ' (in meq/l)';
        }  
        else if (select == "potassiumion") {
            value = 0.1;
            div.setAttribute('id', `potassiumion${count}`);
            attrib = 'mg';
            unit = ' (in meq/l)';
        }  

        if (select === 'ph') {
            html =  '<div class="d-flex flex-column">\
                        <label>'+ select.charAt(0).toLowerCase() + select.charAt(1).toUpperCase() + `${unit}` +'</label>\
                        <div class="d-flex">\
                            <input type="number" class="form-control" name="'+ select.split(' ').join('_') +''+ count +'" value='+ value +'>\
                            <button type="button" class="btn btn-danger" onclick="remove_parameter('+ select + count +', '+ count +')">\
                                <i class="fas fa-times"></i>\
                            </button>\
                        </div>\
                    </div>';
        }
        else {
            var str = select.replace(/_/g, ' ');
            html =  '<div class="d-flex flex-column">\
                        <label>'+ str.charAt(0).toUpperCase() + str.slice(1) + `${unit}` +'</label>\
                        <div class="d-flex">\
                            <input type="number" class="form-control" name="'+ select.split(' ').join('_') +''+ count +'" value='+ value +'>\
                            <button type="button" class="btn btn-danger" onclick="remove_parameter('+ select + count +', '+ count +')">\
                                <i class="fas fa-times"></i>\
                            </button>\
                        </div>\
                    </div>';
        }
        console.log(count);
        div.innerHTML = html;
        li.appendChild(div);
        if (array[count].length === 0) {
            const button = document.getElementById(`close-${count}`);
            parent.insertBefore(li, button.parentElement);
        }
        else {
            const node = document.getElementById(`parameter-${count}`);
            parent.insertBefore(li, node.parentElement.nextSibling);
        }
        array[count].push(select);
    }
    console.log(array[count]);
    document.getElementById(`select-${count}`).value = 'Select Parameter...';
}

//Remove parameter
function remove_parameter(param, count) {
    array[count].pop();
    param.parentElement.parentElement.parentElement.parentElement.remove();
    console.log(array[count]);
}
