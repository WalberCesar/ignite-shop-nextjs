import Link from 'next/link'
import { ImageContainer, SuccessContainer } from '../styles/pages/success'
import { GetServerSideProps } from 'next'
import { stripe } from '../lib/stripe'
import Stripe from 'stripe'
import Image from 'next/image'

interface SuccessProps {
  product: {
    name: string
    imgUrl: string
  }
  customer: string
}

export default function Success({ product, customer }: SuccessProps) {
  return (
    <SuccessContainer>
      <h1>Compra efetuada</h1>

      <ImageContainer>
        <Image src={product.imgUrl} width={130} height={145} alt="" />
      </ImageContainer>

      <p>
        Uhuul <strong>{customer}</strong>, sua <strong>{product.name}</strong>{' '}
        já está a caminho da sua casa.
      </p>

      <Link href="/">Voltar ao catálogo</Link>
    </SuccessContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = String(query.session_id)
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })
  console.log(session)
  const product: Stripe.Product = session.line_items?.data[0].price
    ?.product as Stripe.Product
  const customer = String(session.customer_details?.name)
  return {
    props: {
      product: {
        name: product.name,
        imgUrl: product.images[0],
      },
      customer,
    },
  }
}
