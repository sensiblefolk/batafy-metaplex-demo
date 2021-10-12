import React from 'react';
import { ArtCard } from '../../components/ArtCard';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useMeta } from '../../contexts';
import { CardLoader } from '../../components/MyLoader';
// import { useWallet } from '@solana/wallet-adapter-react';
import { ParsedAccount, Metadata } from "@batafy/common"
import { BATA_CARD_MASTEREDITION_KEY} from "../../constants";

const { Title } = Typography;

export const CardsView = () => {
  // const { connected, publicKey } = useWallet();
  const { editions, isLoading, metadata } = useMeta();

  const cardEditions = Object.values(editions)
    .filter(edition => edition.info.parent === BATA_CARD_MASTEREDITION_KEY)
    .map(edition => metadata.find(meta => meta.info.edition === edition.pubkey)) as ParsedAccount<Metadata>[]

 const cardGrid = (
   <div className="card">
     { !isLoading ? cardEditions.map((edition, key) => {
       const id = edition.pubkey;

       return (
         <div key={key} >
           <Link to={`/art/${id}`} >
             <ArtCard key={id} pubkey={edition.pubkey} preview={false} height={250} width={250} />
           </Link>
         </div>
       );
     }) : [...Array(4)].map((_, idx) => <CardLoader key={idx} />)}
   </div>
 )

  return (
    <div style={{ marginTop: "20px"}}>
      <Title style={{ padding: "2rem 0"}}>
        Batafy Cards
      </Title>
      {cardGrid}
    </div>
  )
}
