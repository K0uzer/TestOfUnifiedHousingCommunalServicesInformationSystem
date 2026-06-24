import { type ReactNode } from 'react';
import { Provider } from 'mobx-react';

interface IProviderComponentProps {
  children: ReactNode;
}

const ProviderComponent = ({ children }: IProviderComponentProps) => (
  <Provider>{children}</Provider>
);
export default ProviderComponent;
