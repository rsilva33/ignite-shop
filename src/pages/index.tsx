import Image from 'next/image'
import { GetServerSideProps } from 'next'
import { useKeenSlider } from 'keen-slider/react'

import { stripe } from '../lib/stripe'
import { HomeContainer, Product } from '../styles/pages/home'

import shirt1 from '../assets/shirts/shirt-1.png'
import shirt2 from '../assets/shirts/shirt-2.png'
import shirt3 from '../assets/shirts/shirt-3.png'

import 'keen-slider/keen-slider.min.css'

import Stripe from 'stripe'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: number
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => {
        return (
          <Product key={product.id} className="keen-slider__slide">
            <Image src={product.imageUrl} width={520} height={480} alt="" />

            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        )
      })}
    </HomeContainer>
  )
}

// rodando dentro de um server side em node, todo codigo dentro de um server side nao e visivel para o usuario final
export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount / 100,
    }
  })

  console.log(response.data)

  return {
    props: {
      products,
    },
  }
}
