import React, { FC, useState } from 'react';
import { List, Spin } from 'antd';
import { LatLngTuple } from 'leaflet';
import { TOrder } from '../../model/order.types';
import './order-list.scss';

type TOrderListProps = {
    orders: TOrder[];
    isLoading: boolean;
    error: any;
    handleClick: (from: LatLngTuple, to: LatLngTuple) => Promise<void>;
};

export const OrderList: FC<TOrderListProps> = ({ orders, isLoading, error, handleClick }) => {
    const [activeOrder, setActiveOrder] = useState<number>(orders[0]?.id);

    return (
        <div className="order-list">
            {isLoading ? (
                <Spin />
            ) : error ? (
                <div>{error}</div>
            ) : (
                <List
                    size="large"
                    header="Orders:"
                    itemLayout="horizontal"
                    dataSource={orders}
                    renderItem={(order: TOrder) => (
                        <List.Item
                            className={activeOrder === order.id ? 'order-list-item-active' : 'order-list-item'}
                            onClick={() => {
                                setActiveOrder(order.id);
                                handleClick(order.from, order.to);
                            }}
                        >
                            <List.Item.Meta
                                title={order.id}
                            />
                        </List.Item>
                    )}
                />
            )}
        </div>
    );
};