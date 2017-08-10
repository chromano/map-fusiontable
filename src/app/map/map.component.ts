import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import {} from '@types/googlemaps';

import { environment } from '../../environments/environment';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    private fusion = {
        layer: null,
        table: {
            id: null,
            name: environment.tableName,
        },
        urls: {
            query: 'https://www.googleapis.com/fusiontables/v2/query',
            tables: 'https://www.googleapis.com/fusiontables/v2/tables'
        }
    };
    private map: google.maps.Map;

    constructor(private http: Http, private auth: AuthService) { }

    ngOnInit() { }

    lookupTableID(onDone) {
        this.http.get(this.fusion.urls.tables + '?access_token='
            + this.auth.authToken)
            .subscribe((result) => {
                const matches = result.json().items
                    .filter((table) => table.name === this.fusion.table.name);
                if (matches.length > 0) {
                    this.fusion.table.id = matches[0].tableId;
                    onDone();
                } else  {
                    alert('Table not found: ' + this.fusion.table.name);
                }
            });

    }

    // XXX 2017-08-09: This function is specially needed as Google's FusionTables
    // are experiencing caching issues resulting in map tiles not refreshing.
    createLayer() {
        if (this.fusion.layer) {
            this.fusion.layer.setMap(null);
        }

        this.fusion.layer = new google.maps.FusionTablesLayer({
            query: {
                select: 'Location',
                where: 'Location does not contain "' + new Date().getTime() + '"',
                from: this.fusion.table.id
            }
        });
        console.log("LAYER", this.fusion, this.map);

        this.fusion.layer.setMap(this.map);
    }

    createPOI(point: google.maps.GeocoderResult) {
        const location = point.geometry.location;
        const locationStr = location.lat() + ',' + location.lng();

        const sql = 'INSERT INTO ' + this.fusion.table.id + ' (Text, Location, Date) '
            + ' VALUES (\'' + point.formatted_address + '\', \'' +  locationStr
            + '\', \'' + new Date() + '\')';
        this.http.post(this.fusion.urls.query + '?access_token='
            + this.auth.authToken + '&sql=' + sql, {})
            .subscribe((response: Response) => {
                // On valid insertion, recreate fusion table layer so we display
                // the new record.
                this.createLayer();
            });
    }

    validateNewPOI(point, onValid) {
        const geocoder = new google.maps.Geocoder();

        // First make sure it is a valid address
        geocoder.geocode({location: point}, (results) => {
            const valid = results
                .filter((value) => value.types.indexOf('street_address') !== -1);
            // Now make sure we don't have this entry already
            if (valid.length > 0) {
                const location = valid[0].geometry.location;
                const locationStr = location.lat() + ',' + location.lng();

                this.http.get(this.fusion.urls.query + '?access_token='
                    + this.auth.authToken + '&sql=SELECT * FROM '
                    + this.fusion.table.id + ' WHERE Location=\'' + locationStr + '\'')
                    .subscribe((result) => {
                        if (!result.json().rows) {
                            onValid(valid[0]);
                        } else {
                            alert('This point was already created!');
                        }
                    });
            }
        });
    }

    // ---------- EVENT HANDLERS ----------

    onMapClick(event) {
        this.validateNewPOI(event.latLng, this.createPOI.bind(this));
    }

    onMapReady(map) {
        this.map = map;
        this.lookupTableID(this.createLayer.bind(this));
    }
}