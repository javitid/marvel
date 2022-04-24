import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Shape from 'd3-shape';

import { Headers } from '../../enums/headers.enum';
import { GraphsService } from '../../services/graphs.service';
import { Graph } from '../../interfaces/graph.interface';

import { Superhero } from '../../interfaces/superhero.interface';

const MAX_ITEMS_TO_SHOW_BAR_CHART = 25;

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {
  public chartsMap = new Map<Headers, Graph[]>();

  @Input() superheroes: Superhero[];

  constructor( public readonly graphsService: GraphsService ) { }

  ngOnInit(): void {
    // Get Map with name, value of all the elements of each header
    this.chartsMap = this.graphsService.getChartsData(this.superheroes);
    this.drawChart(this.chartsMap, Headers.nameLabel);
    this.drawChart(this.chartsMap, Headers.genderLabel);
    this.drawChart(this.chartsMap, Headers.citizenshipLabel);
    this.drawChart(this.chartsMap, Headers.skillsLabel);
    this.drawChart(this.chartsMap, Headers.occupationLabel);
    this.drawChart(this.chartsMap, Headers.memberOfLabel);
    this.drawChart(this.chartsMap, Headers.creatorLabel);
  }

  private drawChart(chartsMap: Map<Headers, Graph[]>, header: Headers): void {
    const data: Graph[] = chartsMap.get(header) || [];
    if (data.length > MAX_ITEMS_TO_SHOW_BAR_CHART) {
      this.drawPieChart(data);
    } else {
      this.drawBarChart(data);
    }
  }

  private drawBarChart(data: Graph[]): void {
    const defaultYValue = 50;
    const width = 700;
    const height = 500;
    const margin = { top: 20, right: 20, bottom: 30, left: 80 };

    // Init SVG
    const svg = d3.select('#chart')
      .append('svg')
      .attr('width', '200px')
      .attr('height', '150px')
      .attr('viewBox', '0 0 800 500');
    const g = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Init Axis
    const x = d3Scale.scaleBand().rangeRound([0, width]).padding(0.1);
    const y = d3Scale.scaleLinear().rangeRound([height, 0]);
    x.domain(data.map((d) => d.name));
    y.domain([0, (d3Array.max(data, (d) => d.value) || defaultYValue)]);

    // Draw axis
    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      .style('font-size', '12px')
      .call(d3Axis.axisBottom(x));
    g.append('g')
      .attr('class', 'axis axis--y')
      .style('font-size', '30px')
      .call(d3Axis.axisLeft(y))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end');

    // Draw bars
    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', ((d) => x(d.name) || ''))
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('fill', '#498bfc')
      .attr('height', (d) => height - y(d.value));
  }

  private drawPieChart(data: Graph[]): void {
    const width = 200;
    const height = 150;
    const radius = Math.min(width, height) / 2;

    // Init SVG
    const color = d3Scale.scaleOrdinal()
      .range(['#FFA500', '#00FF00', '#FF0000', '#6b486b', '#FF00FF', '#d0743c', '#00FA9A']);

    const arc = d3Shape.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const labelArc = d3Shape.arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

    const labelPer = d3Shape.arc()
      .outerRadius(radius - 80)
      .innerRadius(radius - 80);

    const pie = d3Shape.pie()
      .sort(null)
      .value((d: any) => d.value);

    const svg = d3.select('#chart')
      .append('svg')
      .attr('width', '200px')
      .attr('height', '150px')
      .attr('viewBox', '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height))
      .append('g')
      .attr('transform', 'translate(' + Math.min(width, height) / 2 + ',' + Math.min(width, height) / 2 + ')');

    // Draw pie
    const g = svg.selectAll('.arc')
      .data(pie(<any>data))
      .enter().append('g')
      .attr('class', 'arc');

    g.append('path')
      .attr('d', <any>arc)
      .style('fill', (d: any) => <any>color(d.data.name));
    
    g.append('text')
      .attr('transform', (d: any) => 'translate(' + labelArc.centroid(d) + ')')
      .attr('dy', '.35em')
      .text((d: any) => d.data.name);

    g.append('text')
      .attr('transform', (d: any) => 'translate(' + labelPer.centroid(d) + ')')
      .attr('dy', '.35em')
      .text((d: any) => d.data.value + '%');
  }
}