import { useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Metadata, ParsedAccount, useMeta } from '@batafy/common';

import { BATA_CARD_MASTEREDITION_KEY } from '../constants';

export const useUserBataCards = () => {
  const { editions, metadata } = useMeta();
  const { publicKey } = useWallet();

  const userBataCards = useMemo(
    () =>
      Object.values(editions)
        .filter(edition => edition.info.parent === BATA_CARD_MASTEREDITION_KEY)
        .map(
          edition =>
            metadata.find(
              meta => meta.info.edition === edition.pubkey,
            ) as ParsedAccount<Metadata>,
        )
        .filter(
          edition => edition.info.updateAuthority === publicKey?.toString(),
        ),
    [editions, metadata],
  );

  return { userBataCards };
};
