import { configureStore } from '@reduxjs/toolkit';
import { orderSlice } from '../../entities/order/lib/slice/orderSlice';
import saga, { sagaMiddleware } from '../../entities/order/lib/saga/saga';

export const store = configureStore({
    reducer: orderSlice.reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(saga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
