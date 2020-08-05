import { ReceiptResponseData } from './receipt';

export interface FeedData {
    count: number;
    next: null
    previous: null
    results: FeedResponseData[],
}

export interface FeedResponseData {
    category: any;
    creator: any;
    creator_client: string;
    creator_info:any;
    duration: any;
    feed_media: FeedMedia[];
    id: number;
    tag: []
    tag_information: []
    timeStamp: string;
    title: string;
    url: string;
    creator_client_info:any;
    mass:string,
    is_public:boolean;
}

export interface FeedMedia {
    aspect_ratio: any;
    content: string;
    // ReceiptData
    feed: string;
    path: null
    thumbnail: null
    type: null
    url: string;
}

export interface Content {
    type: string;
    url: string;
    recipe?:ReceiptResponseData;
}