import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    /**
     * todo: refactor this, replace with real data or remove
     */
    constructor () { }

    startAnimationForLineChart (chart: Chartist.Line) {
        const delays: number = 80;
        const durations: number = 500;
        let seq: number = 0;

        chart.on('draw', (data) => {
            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path.clone()
                            .scale(1, 0)
                            .translate(0, data.chartRect.height())
                            .stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint,
                    },
                });
            }
            if (data.type === 'point') {
                seq += 1;
                data.element.animate({
                    opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'ease',
                    },
                });
            }
        });

        seq = 0;
    }

    startAnimationForBarChart (chart: Chartist.Line) {
        const delays: number = 80;
        const durations: number = 500;
        let seq: number = 0;

        chart.on('draw', (data) => {
            if (data.type === 'bar') {
                seq += 1;
                data.element.animate({
                    opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'ease',
                    },
                });
            }
        });

        seq = 0;
    }

    ngOnInit () {
        // Daily Sales Chart initialization For Documentation

        const dataDailySalesChart: any = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [[12, 17, 7, 17, 23, 18, 38]],
        };

        const optionsDailySalesChart: any = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0,
            }),
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
        };

        const dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
        this.startAnimationForLineChart(dailySalesChart);

        // Completed Tasks Chart initialization

        const dataCompletedTasksChart: any = {
            labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
            series: [[230, 750, 450, 300, 280, 240, 200, 190]],
        };

        const optionsCompletedTasksChart: any = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0,
            }),
            low: 0,
            high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
        };

        const completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);
        this.startAnimationForLineChart(completedTasksChart);

        // Emails Subscription Chart initialization

        const datawebsiteViewsChart = {
            labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
            series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]],
        };
        const optionswebsiteViewsChart = {
            axisX: {
                showGrid: false,
            },
            low: 0,
            high: 1000,
            chartPadding: { top: 0, right: 5, bottom: 0, left: 0 },
        };
        const responsiveOptions: any[] = [
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: (value) => value[0],
                },
            }],
        ];

        const websiteViewsChart = new Chartist.Bar(
            '#websiteViewsChart',
            datawebsiteViewsChart,
            optionswebsiteViewsChart,
            responsiveOptions,
        );
        this.startAnimationForBarChart(websiteViewsChart);
    }
}
