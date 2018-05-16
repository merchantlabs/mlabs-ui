# @merchantlabs/react-carousel


## Install

`npm install --save @merchantlabs/gatsby-image-loader`

## How to use

This is what a component using `react-carousel` looks like:

```jsx
import React from "react";
import { Carousel } from "@merchantlabs/react-carousel";
import Slide from "./Slide";

const slides = [
  {
    title: 'Software Engineering',
    subTitle: 'for the modern web.',
    buttonText: 'LEARN MORE',
    path: '/'
  },
  {
    title: 'Technical Expertise',
    subTitle: 'Fueled by innovation.',
    buttonText: 'WORK WITH US',
    path: '/'
  },
  {
    title: 'Web App Development',
    subTitle: 'Built on modern frameworks.',
    buttonText: 'OUR DEV PROCESS',
    path: '/'
  }
]

export default () => (
  <Carousel
    slides={slides}
    interval={8000}
    buttonComponent={Carousel.Button}
    dotComponent={Carousel.Dot}
    slideRenderer={slideProps => <Slide {...slideProps} />}
  />
)

```
## `react-carousel` props

| Name | Type | Description   |
| ---- | ---- | ------------- |
| `slides` | `array<any>` | **Required** Array of strings or objects, each item in item in the array should have the same type or shape because each gets passed to the slideRenderer function individually. |
| `slideRenderer` | `func`| **Required** Function that will receive an item in the slides array and return a react component  |
| `dotComponent` | `func`| **Required** `styled-component` that will be used as slide navigation at the bottom of the carousel |
| `buttonComponent` | `func`| **Required** Same as `dotComponent` except this is the arrows that show up on either side of the carousel |
| `interval` | `number`| Time in milliseconds between the slide moving |
| `className` | `string`| className passed to the component that wraps the rendered slide |
| `autoPlay` | `bool`| Whether or not the carousel should autoplay |
