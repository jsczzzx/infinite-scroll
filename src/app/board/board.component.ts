import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FetchService } from '../fetch.service';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  data: any[] = [];
  limit = 5;
  after = 42;
  isFinished = false;
  isLoading = false;

  constructor(private fetchService:FetchService, private vc: ViewportScroller) { }
  //@ViewChild('scrollContainer') scrollContainer!: ElementRef;

  ngOnInit(): void {
    this.fetchService.fetchData(this.limit,this.after).subscribe((value)=>{
      this.data = value["testimonials"];
    })

  }

  onScroll(event: Event) {
    if (!this.isFinished && !this.isLoading) {
      const element = event.target as HTMLElement;
      //console.log(`(${element.scrollHeight}, ${element.scrollTop}, ${element.clientHeight})`)
      if (Math.round(element.scrollTop + element.clientHeight) == element.scrollHeight) {
        this.after += 5;
        this.isLoading = true;
        this.fetchService.fetchData(this.limit,this.after).subscribe((value)=>{
          this.data = [...this.data, ...value["testimonials"]];
          if (!value["hasNext"]) {
            this.isFinished = true;
          }
          this.isLoading = false;
        })
      }
    }
  }

}
