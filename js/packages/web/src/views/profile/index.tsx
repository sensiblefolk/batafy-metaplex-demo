import React, { useEffect, useState } from 'react';
import { ArtCard } from '../../components/ArtCard';
import { Layout, Row, Col, Tabs } from 'antd';
import Masonry from 'react-masonry-css';
import { Link } from 'react-router-dom';
import { useUserArts, useUserBataCards } from '../../hooks';
import { useMeta } from '../../contexts';
import { CardLoader } from '../../components/MyLoader';
import { useWallet } from '@solana/wallet-adapter-react';
import { ParsedAccount, Metadata, ConnectButton } from "@batafy/common"
import { BATA_CARD_MASTEREDITION_KEY } from "../../constants";

const { TabPane } = Tabs;

const { Content } = Layout;

export enum ArtworkViewState {
  Owned = '0',
  Cards = '1',
}

export const ProfileView = () => {
  const { connected, publicKey } = useWallet();
  const ownedMetadata = useUserArts();
  const { metadata, isLoading, editions } = useMeta();
  const { userBataCards } = useUserBataCards()
  const [activeKey, setActiveKey] = useState(ArtworkViewState.Owned);
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const items =
    activeKey === ArtworkViewState.Owned
      ? ownedMetadata.filter(meta => meta?.edition?.info.parent !== BATA_CARD_MASTEREDITION_KEY).map(m => m.metadata)
      : activeKey === ArtworkViewState.Cards
        ? userBataCards
        : [];

  useEffect(() => {
    if (connected) {
      setActiveKey(ArtworkViewState.Owned)
    }
  }, [connected, setActiveKey]);

  const artworkGrid = (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {!isLoading
        ? items.map((m, idx) => {
          const id = m.pubkey;

          return (
            <Link to={`/art/${id}`} key={idx}>
              <ArtCard
                key={id}
                pubkey={m.pubkey}
                preview={false}
                height={250}
                width={250}
              />
            </Link>
          );
        })
        : [...Array(10)].map((_, idx) => <CardLoader key={idx} />)}
    </Masonry>
  );

  return (
    <Layout style={{ margin: 0, marginTop: 30 }}>
      <Content style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Col style={{ width: '100%', marginTop: 10 }}>
          {
            connected ? (
              <Row>
                <Tabs
                  activeKey={activeKey}
                  onTabClick={key => setActiveKey(key as ArtworkViewState)}
                >
                  <TabPane
                    tab={<span className="tab-title">Purchases</span>}
                    key={ArtworkViewState.Owned}
                  >
                    {artworkGrid}
                  </TabPane>
                  {connected && (
                    <TabPane
                      tab={<span className="tab-title">Bata Cards</span>}
                      key={ArtworkViewState.Cards}
                    >
                      {artworkGrid}
                    </TabPane>
                  )}
                </Tabs>
              </Row>
            ) : <h3>Please Connect Wallet to view your profile..</h3>
          }
        </Col>
      </Content>
    </Layout>
  );
};
