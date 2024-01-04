import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

//import { Map, MapStyle, config } from '@maptiler/sdk';

//import '@maptiler/sdk/dist/maptiler-sdk.css';

import { Map, MapStyle } from '@maptiler/sdk';


@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit {

  //map: Map | undefined;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  ngAfterViewInit() {

    if (!this.mapContainer) throw 'Elemento HTL no encontrado';

    const initialState = { lng: -15.42, lat: 28.155, zoom: 14 };

    //this.map = new Map({
    const map = new Map({
      container: this.mapContainer.nativeElement,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });
  }

}
