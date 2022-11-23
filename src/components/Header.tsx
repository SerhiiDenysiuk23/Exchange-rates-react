import React, {FC} from 'react';
import {Currency} from "../types/currency";

const Header: FC<{currencyArray: Currency[]}> = ({currencyArray}) => {
    return (
        <header className={"header"}>
            <ul>
                {
                   currencyArray.map((item, id) => {
                       return <li key={id}>{item.code} {item.rate}</li>
                   })
                }
            </ul>
        </header>
    );
};

export default Header;