# @merchantlabs/gatsby-image-loader

This component implements the same optimizations for images as [*gatsby-image*](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-image) except instead of rendering an image it uses the render props pattern and provides the optimized image's src as well as its loading state. The src can then be used however you want.

See the gatsby-image [**README**](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-image) for more background on the problem these optimizations solve.

## Install

`npm install --save @merchantlabs/gatsby-image-loader`

Depending on the gatsby starter you used, you may need to include [gatsby-transformer-sharp](/packages/gatsby-transformer-sharp/) and [gatsby-plugin-sharp](/packages/gatsby-plugin-sharp/) as well, and make sure they are installed and included in your gatsby-config.

```
npm install --save gatsby-transformer-sharp
npm install --save gatsby-plugin-sharp
```

Then in your `gatsby-config.js`:

```
plugins: [
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`
];
```

## How to use

This is what a component using `gatsby-image-loader` looks like:

```jsx
import React from "react";
import ImageLoader from "@merchantlabs/gatsby-image-loader";

export default ({ data }) => (
  <div>
    <h1>Hello gatsby-image</h1>
    <ImageLoader resolutions={data.file.childImageSharp.resolutions}>
      {({ src }) => (
        <div style={{ backgroundImage: src }}> Joe ✌🏼 </div>
      )}
    </ImageLoader>
  </div>
);

export const query = graphql`
  query GatsbyImageSampleQuery {
    file(relativePath: { eq: "blog/avatars/joe-isabell.jpeg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        resolutions(width: 125, height: 125) {
          ...GatsbyImageSharpResolutions
        }
      }
    }
  }
`;
```

## Two types of responsive images

There are two types of responsive images supported by gatsby-image.

1.  Images that have a _fixed_ width and height
2.  Images that stretch across a fluid container

In the first scenario, you want to vary the image's size for different screen
_resolutions_ -- in other words, create retina images.

For the second scenario, you want to create multiple _sizes_ of thumbnails for
devices with widths stretching from smartphone to wide desktop monitors.

To decide between the two, ask yourself: "do I know the exact size this image
will be?" If yes, it's the first type. If no and its width and/or height need to
vary depending on the size of the screen, then it's the second type.

In Gatsby's GraphQL implementation, you query for the first type by querying a
child object of an image called `resolutions` — which you can see in the sample
component above. For the second type, you do a similar query but for a child
object called `sizes`.

## Fragments

GraphQL includes a concept called "query fragments". Which, as the name
suggests, are a part of a query that can be used in multiple queries. To ease
building with `gatsby-image`, Gatsby image processing plugins which support
`gatsby-image` ship with fragments which you can easily include in your queries.

Note,
[due to a limitation of GraphiQL](https://github.com/graphql/graphiql/issues/612),
you can not currently use these fragments in the GraphiQL IDE.

Plugins supporting `gatsby-image` currently include
[gatsby-transformer-sharp](/packages/gatsby-transformer-sharp/),
[gatsby-source-contentful](/packages/gatsby-source-contentful/) and [gatsby-source-datocms](https://github.com/datocms/gatsby-source-datocms).

Their fragments are:

### gatsby-transformer-sharp

* `GatsbyImageSharpResolutions`
* `GatsbyImageSharpResolutions_noBase64`
* `GatsbyImageSharpResolutions_tracedSVG`
* `GatsbyImageSharpResolutions_withWebp`
* `GatsbyImageSharpResolutions_withWebp_noBase64`
* `GatsbyImageSharpResolutions_withWebp_tracedSVG`
* `GatsbyImageSharpSizes`
* `GatsbyImageSharpSizes_noBase64`
* `GatsbyImageSharpSizes_tracedSVG`
* `GatsbyImageSharpSizes_withWebp`
* `GatsbyImageSharpSizes_withWebp_noBase64`
* `GatsbyImageSharpSizes_withWebp_tracedSVG`

### gatsby-source-contentful

* `GatsbyContentfulResolutions`
* `GatsbyContentfulResolutions_noBase64`
* `GatsbyContentfulResolutions_withWebp`
* `GatsbyContentfulResolutions_withWebp_noBase64`
* `GatsbyContentfulSizes`
* `GatsbyContentfulSizes_noBase64`
* `GatsbyContentfulSizes_withWebp`
* `GatsbyContentfulSizes_withWebp_noBase64`

### gatsby-source-datocms

* `GatsbyDatoCmsResolutions`
* `GatsbyDatoCmsResolutions_noBase64`
* `GatsbyDatoCmsSizes`
* `GatsbyDatoCmsSizes_noBase64`

If you don't want to use the blur-up effect, choose the fragment with `noBase64`
at the end. If you want to use the traced placeholder SVGs, choose the fragment
with `tracedSVG` at the end.

If you want to automatically use WebP images when the browser supports the file
format, use the `withWebp` fragments. If the browser doesn't support WebP,
`gatsby-image` will fall back to the default image format.

_Please see the
[gatsby-plugin-sharp](/packages/gatsby-plugin-sharp/#tracedsvg)
documentation for more information on `tracedSVG` and its configuration
options._

## "Resolutions" queries

### Component

Pass in the data returned from the `resolutions` object in your query via the
`resolutions` prop. e.g. `<ImageLoader resolutions={resolutions}> {({ src }) => {...}} </ImageLoader>`

### Query

```graphql
{
  imageSharp {
    # Other options include height (set both width and height to crop),
    # grayscale, duotone, rotate, etc.
    resolutions(width: 400) {
      # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
      ...GatsbyImageSharpResolutions
    }
  }
}
```

## "Sizes" queries

### Component

Pass in the data returned from the `sizes` object in your query via the `sizes`
prop. e.g. `<ImageLoader sizes={sizes}> {({ src }) => {...}} </ImageLoader>`

### Query

```graphql
{
  imageSharp {
    # i.e. the max width of your container is 700 pixels.
    #
    # Other options include maxHeight (set both maxWidth and maxHeight to crop),
    # grayscale, duotone, rotate, etc.
    sizes(maxWidth: 700) {
      # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
      ...GatsbyImageSharpSizes_noBase64
    }
  }
}
```

## `gatsby-image-loader` props

| Name                    | Type                | Description                                                                                                                 |
| ----------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `resolutions`           | `object`            | Data returned from the `resolutions` query                                                                                  |
| `sizes`                 | `object`            | Data returned from the `sizes` query                                                                                        |
| `title`                 | `string`            | Passed to the underlying hidden `img` element                                                                                                 |
| `alt`                   | `string`            | Passed to the underlying hidden `img` element                                                                                                 |
| `onLoad`                | `func`              | A callback that is called when the full-size image has loaded.                                                              |
| `children`                | `func`              | Function that receives `src` and `imgLoaded` as props and returns a React component                                                |

## Image processing arguments

[gatsby-plugin-sharp](/packages/gatsby-plugin-sharp) supports many additional arguments for transforming your images like
`quality`,`sizeByPixelDensity`,`pngCompressionLevel`,`cropFocus`,`greyscale` and many more. See its documentation for more.
