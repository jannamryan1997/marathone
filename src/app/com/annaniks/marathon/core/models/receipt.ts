export interface ReceiptData {
    receipt?: ReceiptResponseData,
    type: string,
    url: string,
}
export interface ReceiptResponseData {
    title: string,
    ingridient: Ingridient[],
    calories: string,
    kcal: string,
    macronutrients: boolean,
    carbs: string,
    protein: string,
    fat: string,
    gram: boolean,
    persentage: boolean,
    seriving: string,
    time: string,
    videoLink: string,
    preparationSteps: PreparationStep[],
    information: string,
    tags: Tags[],
    imageSlider: Slider[],

}


export interface Ingridient {
    name: string,
    value: string,
}

export interface PreparationStep {
    title: string,
}
export interface Tags {
    file: string,
    name: string,
}
export interface Slider {
    file: string,
}