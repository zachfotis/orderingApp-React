type visibleComponentProps = {
  showSearchAddress: boolean;
  showConfirmAddress: boolean;
};

type setVisibleComponentCallback = (prevState: visibleComponentProps) => visibleComponentProps;

type SearchAddressProps = {
  setVisibleComponent: (value: setVisibleComponentCallback) => void;
};

export type { SearchAddressProps };
