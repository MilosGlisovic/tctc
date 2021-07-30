window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
   return [
       {
           name: 'Club Splav Hot Mess',
           url: 'https://www.beogradnocu.com/splavovi-u-beogradu/splav-hot-mess/',
           location: {
               lat: 44.83718,
               lng: 20.38938,
           }
       },
       {
           name: 'Trzni centar Usce',
           url: 'https://www.beogradnocu.com/splavovi-u-beogradu/splav-hot-mess/',
           location: {
               lat: 44.05517,
               lng: 20.48694,
           }
        
       },
       {
        name: 'Club Splav Korzo',
        url: 'https://www.beogradnocu.com/',
        location: {
            lat: 44.79603,
            lng: 20.39942,
        }
    },
    
   ];
}

function renderPlaces(places) {
   let scene = document.querySelector('a-scene');

   places.forEach((place) => {
       let latitude = place.location.lat;
       let longitude = place.location.lng;
       let name2 = place.name;
       let link2 = place.url;

       const model = document.createElement('a-image');
                   model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
                   model.setAttribute('name', name2);
                   model.setAttribute('src', 'map-marker.png');

                   // for debug purposes, just show in a bigger scale, otherwise I have to personally go on places...
                   model.setAttribute('scale', '20, 20');

       model.addEventListener('loaded', () => {
           window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
       });

       const clickListener = function(ev) {
        ev.stopPropagation();
        ev.preventDefault();

        const name = ev.target.getAttribute('name');

        const el = ev.detail.intersection && ev.detail.intersection.object.el;

        if (el && el === ev.target) {
            const label = document.createElement('span');
            const container = document.createElement('div');
            const btn = document.createElement('button');
            container.setAttribute('id', 'place-label');
            const link = document.createElement('a');
            link.setAttribute('href', link2);
            label.innerText = name;
            btn.innerText = 'Close';
            link.innerText = 'Club info and reservation';
            container.appendChild(label);
            container.appendChild(btn);
            container.appendChild(link);
            document.body.appendChild(container);

            btn.addEventListener("click", function() {
                container.parentElement.removeChild(container);
              });

           // setTimeout(() => {
             //   container.parentElement.removeChild(container);
            //}, 1500);
        }
    };

    model.addEventListener('click', clickListener);
       scene.appendChild(model);
   });
}
        
        
        
        