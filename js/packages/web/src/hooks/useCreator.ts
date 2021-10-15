import { StringPublicKey, pubkeyToString } from '@batafy/common';
import { useMeta } from '../contexts';

export const useCreator = (id?: StringPublicKey) => {
  const { whitelistedCreatorsByCreator } = useMeta();
  const key = pubkeyToString(id);
  const creator = Object.values(whitelistedCreatorsByCreator).find(
    creator => creator.info.address === key,
  );
  return creator;
};
