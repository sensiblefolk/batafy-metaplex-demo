import {useWallet} from '@solana/wallet-adapter-react';
import {Divider, Typography} from 'antd';
import BN from 'bn.js';
import React from 'react';
import {Link} from 'react-router-dom';
import {AuctionRenderCard} from '../../components/AuctionRenderCard';
import {CardLoader} from '../../components/MyLoader';
import {useMeta} from '../../contexts';
import { AuctionViewState, useAuctions} from '../../hooks';
import { BATA_CARD_MASTEREDITION_KEY} from "../../constants";

const { Title } = Typography

export enum LiveAuctionViewState {
  All = '0',
  Participated = '1',
  Ended = '2',
  Resale = '3',
}

export const AuctionListView = () => {
  const auctions = useAuctions(AuctionViewState.Live);
  const auctionsEnded = [
    ...useAuctions(AuctionViewState.Ended),
    ...useAuctions(AuctionViewState.BuyNow),
  ];
  const { isLoading } = useMeta();
  const {  publicKey } = useWallet();

  // Check if the auction is primary sale or not
  // const checkPrimarySale = (auc: AuctionView) => {
  //   let flag = 0;
  //   auc.items.forEach(i => {
  //     i.forEach(j => {
  //       if (j.metadata.info.primarySaleHappened) {
  //         flag = 1;
  //         return true;
  //       }
  //     });
  //     if (flag == 1) return true;
  //   });
  //   return flag == 1;
  // };

  // const resaleAuctions = auctions
  //   .sort(
  //     (a, b) =>
  //       a.auction.info.endedAt
  //         ?.sub(b.auction.info.endedAt || new BN(0))
  //         .toNumber() || 0,
  //   )
  //   .filter(m => checkPrimarySale(m) == true);

  // Removed resales from live auctions
  const liveAuctions = auctions
    .sort(
      (a, b) =>
        a.auction.info.endedAt
          ?.sub(b.auction.info.endedAt || new BN(0))
          .toNumber() || 0,
    )
    // .filter(a => !resaleAuctions.includes(a));

  const items = liveAuctions;

  const participatedAuctions = () => {
    return [...liveAuctions.concat(auctionsEnded)]
      .filter(
        (m) =>
          m.myBidderMetadata?.info.bidderPubkey == publicKey?.toBase58(),
      );
  }

  const liveAuctionsView = (
    <div style={{ width: "100%", margin: "2rem 0"}}>
      <Title level={3} type="secondary" >Live Sale</Title>
      <Divider />
      <div className="card" >
        {!isLoading
          ? items.map((m, idx) => {

            const id = m.auction.pubkey;
            return (
              <Link to={`/auction/${id}`} key={idx}>
                <AuctionRenderCard key={id} auctionView={m} />
              </Link>
            );
          })
          : [...Array(4)].map((_, idx) => <CardLoader key={idx} />)}
      </div>
    </div>
  );
  const endedAuctionsView = (
    <div style={{ width: "100%", margin: "2rem 0"}}>
      <Title level={3} type="secondary">Sale Ended</Title>
      <Divider />
      <div className="card">
        {!isLoading
          ? auctionsEnded.map((m, idx) => {
            const id = m.auction.pubkey;
            return (
              <Link to={`/auction/${id}`} key={idx}>
                <AuctionRenderCard key={id} auctionView={m} />
              </Link>
            );
          })
          : [...Array(4)].map((_, idx) => <CardLoader key={idx} />)}
      </div>
    </div>
  );

  return (
    <>
      {/*<PreSaleBanner auction={heroAuction} />*/}
      <div className="text-center title">Welcome to Batafy barter marketplace</div>
      {liveAuctionsView}
      {auctionsEnded.length > 0 && (
        <>
          {endedAuctionsView}
        </>
      )}
    </>
  );
};
