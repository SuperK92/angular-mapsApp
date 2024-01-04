import { Component, ElementRef, ViewChild } from '@angular/core';

import { LngLat, Map, MapStyle, Marker } from '@maptiler/sdk';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[]
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent {

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  public markers: MarkerAndColor[] = [];

  public map?: Map;
  public zoom: number = 14;
  public currentLngLat: LngLat = new LngLat(-15.42, 28.155)

  ngAfterViewInit() {

    if (!this.mapContainer) throw 'Elemento HTL no encontrado';

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: MapStyle.STREETS,
      center: this.currentLngLat,
      zoom: this.zoom
    });

    this.readFromLocalStorage();

     //const markerHtml = document.createElement('div');
     //markerHtml.innerHTML = 'KKKKK';

    /* const marker = new Marker({
      color: "#FF0000",
      //element: markerHtml
    })
      .setLngLat( this.currentLngLat )
      .addTo( this.map )
     */

  }

  createMarker() {
    if ( !this.map ) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker( lngLat, color );
  }

  addMarker( lngLat: LngLat, color: string ) {
    if ( !this.map ) return;

    const marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat( lngLat )
      .addTo( this.map );

    //this.markers.push(marker);

    this.markers.push({ color, marker});
    this.saveToLocalStorage();

    marker.on('dragend', () => this.saveToLocalStorage() );

    // dragend
  }

  deleteMarker( index: number ) {
    this.markers[index].marker.remove();
    this.markers.splice( index, 1 );
  }

  flyTo( marker: Marker ) {

    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    });

  }

  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map( ({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify( plainMarkers ));

  }

  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse( plainMarkersString ); //! OJO!

    console.log(plainMarkers)

    plainMarkers.forEach( ({ color, lngLat }) => {
      const [ lng, lat ] = lngLat;
      const coords = new LngLat( lng, lat );

      this.addMarker( coords, color );
    })

  }



}
