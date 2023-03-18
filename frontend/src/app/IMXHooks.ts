import React from "react";
import { IController } from "./IController";
import { AppController } from "./AppController";
import { Authentication, IMXClient } from "./Definitions";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, refreshAssets, refreshBalance, RootState } from "../state/Context";

const controller: IController = new AppController();
    
export const useIMX = (): [client: IMXClient, authentication: Authentication, loading: boolean, error: string]  => {
    
    const dispatch = useDispatch();
    const loginAddress: string = useSelector<RootState, string>(state => state.session.address);
    
    const [authentication, setAuthentication] = React.useState<Authentication>({ eth_address: '', eth_signature: '', eth_timestamp: 0 });
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');

    const IMXClient: IMXClient = {
        async connect() {

            setLoading(true);
            let [error, address] = await controller.connectIMX();
            setLoading(false);

            if (error) {
                setError(error.reason);
                return;
            }
            else if (address) dispatch(login(address));
        },
        async disconnect() {
            await controller.deleteUserData();
            dispatch(logout());
        },
        async authenticate() {
            if (isValidAddress(loginAddress)) {

                setLoading(true);
                let [error, authData] = await controller.getAuthentication(loginAddress);
                setLoading(false);

                if (error) {
                    setError(error.reason);
                    return;
                } else if (authData) setAuthentication(authData);
            }
        }
    }

    React.useEffect(() => {
        (async () => {
            if (!isValidAddress(loginAddress)) return;

            let [assetError, assets] = await controller.getUserFamiliars(loginAddress);
            let [, balance] = await controller.getUserBalances(loginAddress);
            if (assets && balance) {
                dispatch(refreshAssets(assets));
                dispatch(refreshBalance(balance));
            } else {
                let errorMessage: string = assetError ? assetError.reason : '';
                setError(errorMessage);
            }
        })();
        }, [loginAddress]);

    return [IMXClient, authentication, loading, error];
} 

function isValidAddress(address: string): boolean {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
}