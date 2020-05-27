import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-galery",
    templateUrl: "gallery.component.html",
    styleUrls: ["gallery.component.scss"]
})

export class GelleryComponent implements OnInit {
public galleryItem=[
    {image:"assets/images/gallery/gallery1.png"},
    {image:"assets/images/gallery/gallery2.png"},
    {image:"assets/images/gallery/gallery3.png"},
    {image:"assets/images/gallery/gallery4.png"},
    {image:"assets/images/gallery/gallery5.png"},
    {image:"assets/images/gallery/gallery6.png"},
    {image:"assets/images/gallery/gallery7.png"},
    {image:"assets/images/gallery/gallery8.png"},
    {image:"assets/images/gallery/gallery9.png"},
    {image:"assets/images/gallery/gallery10.png"},
    {image:"assets/images/gallery/gallery1.png"},
    {image:"assets/images/gallery/gallery2.png"},
    {image:"assets/images/gallery/gallery3.png"},
    {image:"assets/images/gallery/gallery4.png"},
    {image:"assets/images/gallery/gallery5.png"},
]
    constructor() { }

    ngOnInit() { }
}