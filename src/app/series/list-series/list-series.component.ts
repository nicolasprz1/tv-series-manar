import { Component, OnInit } from '@angular/core';
import { Serie } from '../serie';
import { SeriesService } from '../series.service';

@Component({
  selector: 'app-list-series',
  templateUrl: './list-series.component.html',
  styleUrls: ['./list-series.component.css']
})
export class ListSeriesComponent implements OnInit {
  series: Serie[] = [];
  averageSeasons: number = 0;

  constructor(private seriesService: SeriesService) { }

  ngOnInit() {
    this.seriesService.getSeries().subscribe(data => {
      this.series = data;
      this.updateAverageSeasons();
    });
  }

  updateAverageSeasons() {
    if (this.series.length > 0) {
      const totalSeasons = this.series.reduce((acc, serie) => acc + serie.seasons, 0);
      this.averageSeasons = totalSeasons / this.series.length;
    } else {
      this.averageSeasons = 0; // In case there are no series data
    }
  }
}
