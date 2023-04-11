import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'

export default function Product() {
  const { query } = useRouter()
  console.log(query)
  return (
    <ProductContainer>
      <ImageContainer></ImageContainer>

      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79,90</span>

        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores
          aliquid rerum exercitationem facere a molestiae ut sed velit non
          mollitia? Officiis hic velit assumenda aspernatur nihil, sint sed
          laboriosam tempora?
        </p>

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getServerSideProps: GetServerSideProps = () => {
  return {
    props: {},
  }
}
