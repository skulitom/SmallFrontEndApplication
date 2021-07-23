import React from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from '../constants/routes';

const RouteHeader = () => {
  return <div >
    <div id="headerItems">
        <Link to={ROUTES.HOME} className="linkItem">
            <p>ENTRIES</p>
        </Link>
        <Link to={ROUTES.CHARTS} className="linkItem">
            <p>CHARTS</p>
        </Link>
    </div>
    <hr/>
  </div>
};

export default RouteHeader;