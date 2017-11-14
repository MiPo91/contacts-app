import {Component, OnInit} from '@angular/core';
import {ToolbarService, ToolbarSettings} from '../../toolbar/toolbar.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-map-layout-card',
  templateUrl: './map-layout-card.component.html',
  styleUrls: ['./map-layout-card.component.css']
})
export class MapLayoutCardComponent implements OnInit {

  streetAddress: string;
  city: string;

  constructor(private toolbar: ToolbarService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.toolbar.toolbarSettings.next(new ToolbarSettings('Map', true));
    this.streetAddress = this.route.snapshot.params.streetAddress;
    this.city = this.route.snapshot.params.city;
    this.streetAddress = this.streetAddress === 'undefined' ? null : this.streetAddress;
    this.city = this.city === 'undefined' ? null : this.city;
  }

}
