import { AfterViewInit, Component, Input, NgZone, OnDestroy, OnInit } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
// tslint:disable-next-line:import-name
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { CommonComponent } from "../../classes/common-component";

@Component({
    selector: 'graph',
    templateUrl: './graph.component.html',
    styleUrls: ['./graph.component.scss'],
})
export class GraphComponent<DataType> extends CommonComponent implements AfterViewInit, OnDestroy {
    @Input()
    public graphId: string;

    @Input()
    public data: DataType;

    @Input()
    public tableName: string;

    private chart: am4charts.XYChart;
    private readonly fieldsKeyName = {
        date: 'date',
        value: 'value',
    };

    constructor (
        private readonly zone: NgZone,
    ) {
        super();
        am4core.useTheme(am4themes_animated);
    }

    private getData (): void {
        if (!this.data) throw new Error('Data getter is not set!');

        this.createGraph(this.data);
    }

    public ngAfterViewInit (): void {
        this.getData();
    }

    private createGraph (graphData: DataType): void {
        this.zone.runOutsideAngular(() => {
            const chart = am4core.create(this.graphId, am4charts.XYChart);

            chart.paddingRight = 20;

            // @ts-ignore
            chart.data = graphData;

            const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;

            const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.tooltip.disabled = true;
            valueAxis.renderer.minWidth = 35;

            const series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.dateX = this.fieldsKeyName.date;
            series.dataFields.valueY = this.fieldsKeyName.value;

            series.tooltipText = "{valueY.value}";
            chart.cursor = new am4charts.XYCursor();

            const scrollbarX = new am4charts.XYChartScrollbar();
            scrollbarX.series.push(series);
            chart.scrollbarX = scrollbarX;

            this.chart = chart;
        });
    }

    public ngOnDestroy (): void {
        this.zone.runOutsideAngular(() => {
            if (this.chart) this.chart.dispose();
        });
    }
}
