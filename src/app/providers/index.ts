import { withStore } from './with-store';
import compose from 'compose-function';

export const withProviders = compose(withStore)