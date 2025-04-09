import {useVariantUrl} from '~/lib/variants';
import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {ProductPrice} from './ProductPrice';
import {ProductImage} from './ProductImage';
import {ProductForm} from './ProductForm';
import type {ProductFragment} from 'storefrontapi.generated';

export function ProductItem({product}: {product: ProductFragment}) {
  const variant = product.selectedOrFirstAvailableVariant;

  return (
    <div className="product-item">
      <Link to={`/products/${product.handle}`}>
        <div className="relative group aspect-square">
          {variant?.image && (
            <Image
              data={variant.image}
              aspectRatio="1/1"
              sizes="(min-width: 45em) 20vw, 50vw"
              className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
            />
          )}
          {product.images?.nodes[1] && (
            <Image
              data={product.images.nodes[1]}
              aspectRatio="1/1"
              sizes="(min-width: 45em) 20vw, 50vw"
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h4>{product.title}</h4>
          <small>
            <ProductPrice
              price={variant?.price}
              compareAtPrice={variant?.compareAtPrice}
            />
          </small>
        </div>
      </Link>
      <ProductForm productOptions={product.options} selectedVariant={variant} />
    </div>
  );
}

export const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment ProductItem on Product {
    id
    title
    handle
    description
    vendor
    descriptionHtml
    encodedVariantExistence
    encodedVariantAvailability
    images(first: 2) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
    options {
      id
      name
      values
      optionValues {
        id
        name
        firstSelectableVariant {
          id
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant {
      id
      availableForSale
      price {
        amount
        currencyCode
      }
      compareAtPrice {
        amount
        currencyCode
      }
      image {
        id
        url
        altText
        width
        height
      }
    }
  }
` as const;
