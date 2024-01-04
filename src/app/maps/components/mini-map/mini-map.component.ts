import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { LngLat, Map, MapStyle, Marker } from '@maptiler/sdk';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit{

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  @Input() lngLat?: [number, number];

  public map?: Map;
  public zoom: number = 14;

  ngAfterViewInit() {

    if (!this.mapContainer) throw 'Elemento HTL no encontrado';

    if (!this.lngLat) throw "LngLat can't be null";

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: MapStyle.STREETS,
      center: this.lngLat,
      zoom: this.zoom,
      interactive: false,
    });

    const marker = new Marker({
      color: "#FF0000",
      //element: markerHtml
    })
      .setLngLat( this.lngLat )
      .addTo( this.map )
  }

}
