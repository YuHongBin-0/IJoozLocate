import { Component } from '@angular/core';
import { ViewChild, ElementRef} from '@angular/core';

declare var google:any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map : any;

  @ViewChild('map', {read: ElementRef, static :false}) mapRef: ElementRef;

  infoWindows : any = [];

  markers : any = [ 

    {
      title: "Ubi",
      latitude: "1.329698",
      longitude: "103.899443"
    },

    {
      title: "Paya Lebar",
      latitude: "1.332616",
      longitude: "103.887385"
    },

    {
      title: "Kallang",
      latitude: "1.321933",
      longitude: "103.880046"
    },

    {
      title: "Boon Keng",
      latitude: "1.319359",
      longitude: "103.861636"
    },

    {
      title: "Whampoa",
      latitude: "1.325022",
      longitude: "103.855756"
    }

  ];

  constructor() {}

  ionViewDidEnter(){
    this.showMap();
  }

  addMarkersToMap(markers){
    for (let marker of markers) {
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);

      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude
      });

      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  }

  addInfoWindowToMarker(marker){
    let infoWindowContent = '<div id="content">' + 
                              '<h2 id="firstHeading" class"firstHeading">' + marker.title + '</h2>' + 
                                '<p>Latitude: ' + marker.latitude + '</p>' + 
                                '<p>Longitude: ' + marker.longitude + '</p>' + '</div>';

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
    });
    this.infoWindows.push(infoWindow);
    
  }

  closeAllInfoWindows(){
    for(let window of this.infoWindows){
      window.close();
    }
  }

  showMap(){
    const location = new google.maps.LatLng(1.325639, 103.885514);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI : true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarkersToMap(this.markers);
  }
}
