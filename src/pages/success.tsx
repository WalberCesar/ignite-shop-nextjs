import Link from 'next/link'
import { ImageContainer, SuccessContainer } from '../styles/pages/success'
import { GetServerSideProps } from 'next'
import { stripe } from '../lib/stripe'
import Stripe from 'stripe'
import Image from 'next/image'
import Head from 'next/head'

interface SuccessProps {
  product: {
    name: string
    imgUrl: string
  }
  customerName: string
}

export default function Success({ product, customerName }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite shop</title>

        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada</h1>

        <ImageContainer>
          <Image src={product.imgUrl} width={120} height={110} alt="" />
        </ImageContainer>

        <p>
          Uhuul <strong>{customerName}</strong>, sua{' '}
          <strong>{product.name}</strong> já está a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: { destination: '/' },
    }
  }
  const sessionId = String(query.session_id)
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })
  console.log(session)
  const product: Stripe.Product = session.line_items?.data[0].price
    ?.product as Stripe.Product
  const customerName = String(session.customer_details?.name)
  return {
    props: {
      product: {
        name: product.name,
        imgUrl: product.images[0],
      },
      customerName,
    },
  }
}
