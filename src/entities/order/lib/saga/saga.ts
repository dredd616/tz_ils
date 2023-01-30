import { call, put, takeEvery } from 'redux-saga/effects';
import { getOrders } from '../requests/requests';
import createSagaMiddleware from 'redux-saga'
import { sagaActions } from './saga-actions';
import { fetchOrdersFailure, fetchOrdersRequest, fetchOrdersSuccess } from '../slice/orderSlice';

export const sagaMiddleware = createSagaMiddleware()
export function* fetchOrdersSaga(): IterableIterator<any> {
    try {
        yield put(fetchOrdersRequest());
        const orders = yield call(() => getOrders());
        yield put(fetchOrdersSuccess(orders));
    } catch (error) {
        yield put(fetchOrdersFailure(error));
    }
}


export default function* rootSaga(): IterableIterator<any> {
    yield takeEvery(sagaActions.FETCH_DATA_SAGA, fetchOrdersSaga);
}