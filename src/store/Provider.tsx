import { type ReactNode } from 'react';
import { Provider } from 'mobx-react';
import { meterStore } from './meterStore';

interface IProviderComponentProps {
  children: ReactNode;
}

const ProviderComponent = ({ children }: IProviderComponentProps) => (
  <Provider meterStore={meterStore}>{children}</Provider>
);

export default ProviderComponent;
