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
                //filters machines that are closed
                if(machine.alwaysOpen == "true"){
                    var lat = parseFloat(machine.location[0]);
                    var lon = parseFloat(machine.location[1]);
                    counter++;
                    output += 'var marker' + counter + ' = L.marker(['+ lat + ',' + lon +']).addTo(map);';
                    output += 'marker' + counter + '.bindPopup("<b> '+ machine.name +'</b>").openPopup();';
                }
                else{
                    if(machine.hours[0][today][0] < h && machine.hours[0][today][1] > h){
                        var lat = parseFloat(machine.location[0]);
                        var lon = parseFloat(machine.location[1]);
                        counter++;
                        output += 'var marker' + counter + ' = L.marker(['+ lat + ',' + lon +']).addTo(map);';
                        output += 'marker' + counter + '.bindPopup("<b> '+ machine.name +'</b>").openPopup();';
                    }
                }
                
            });
            var scriptTag = document.createElement('script');
            scriptTag.textContent = output;
            document.getElementById('markers').appendChild(scriptTag); // Append the new script to the markers script tag
        }
    })
})