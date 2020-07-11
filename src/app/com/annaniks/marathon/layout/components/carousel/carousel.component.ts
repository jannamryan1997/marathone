import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-carousel",
    templateUrl: "carousel.component.html",
    styleUrls: ["carousel.component.scss"]
})

export class CarouselComponent implements OnInit {
    @Input() slides;
    slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };
    constructor() { }

    ngOnInit() { }

    public setServicePhoto(event): void {
        if (event) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.slides.push({ img: e.target.result });
            };
            if (event.target.files[0]) {
                reader.readAsDataURL(event.target.files[0]);
            }

        }
    }



    slickInit(e) { }

    breakpoint(e) { }

    afterChange(e) { }

    beforeChange(e) { }
}