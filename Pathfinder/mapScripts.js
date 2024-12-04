$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "./nodes.json",
        dataType: "json",
        success: function(responseData, status){
            var output = "";
            var counter = 0;

            //Gets todays date
            const d = new Date();
            let day = d.getDay();
            const todaysDay = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
            const today = todaysDay[day];
            let h = d.getHours();

            $.each(responseData.machines, function(i, machine){
                //filters machines that are closed and adds them to the map
                if(machine.alwaysOpen == "true"){
                    var lat = parseFloat(machine.location[0]);
                    var lon = parseFloat(machine.location[1]);
                    counter++;
                    output += 'var marker' + counter + ' = L.marker(['+ lat + ',' + lon +']).addTo(map);';
                    output += 'marker' + counter + '.bindPopup("<b> '+ machine.name +'</b>';
                    if(machine.food == "true" && machine.drink == "true"){
                        output += ': Snacks and Drinks';
                    }
                    else if(machine.food == "true"){
                        output += ': Snacks';
                    }
                    else if(machine.drink == "true"){
                        output += ': Drinks';
                    }
                    output += '").openPopup();'
                }
                else{
                    if(machine.hours[0][today][0] < h && machine.hours[0][today][1] > h){
                        var lat = parseFloat(machine.location[0]);
                        var lon = parseFloat(machine.location[1]);
                        counter++;
                        output += 'var marker' + counter + ' = L.marker(['+ lat + ',' + lon +']).addTo(map);';
                        output += 'marker' + counter + '.bindPopup("<b> '+ machine.name +'</b>';
                        if(machine.food == "true" && machine.drink == "true"){
                            output += ': Snacks and Drinks';
                        }
                        else if(machine.food == "true"){
                            output += ': Snacks';
                        }
                        else if(machine.drink == "true"){
                            output += ': Drinks';
                        }
                        output += '").openPopup();'
                    }
                }
                
            });
            var scriptTag = document.createElement('script');
            scriptTag.textContent = output;
            document.getElementById('markers').appendChild(scriptTag); // Append the new script to the markers script tag
        }
    });
    
    map.once("locationfound", function (e) {
        let userLat = e.latlng.lat;
        let userLon = e.latlng.lng;
        console.log(userLat);
        console.log(userLon);
        $.ajax({
            type: "GET",
            url: "./nodes.json",
            dataType: "json",
            success: function(responseData, status){
                
                // Find the closest marker
                var closestLat;
                var closestLon;
                let closestDistance = Infinity;
                $.each(responseData.machines, function(i, machine){
                    let distance = map.distance([userLat, userLon], [machine.location[0], machine.location[1]]);
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestLat = machine.location[0];
                        closestLon = machine.location[1];
                    }
                });
                var output = 'L.Routing.control({';
                output += 'waypoints: [';
                output += 'L.latLng('+ userLat + ',' + userLon + '),';
                output += 'L.latLng('+ closestLat+ ','+ closestLon+ '),';
                output += '],';
                output += 'routeWhileDragging: true,';
                output += '}).addTo(map);';

                var scriptTag = document.createElement('script');
                scriptTag.textContent = output;
                document.getElementById('route').appendChild(scriptTag);
            }
        })

    });
});

